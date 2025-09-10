import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { getContact, getConfig } from "@/lib/data";
import { tw } from "@/styles/tw";
import { SiDiscord } from "react-icons/si";
import { useEffect, useRef } from "react";
import { TEXT_SIZING } from "@/lib/constants";

export default function FooterV2() {
  const contact = getContact();
  const config = getConfig();
  const bigTextRefInline = useRef<HTMLDivElement>(null);
  const bigTextContainerRefInline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = (
      el: HTMLDivElement | null,
      container: HTMLDivElement | null
    ) => {
      if (!el || !container) return;
      const containerWidth = container.clientWidth;
      const targetWidth = Math.max(
        0,
        containerWidth -
          (window.innerWidth < 640
            ? TEXT_SIZING.MOBILE_PADDING * 2
            : TEXT_SIZING.DESKTOP_PADDING * 2)
      );
      const baseSize = TEXT_SIZING.BASE_SIZE;
      el.style.fontSize = `${baseSize}px`;
      el.style.whiteSpace = "nowrap";
      el.style.lineHeight = "1";
      const measured = el.scrollWidth || el.getBoundingClientRect().width;
      if (measured > 0 && targetWidth > 0) {
        const nextSize = Math.max(
          TEXT_SIZING.MIN_SIZE,
          Math.floor((baseSize * targetWidth) / measured)
        );
        el.style.fontSize = `${nextSize}px`;
      }
    };

    const fitAll = () => {
      fit(bigTextRefInline.current, bigTextContainerRefInline.current);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(fitAll);
    });

    const onResize = () => requestAnimationFrame(fitAll);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <footer className="relative border-t bg-background overflow-visible">
      <div
        className={`${tw.container} pt-10 pb-20 md:pb-24 lg:pb-24 relative z-10`}
      >
        <div className="mb-10">
          <p className="text-xl md:text-2xl font-display text-foreground">
            Where <span className="text-violet-400">aesthetics</span> &{" "}
            <span className="text-cyan-400">functionality</span> meet
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-heading text-orange-500 dark:text-orange-400">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/side-missions"
                  className="hover:text-primary transition-colors"
                >
                  Side Missions
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-heading text-cyan-500 dark:text-cyan-400">
              Follow Me
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-primary" />
                </span>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center">
                  <Github className="w-4 h-4 text-primary" />
                </span>
                <a
                  href={contact.github}
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  Github
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center">
                  <SiDiscord className="w-4 h-4 text-primary" />
                </span>
                <a
                  href={`https://discord.com/users/${contact.discordId}`}
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              to="/contact"
              className="group rounded-xl border border-primary/25 bg-primary/5 dark:bg-primary/10 p-5 shadow-sm hover:bg-primary/10 dark:hover:bg-primary/15 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-base font-heading">Contact Me</h5>
                  <p className="text-xs text-muted-foreground">Say Hello !</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary/25 transition dark:bg-violet-600/30 dark:text-violet-200 dark:group-hover:bg-violet-600/40">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            <Link
              to="/projects"
              className="group rounded-xl border border-primary/25 bg-primary/5 dark:bg-primary/10 p-5 shadow-sm hover:bg-primary/10 dark:hover:bg-primary/15 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-base font-heading">My Projects</h5>
                  <p className="text-xs text-muted-foreground">
                    Explore Projects
                  </p>
                </div>
                <span className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary/25 transition dark:bg-violet-600/30 dark:text-violet-200 dark:group-hover:bg-violet-600/40">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={bigTextContainerRefInline}
        className="px-4 sm:px-6 lg:px-8 py-6"
      >
        <div
          ref={bigTextRefInline}
          className="w-full text-black dark:text-white font-bold leading-none tracking-tight text-center"
          style={{ fontFamily: '"Libertinus Keyboard", system-ui' }}
        >
          <span className="text-primary">a</span>ye
          <span className="text-blue-500">s</span>h
          <span className="text-primary">a</span>
          <span className="text-blue-500">g</span>h
          <span className="text-primary">a</span>n
          <span className="text-blue-500">i</span>
        </div>
      </div>

      <div className="relative z-10 border-t">
        <div
          className={`${tw.container} py-4 flex flex-col sm:flex-row items-center justify-between gap-4`}
        >
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            {config.siteName} ©2025 –{" "}
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> {contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
