import { useState, useEffect } from "react";

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

export const useGitHubRepos = ({
  username,
  excludeTopics = [],
  perPage = 100,
}: UseGitHubReposOptions): UseGitHubReposReturn => {
  const [repos, setRepos] = useState<RepoInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    // Set timeout using AbortController
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    async function load() {
      try {
        setLoading(true);
        setError(null);
        
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        
        // Add GitHub token if available for higher rate limits
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        if (githubToken) {
          headers.Authorization = `Bearer ${githubToken}`;
        }
        
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}`,
          { 
            headers, 
            signal: controller.signal
          }
        );
        
        clearTimeout(timeoutId);
        
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
        
        setRepos(filtered);
      } catch (err) {
        clearTimeout(timeoutId);
        if (err instanceof Error && err.name !== 'AbortError') {
          console.warn("GitHub fetch failed:", err.message);
          if (err.message.includes('timeout') || err.message.includes('ERR_CONNECTION_TIMED_OUT')) {
            setError("Connection timeout. Please check your internet connection and try again.");
          } else {
            setError(err.message);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    
    load();
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [username, excludeTopics, perPage]);

  return { repos, loading, error };
}; 