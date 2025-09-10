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
  excludeTopics?: string[];
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
    
    async function load() {
      try {
        setLoading(true);
        setError(null);
        
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}`,
          { headers, signal: controller.signal }
        );
        
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        
        const data: RepoInfo[] = await res.json();
        
        const filtered = data.filter((repo) => {
          const repoTopics = repo.topics || [];
          return !excludeTopics.some((topic) => repoTopics.includes(topic));
        });
        
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
  }, [username, excludeTopics, perPage]);

  return { repos, loading, error };
}; 