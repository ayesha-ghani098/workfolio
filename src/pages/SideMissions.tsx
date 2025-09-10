import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  BookOpen,
  Code2,
  ArrowRight,
  Github,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionHeader } from "@/components/ui/heading";
import { tw } from "@/styles/tw";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { GITHUB_CONFIG } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function SideMissions() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Use the GitHub hook
  const { repos, loading } = useGitHubRepos({
    username: GITHUB_CONFIG.USERNAME,
    excludeTopics: [...GITHUB_CONFIG.EXCLUDE_TOPICS],
    perPage: GITHUB_CONFIG.PER_PAGE,
  });

  const items = useMemo(() => {
    if (repos && repos.length > 0) {
      return repos.map((r) => ({
        id: String(r.id),
        title: r.name,
        description: r.description || "No description available",
        image: "/api/placeholder/400/300",
        tags: r.topics || [],
        githubUrl: r.html_url,
        liveUrl: r.homepage || undefined,
        stars: r.stargazers_count,
        language: r.language,
        updatedAt: r.updated_at,
      }));
    }
    return [];
  }, [repos]);

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background"
    >
      <PageHeader
        title="Side Missions"
        subtitle="Exploring new technologies and building cool stuff"
      />

      <div className={`${tw.container} py-12`}>
        <motion.div variants={item} className="mb-8">
          <SectionHeader
            title="GitHub Repositories"
            subtitle="My open-source contributions and experimental projects"
            icon={<Github className="w-6 h-6" />}
          />
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full mt-2" />
                  <div className="h-3 bg-muted rounded w-2/3 mt-1" />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-muted rounded-full w-16" />
                    <div className="h-6 bg-muted rounded-full w-20" />
                  </div>
                  <div className="h-8 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-heading">
                        {project.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          {project.language && (
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              {project.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            {project.stars}
                          </span>
                        </div>
                        <span>
                          Updated{" "}
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              window.open(project.githubUrl, "_blank")
                            }
                          >
                            <Code2 className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              window.open(project.liveUrl, "_blank")
                            }
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
