import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BookOpen, Code2, ArrowRight, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionHeader } from "@/components/ui/heading";
import { Link } from "react-router-dom";
import { getMajorProjects, getSideMissions } from "@/lib/data";
import ProjectSlide from "@/components/ProjectSlide";
import { MajorProject } from "@/types/site-data";
import { tw } from "@/styles/tw";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { GITHUB_CONFIG, PAGINATION } from "@/lib/constants";
import prepmentorImg from "@/assets/prepmentor.png";
import chaincardImg from "@/assets/chaincard.png";
import kpibarImg from "@/assets/kpibar.png";
import whatsappImg from "@/assets/whatsapp.png";
import workfolioImg from "@/assets/workfolio.png";

const imageMap: Record<string, string> = {
  prepmentor: prepmentorImg,
  chaincard: chaincardImg,
  kpibar: kpibarImg,
  whatsapp: whatsappImg,
  workfolio: workfolioImg,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Projects() {
  const majorProjects = useMemo(
    () =>
      getMajorProjects().map((p) => ({
        ...p,
        image: p.image || (p.imageKey ? imageMap[p.imageKey] : undefined),
      })),
    []
  );

  const sideMissions = getSideMissions();
  const [selectedProject, setSelectedProject] = useState<MajorProject | null>(
    null
  );

  // Use the GitHub hook
  const { repos, loading: loadingPreview } = useGitHubRepos({
    username: GITHUB_CONFIG.USERNAME,
    excludeTopics: GITHUB_CONFIG.EXCLUDE_TOPICS,
    perPage: GITHUB_CONFIG.PER_PAGE,
  });

  // Transform GitHub repos to preview format
  const preview = useMemo(() => {
    if (repos && repos.length > 0) {
      return repos.slice(0, 3).map((r) => ({
        id: String(r.id),
        title: r.name,
        description: r.description ?? "",
        liveUrl: r.homepage || undefined,
        githubUrl: r.html_url,
      }));
    }

    // Fallback to local side missions
    return sideMissions.slice(0, 3).map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      liveUrl: (m as any).liveUrl,
      githubUrl: (m as any).githubUrl,
    }));
  }, [repos, sideMissions]);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-luxe rounded-full opacity-5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-modern rounded-full opacity-5 blur-3xl" />
        </div>

        <div className={`${tw.container} ${tw.section} relative z-10`}>
          {/* Header */}
          <PageHeader
            title="My Projects"
            subtitle="Major quests completed and side missions accomplished in my journey as a software engineer"
            icon={<BookOpen className="w-8 h-8 text-primary" />}
          />

          {/* Major Projects - redesigned list */}
          <motion.section variants={itemVariants} className="mb-20">
            <div className="divide-y divide-border/60">
              {majorProjects.map((p) => (
                <div
                  key={p.id}
                  className="py-8 md:py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-4 group"
                >
                  {/* Left: Title + meta */}
                  <div>
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="text-3xl md:text-5xl font-display leading-none text-foreground text-left transition-all duration-300 ease-out group-hover:tracking-tight hover:text-primary group-hover:scale-[1.01]"
                    >
                      {p.title}
                    </button>
                    <p className="mt-3 text-sm text-muted-foreground transition-all duration-300 group-hover:translate-x-1">
                      {new Date().getFullYear()}
                    </p>
                  </div>
                  {/* Right: Role + tech */}
                  <div className="flex items-start gap-4 md:min-w-[320px] justify-end">
                    <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="text-right transition-all duration-300 group-hover:translate-x-1">
                      <p className="text-base md:text-lg font-heading">
                        {p.company || p.tags?.[0] || "Design & Development"}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        {(p.technologies || []).slice(0, 6).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Side Missions Preview */}
          <motion.section variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-between">
              <SectionHeader
                icon={<Code2 className="w-6 h-6 text-primary" />}
                title={
                  loadingPreview ? "Loading Side Missions…" : "Side Missions"
                }
              />
              <Link
                to="/side-missions"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View Side Missions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {preview.map((item) => (
                <Card key={item.id} className={`h-full ${tw.cardBorder} glass`}>
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-primary">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.description || "No description provided."}
                    </p>
                    <div className="flex gap-2">
                      {item.liveUrl && (
                        <Button
                          asChild
                          className="flex-1 bg-primary text-primary-foreground text-sm"
                        >
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live
                          </a>
                        </Button>
                      )}
                      {item.githubUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 text-sm"
                        >
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>

      {/* Project Slide */}
      {selectedProject && (
        <ProjectSlide
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
