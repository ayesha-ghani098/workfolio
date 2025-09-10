import { motion } from "framer-motion";
import Hero from "@/components/dashboard/Hero";
import Statement from "@/components/dashboard/Statement";
import WhatIDo from "@/components/dashboard/WhatIDo";
import TechStack from "@/components/dashboard/TechStack";
import ProjectsPreview from "@/components/dashboard/ProjectsPreview";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function DashboardV2() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background"
    >
      <Hero />
      <Statement />
      <WhatIDo />
      <TechStack />
      <ProjectsPreview />
    </motion.div>
  );
}
