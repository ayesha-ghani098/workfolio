import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MajorProject } from "@/types/site-data";
import { tw } from "@/styles/tw";

interface QuestCarouselProps {
  projects: MajorProject[];
  selectedProject: MajorProject | null;
  onSelectProject: (project: MajorProject) => void;
}

export default function QuestCarousel({
  projects,
  selectedProject,
  onSelectProject,
}: QuestCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const currentProject = projects[currentIndex];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Carousel Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display text-foreground">Quest Carousel</h3>
        <div className="flex gap-2">
          <Button onClick={prevProject} className={tw.iconBtn}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button onClick={nextProject} className={tw.iconBtn}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Project Card */}
          <Card
            className={`${tw.cardBorder} glass overflow-hidden hover:shadow-xl transition-all duration-500`}
          >
            <CardHeader className={tw.cardHeader}>
              <CardTitle className={tw.titlePrimary}>
                {currentProject.title}
              </CardTitle>
              <p className={tw.body}>{currentProject.company}</p>
            </CardHeader>
            <CardContent className="p-4">
              <p className={`${tw.body} mb-4`}>{currentProject.outcome}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProject.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gradient-to-r from-primary/10 to-primary/10 text-primary text-xs rounded-full border border-primary/20 font-body"
                  >
                    {tech}
                  </span>
                ))}
                {currentProject.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{currentProject.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => onSelectProject(currentProject)}
                  className="flex-1 bg-gradient-to-r from-primary to-primary text-white hover:opacity-90 text-sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {currentProject.liveUrl && (
                  <Button
                    onClick={() =>
                      window.open(currentProject.liveUrl, "_blank")
                    }
                    className={tw.iconBtn}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-primary to-primary w-6"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Selected Project Details */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className={`${tw.cardBorder} glass`}>
            <CardHeader className={tw.cardHeader}>
              <CardTitle className={tw.titlePrimary}>
                {selectedProject.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 font-heading">
                  Problem
                </h4>
                <p className="text-sm font-body leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 font-heading">
                  Approach
                </h4>
                <p className="text-sm font-body leading-relaxed">
                  {selectedProject.approach}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 font-heading">
                  Outcome
                </h4>
                <p className="text-sm font-body leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </div>

              {/* Links */}
              <div className="flex gap-2 pt-2">
                {selectedProject.liveUrl && (
                  <Button
                    onClick={() =>
                      window.open(selectedProject.liveUrl, "_blank")
                    }
                    className="flex-1 bg-gradient-to-r from-primary to-primary text-white hover:opacity-90 text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button
                    onClick={() =>
                      window.open(selectedProject.githubUrl, "_blank")
                    }
                    className="flex-1 border border-primary/30 text-primary hover:bg-primary/10 bg-transparent text-sm"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
