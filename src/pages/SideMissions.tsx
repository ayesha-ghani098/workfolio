import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader, SectionHeader } from "@/components/ui/heading";
import { getSideMissions } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface RepoInfo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  topics?: string[];
}

const PAGE_SIZE = 6;

export default function SideMissions() {
  const local = getSideMissions();
  const [repos, setRepos] = useState<RepoInfo[] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        const res = await fetch(
          "https://api.github.com/users/ayesha-ghani098/repos?per_page=100",
          { headers, signal: controller.signal }
        );
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const data: any[] = await res.json();
        const cleaned: RepoInfo[] = data
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            homepage: r.homepage,
            topics: r.topics as string[] | undefined,
          }))
          .filter((r) => !(r.topics || []).includes("major"));
        setRepos(cleaned);
      } catch (e) {
        console.warn("GitHub fetch failed, using local sideMissions");
        setRepos(null);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  const items = useMemo(() => {
    if (repos && repos.length > 0) {
      return repos.map((r) => ({
        id: String(r.id),
        title: r.name,
        description: r.description ?? "",
        liveUrl: r.homepage || undefined,
        githubUrl: r.html_url,
      }));
    }
    return local.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      liveUrl: (m as any).liveUrl,
      githubUrl: (m as any).githubUrl,
    }));
  }, [repos, local]);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <PageHeader
          title="Side Missions"
          subtitle="Small projects, experiments, and utilities"
          icon={<Github className="w-8 h-8 text-primary" />}
        />

        <SectionHeader title={loading ? "Loading from GitHub…" : "Explore"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((item) => (
            <Card
              key={item.id}
              className="h-full glass border-2 hover:border-primary/30 transition"
            >
              <CardHeader>
                <CardTitle className="text-lg font-heading text-primary">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {item.description || "No description provided."}
                </p>
                <div className="flex gap-2">
                  {item.liveUrl && (
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-primary to-primary text-white hover:opacity-90 text-sm"
                    >
                      <a href={item.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" /> Live
                      </a>
                    </Button>
                  )}
                  {item.githubUrl && (
                    <Button
                      asChild
                      className="flex-1 border border-primary/30 text-primary hover:bg-primary/10 bg-transparent text-sm"
                    >
                      <a href={item.githubUrl} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4 mr-2" /> Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4"
          >
            Prev
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page} / {totalPages}
          </div>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4"
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
