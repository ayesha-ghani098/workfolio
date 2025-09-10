import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MousePointer2 } from "lucide-react";
import { tw } from "@/styles/tw";
import userPic from "@/assets/pic.jpeg";

const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function Hero() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24 text-center">
      <motion.div variants={item} className="mb-6 sm:mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-[11px] sm:text-xs text-primary">
          <span className="w-2 h-2 rounded-full bg-system-green" /> Available
          for Work
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="relative mx-auto max-w-5xl px-2 sm:px-4"
      >
        {/* Badges - Hidden on very small screens, repositioned for mobile */}
        <div className="absolute -top-6 sm:-top-8 left-0 inline-flex items-center gap-2 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full border border-primary/30 bg-primary/10 text-xs sm:text-sm md:text-base">
          <img
            src={userPic}
            alt="Ayesha"
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full object-cover"
          />
          <span className="hidden xs:inline">Hello, I'm Ayesha</span>
          <span className="xs:hidden">Hi, I'm Ayesha</span>
        </div>
        <Link
          to="/contact"
          className="absolute top-4 sm:top-6 right-0 inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full border border-primary/30 bg-primary/10 text-xs sm:text-sm md:text-base"
        >
          <span className="hidden sm:inline">Let's Connect</span>
          <span className="sm:hidden">Connect</span>
        </Link>

        {/* Hide cursor animations on mobile to reduce clutter */}
        <span className="hidden md:block cursor-float cursor-purple left-[-30px] top-[-24px]">
          <MousePointer2 className="cursor-icon" />
        </span>
        <span className="hidden md:block cursor-float cursor-blue right-[-30px] top-[18px]">
          <MousePointer2 className="cursor-icon" />
        </span>

        <h1 className="font-display tracking-tight leading-[1.05] text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
          <span className="block text-primary">DIGITAL</span>
          <span className="block text-black dark:text-white">EXPERIENCE</span>
          <span className="block text-blue-400">DEVELOPER.</span>
        </h1>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-4 sm:mt-6 mx-auto max-w-[90%] sm:max-w-[34rem] px-2 sm:px-4 md:px-0 text-muted-foreground text-sm sm:text-base md:text-lg text-center leading-relaxed"
      >
        I create a digital experience that borders on efficiency, aesthetics and
        functionality.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2.5 md:gap-3"
      >
        <Link
          to="/contact"
          className={`${tw.cta} w-full sm:w-auto text-center`}
        >
          Let's Connect
        </Link>
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
          <Link
            to="https://github.com/ayesha-ghani098"
            className={tw.socialBtn}
            aria-label="GitHub"
          >
            <Github className={tw.socialIcon} />
          </Link>
          <Link
            to="https://www.linkedin.com/in/ayeshaghani098/"
            className={tw.socialBtn}
            aria-label="LinkedIn"
          >
            <Linkedin className={tw.socialIcon} />
          </Link>
          <Link to="/contact" className={tw.socialBtn} aria-label="Email">
            <Mail className={tw.socialIcon} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
