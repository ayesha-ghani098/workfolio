import { motion } from "framer-motion";
import { useState } from "react";
import { getSiteData } from "@/lib/data";
import GameCard from "@/components/GameCard";
import QuestCarousel from "@/components/QuestCarousel";
import { PageHeader } from "@/components/ui/heading";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  User,
  BookOpen,
  FlaskConical,
  Map,
  Mail,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  AtSign,
  Hash,
} from "lucide-react";
import { MajorProject } from "@/types/site-data";
import pic from "@/assets/pic.jpeg";
import techImg from "@/assets/TECH.png";
import { tw } from "@/styles/tw";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Dashboard() {
  const { hero, majorProjects, contact } = getSiteData();
  const [selectedProject, setSelectedProject] = useState<MajorProject | null>(
    null
  );

  const gameModules = [
    {
      icon: User,
      title: "Profile Terminal",
      description: "View my background and skills",
      href: "/journey",
      iconColorClass: "text-primary",
    },
    {
      icon: BookOpen,
      title: "Quest Log",
      description: "Explore my major projects",
      href: "/projects",
      iconColorClass: "text-primary",
    },
    {
      icon: FlaskConical,
      title: "Lab",
      description: "Experimental projects & demos",
      href: "/lab",
      iconColorClass: "text-primary",
    },
    {
      icon: Map,
      title: "Journey Map",
      description: "Career timeline & experience",
      href: "/journey",
      iconColorClass: "text-primary",
    },
    {
      icon: Mail,
      title: "Contact Beacon",
      description: "Get in touch with me",
      href: "/contact",
      iconColorClass: "text-primary",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-dark rounded-full opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-modern rounded-full opacity-5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className={`${tw.container} ${tw.section} relative z-10`}>
        {/* Hero Section - new layout */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className={`${tw.grid2} items-start`}>
            {/* Left - Headline & CTA */}
            <motion.div
              variants={itemVariants}
              className={`${tw.heroGap} order-2 lg:order-1 lg:pr-8 text-center lg:text-left items-center`}
            >
              <div className={`${tw.badge} text-primary`}>
                <span className="w-2 h-2 rounded-full bg-system-green" />
                AVAILABLE FOR WORK
              </div>
              <h1 className={`${tw.h1} text-foreground`}>
                Hi, I’m
                <br />
                <span className="text-primary">Software</span>
                <br />
                Engineer
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                {hero.oneLiner}
              </p>
              <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className={`${tw.cta} min-w-[140px] text-center`}
                >
                  Contact
                </Link>
                <Link
                  to="/projects"
                  className={`${tw.ctaOutline} min-w-[140px] text-center`}
                >
                  View Projects
                </Link>
              </div>
            </motion.div>

            {/* Right - Showcase cards with profile image */}
            <motion.div
              variants={itemVariants}
              className="order-1 lg:order-2 w-full"
            >
              <div className="flex flex-row items-center justify-center sm:justify-start sm:items-start gap-4 sm:gap-6">
                {/* Left mini card */}
                <div className="glass rounded-2xl p-0 w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 overflow-hidden">
                  <img
                    src={techImg}
                    alt="Tech visual"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Profile image card */}
                <div className="glass rounded-2xl p-0 w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 overflow-hidden">
                  <img
                    src={pic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6">
                {/* Left gradient info box */}
                <div className="sm:w-80 md:w-80 w-auto rounded-xl p-4 bg-primary text-primary-foreground mx-auto sm:mx-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-base font-heading">
                    <span className="px-2 py-1 rounded-full bg-white/15">
                      Software Engineer
                    </span>
                    <span className="opacity-90">•</span>
                    <span className="px-2 py-1 rounded-full bg-white/15">
                      Fullstack
                    </span>
                    <span className="opacity-90">•</span>
                    <span className="px-2 py-1 rounded-full bg-white/15">
                      AI‑driven CX
                    </span>
                  </div>
                </div>
                {/* Right icon grid (3 x 2) */}
                <div className="grid grid-cols-3 gap-3 place-items-center w-auto mx-auto sm:mx-0 sm:w-36 md:w-40">
                  <Link
                    to={contact.github || "#"}
                    aria-label="GitHub"
                    className={tw.socialBtn}
                  >
                    <Github className={tw.socialIcon} />
                  </Link>
                  <Link
                    to={contact.linkedin || "#"}
                    aria-label="LinkedIn"
                    className={tw.socialBtn}
                  >
                    <Linkedin className={tw.socialIcon} />
                  </Link>
                  <Link
                    to={contact.facebook || "#"}
                    aria-label="Facebook"
                    className={tw.socialBtn}
                  >
                    <Facebook className={tw.socialIcon} />
                  </Link>
                  <Link
                    to={
                      contact.instagram
                        ? contact.instagram.startsWith("http")
                          ? contact.instagram
                          : `https://instagram.com/${contact.instagram.replace(
                              /^@/,
                              ""
                            )}`
                        : "#"
                    }
                    aria-label="Instagram"
                    className={tw.socialBtn}
                  >
                    <Instagram className={tw.socialIcon} />
                  </Link>
                  <Link
                    to={
                      contact.threads
                        ? `https://www.threads.net/@${contact.threads.replace(
                            /^@/,
                            ""
                          )}`
                        : "#"
                    }
                    aria-label="Threads"
                    className={tw.socialBtn}
                  >
                    <AtSign className={tw.socialIcon} />
                  </Link>
                  <Link
                    to={
                      contact.discordUsername
                        ? `https://discord.com/users/${contact.discordId || ""}`
                        : "#"
                    }
                    aria-label="Discord"
                    className={tw.socialBtn}
                  >
                    <Hash className={tw.socialIcon} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <div className={tw.grid3}>
          {/* Left Column - Game Dashboard */}
          <motion.section variants={itemVariants} className="lg:col-span-2">
            <PageHeader
              title="Game Dashboard"
              subtitle="Navigate through different modules to explore my portfolio"
              icon={<Gamepad2 className="w-8 h-8 text-primary" />}
            />

            {/* Game Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameModules.map((module, index) => (
                <motion.div
                  key={module.title}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GameCard
                    icon={module.icon}
                    title={module.title}
                    description={module.description}
                    href={module.href}
                    iconColorClass={module.iconColorClass}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Right Column - Quest Carousel */}
          <motion.section variants={itemVariants} className="lg:col-span-1">
            <QuestCarousel
              projects={majorProjects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
            />
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
