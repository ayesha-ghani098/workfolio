import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MousePointer2 } from "lucide-react";
import { getContact } from "@/lib/data";
import { tw } from "@/styles/tw";
import userPic from "@/assets/pic.jpeg";

const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function Hero() {
  const contact = getContact();

  return (
    <section className={`${tw.container} pt-20 pb-24 text-center`}>
      <motion.div variants={item} className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-[11px] sm:text-xs text-primary">
          <span className="w-2 h-2 rounded-full bg-system-green" /> Available
          for Work
        </div>
      </motion.div>

      <motion.div variants={item} className="relative mx-auto max-w-5xl px-2">
        {/* Badges */}
        <div className="absolute -top-8 left-0 inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-sm sm:text-base">
          <img
            src={userPic}
            alt="Ayesha"
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover"
          />
          Hello, I'm Ayesha
        </div>
        <Link
          to="/contact"
          className="absolute top-6 right-0 inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-sm sm:text-base"
        >
          Let's Connect
        </Link>
        <span className="cursor-float cursor-purple left-[-30px] top-[-24px]">
          <MousePointer2 className="cursor-icon" />
        </span>
        <span className="cursor-float cursor-blue right-[-30px] top-[18px]">
          <MousePointer2 className="cursor-icon" />
        </span>

        <h1 className="font-display tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-7xl text-center">
          <span className="block text-primary">DIGITAL</span>
          <span className="block text-black dark:text-white">EXPERIENCE</span>
          <span className="block text-blue-400">DEVELOPER.</span>
        </h1>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-4 sm:mt-6 mx-auto max-w-[34rem] px-4 sm:px-0 text-muted-foreground text-base sm:text-lg text-center"
      >
        I create a digital experience that borders on efficiency, aesthetics and
        functionality.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-5 sm:mt-6 flex items-center justify-center gap-2.5 sm:gap-3"
      >
        <Link to="/contact" className={tw.cta}>
          Let's Connect
        </Link>
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
      </motion.div>
    </section>
  );
}
