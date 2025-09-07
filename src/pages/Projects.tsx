import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BookOpen, Zap, Code2, ArrowRight, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionHeader } from "@/components/ui/heading";
import { Link } from "react-router-dom";
import { getMajorProjects, getSideMissions } from "@/lib/data";
import ProjectSlide from "@/components/ProjectSlide";
import { MajorProject } from "@/types/site-data";
import { tw } from "@/styles/tw";
import prepmentorImg from "@/assets/prepmentor.png";
import chaincardImg from "@/assets/chaincard.png";
import kpibarImg from "@/assets/kpibar.png";
import whatsappImg from "@/assets/WhatsApp.png";
import workfolioImg from "@/assets/workfolio.png";

const imageMap: Record<string, string> = {
  prepmentor: prepmentorImg,
  chaincard: chaincardImg,
  kpibar: kpibarImg,
  whatsapp: whatsappImg,
  workfolio: workfolioImg,
};

// Preview helper types for GitHub repos
interface RepoInfoPreview {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  topics?: string[];
}

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
  const majorProjects = getMajorProjects().map((p) => ({
    ...p,
    image: p.image || (p.imageKey ? imageMap[p.imageKey] : undefined),
  }));
  const sideMissions = getSideMissions();
  const [selectedProject, setSelectedProject] = useState<MajorProject | null>(
    null
  );

  // Load a 3-item preview from GitHub (fallback to local side missions)
  const [preview, setPreview] = useState<
    {
      id: string;
      title: string;
      description: string;
      liveUrl?: string;
      githubUrl?: string;
    }[]
  >([]);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoadingPreview(true);
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        const res = await fetch(
          "https://api.github.com/users/ayesha-ghani098/repos?per_page=100",
          { headers, signal: controller.signal }
        );
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const data: RepoInfoPreview[] = await res.json();
        const cleaned = data
          .filter((r) => !(r.topics || []).includes("major"))
          .slice(0, 3)
          .map((r) => ({
            id: String(r.id),
            title: r.name,
            description: r.description ?? "",
            liveUrl: r.homepage || undefined,
            githubUrl: r.html_url,
          }));
        setPreview(cleaned);
      } catch (e) {
        const fallback = sideMissions.slice(0, 3).map((m) => ({
          id: m.id,
          title: m.title,
          description: m.description,
          liveUrl: (m as any).liveUrl,
          githubUrl: (m as any).githubUrl,
        }));
        setPreview(fallback);
      } finally {
        setLoadingPreview(false);
      }
    }
    load();
    return () => controller.abort();
  }, [sideMissions]);

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
            title="Quest Log"
            subtitle="Major quests completed and side missions accomplished in my journey as a software engineer"
            icon={<BookOpen className="w-8 h-8 text-primary" />}
          />

          {/* Major Projects */}
          <motion.section variants={itemVariants} className="mb-20">
            <SectionHeader
              title="Major Quests"
              icon={<Zap className="w-6 h-6 text-primary" />}
            />

            <div className="grid gap-6 md:gap-8">
              {majorProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Card
                    className={`overflow-hidden hover:shadow-2xl transition-all duration-500 ${tw.cardBorder} bg-card backdrop-blur-none transform-gpu group-hover:scale-[1.02]`}
                  >
                    <CardHeader className={tw.cardHeaderLg}>
                      <div className="flex flex-col gap-4">
                        {/* Title and Tech */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl md:text-2xl text-primary font-heading mb-2">
                              {project.title}
                            </CardTitle>
                            <p className={tw.body}>{project.company}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span key={tech} className={tw.techChipLg}>
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                            <Button className={tw.iconBtnSm}>
                              <Play className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      {/* Four columns: Image, Problem, Approach, Outcome */}
                      <div className="grid md:grid-cols-4 gap-6 mb-0 items-start">
                        <div className="flex items-start justify-center md:justify-start">
                          {project.image && (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-[268px] h-[168px] rounded-md object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2 font-heading">
                            Problem
                          </h4>
                          <p className="text-sm font-body leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2 font-heading">
                            Approach
                          </h4>
                          <p className="text-sm font-body leading-relaxed">
                            {project.approach}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2 font-heading">
                            Outcome
                          </h4>
                          <p className="text-sm font-body leading-relaxed">
                            {project.outcome}
                          </p>
                        </div>
                      </div>

                      {/* Click to view more */}
                      <div className="mt-6 flex items-center justify-center">
                        <Button
                          onClick={() => setSelectedProject(project)}
                          className="px-4 py-2 bg-primary text-primary-foreground hover:opacity-90"
                        >
                          View details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
