import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MousePointer2 } from "lucide-react";
import { tw } from "@/styles/tw";
import userPic from "@/assets/pic.jpeg";

const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function Hero() {
  return (
    <section className={`${tw.container} pt-20 pb-24 text-center`}>
      <motion.div variants={item} className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-[11px] sm:text-xs text-primary">
          <span className="w-2 h-2 rounded-full bg-system-green" /> Available
          for Work
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <img
          src={userPic}
          alt="Ayesha Ghani"
          className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-primary/20"
        />
        <h1 className="text-4xl md:text-6xl font-display font-bold text-black dark:text-foreground mb-4">
          Ayesha Ghani
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Full-Stack Developer & UI/UX Designer crafting digital experiences
          that blend creativity with cutting-edge technology.
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        <a
          href="https://github.com/ayesha-ghani098"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/ayesha-ghani098"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href="mailto:ayesha.ghani098@gmail.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>
      </motion.div>

      <motion.div variants={item} className="space-y-4">
        <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-secondary/50">
            React & Next.js
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary/50">
            TypeScript
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary/50">
            Node.js
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary/50">
            UI/UX Design
          </span>
        </div>

        <div className="pt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-4">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MousePointer2 className="w-4 h-4" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
