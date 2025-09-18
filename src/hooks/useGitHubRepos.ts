import { useState, useEffect, useMemo } from "react";

interface RepoInfo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  topics?: string[];
}

interface UseGitHubReposOptions {
  username: string;
  excludeTopics?: readonly string[];
  perPage?: number;
}

interface UseGitHubReposReturn {
  repos: RepoInfo[] | null;
  loading: boolean;
  error: string | null;
}

// Cache to prevent duplicate requests
const requestCache = new Map<string, { data: RepoInfo[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGitHubRepos = ({
  username,
  excludeTopics = [],
  perPage = 100,
}: UseGitHubReposOptions): UseGitHubReposReturn => {
  const [repos, setRepos] = useState<RepoInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the cache key to prevent unnecessary re-renders
  const cacheKey = useMemo(() => 
    `${username}-${perPage}-${excludeTopics.join(',')}`, 
    [username, perPage, excludeTopics]
  );

  useEffect(() => {
    const controller = new AbortController();
    
    async function load() {
      try {
        setLoading(true);
        setError(null);
        
        const cached = requestCache.get(cacheKey);
        
        // Check if we have valid cached data
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setRepos(cached.data);
          setLoading(false);
          return;
        }
        
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        
        // Add GitHub token if available
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        if (githubToken) {
          headers.Authorization = `Bearer ${githubToken}`;
        }
        
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=updated`,
          { headers, signal: controller.signal }
        );
        
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          } else if (res.status === 404) {
            throw new Error("GitHub user not found.");
          } else {
            throw new Error(`GitHub API error: ${res.status}`);
          }
        }
        
        const data: RepoInfo[] = await res.json();
        
        const filtered = data.filter((repo) => {
          const repoTopics = repo.topics || [];
          return !excludeTopics.some((topic) => repoTopics.includes(topic));
        });
        
        // Cache the filtered results
        requestCache.set(cacheKey, { data: filtered, timestamp: Date.now() });
        
        setRepos(filtered);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.warn("GitHub fetch failed:", err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    load();
    return () => controller.abort();
  }, [cacheKey, username, excludeTopics, perPage]);

  return { repos, loading, error };
}; 