import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MajorProject } from "@/types/site-data";

interface ProjectSlideProps {
  project: MajorProject;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectSlide({
  project,
  isOpen,
  onClose,
}: ProjectSlideProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Slide Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background/95 backdrop-blur-xl border-l border-border z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border p-6">
              <div className="flex items-center justify-between">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-display text-foreground"
                >
                  {project.title}
                </motion.h2>
                <Button onClick={onClose} className="hover:bg-primary/10 p-2">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/10"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                )}
                {!imageLoaded && project.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Problem / Approach / Outcome */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-heading text-muted-foreground mb-2">
                      Problem
                    </h4>
                    <p className="text-sm font-body leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-heading text-muted-foreground mb-2">
                      Approach
                    </h4>
                    <p className="text-sm font-body leading-relaxed">
                      {project.approach}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-heading text-muted-foreground mb-2">
                      Outcome
                    </h4>
                    <p className="text-sm font-body leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {project.description && (
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Tag className="w-4 h-4 text-primary" />
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-primary/10 text-primary text-xs rounded-full border border-primary/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 rounded-full bg-muted text-foreground/80 text-xs"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {project.liveUrl && (
                    <Button
                      onClick={() => window.open(project.liveUrl!, "_blank")}
                      className="bg-gradient-to-r from-primary to-primary text-white hover:opacity-90"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      onClick={() => window.open(project.githubUrl!, "_blank")}
                      className="border border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
