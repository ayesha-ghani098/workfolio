import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FolderGit2, ArrowRight, Briefcase } from "lucide-react";
import { useMemo } from "react";
import { getMajorProjects } from "@/lib/data";
import { tw } from "@/styles/tw";
import { cn } from "@/lib/utils";

const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// Reusable section heading matching the illustrated style
function SectionHeading({
  title,
  Icon,
  subtitle,
}: {
  title: string;
  Icon: any;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center gap-3">
        <span className="p-3 rounded-2xl bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </span>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function ProjectsPreview() {
  const projects = useMemo(() => getMajorProjects().slice(0, 3), []);

  return (
    <section className={`${tw.container} pb-40`}>
      <motion.div variants={item} className="mb-6">
        <SectionHeading
          title="MY PROJECTS"
          Icon={FolderGit2}
          subtitle="Selected work demonstrating real-world outcomes and craft."
        />
      </motion.div>
      <div className="divide-y divide-border/60">
        {projects.map((p) => (
          <div
            key={p.id}
            className="py-6 md:py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-3 group"
          >
            <div>
              <Link
                to="/projects"
                className="text-xl md:text-3xl font-display leading-none text-black dark:text-foreground hover:text-primary transition-colors"
              >
                {p.title}
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                {p.year || new Date().getFullYear()}
              </p>
            </div>
            <div className="flex items-start gap-4 md:min-w-[280px] justify-end">
              <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-sm md:text-base font-heading">
                  {p.company || p.tags?.[0] || "Design & Development"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(p.technologies || []).slice(0, 5).join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/projects"
          className={cn(tw.ctaOutline, "inline-flex items-center gap-2")}
        >
          View More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
