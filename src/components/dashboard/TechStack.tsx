import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiVite,
  SiPostgresql,
  SiDocker,
  SiAmazon,
  SiGithub,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiPrisma,
  SiGraphql,
  SiKubernetes,
  SiGooglecloud,
  SiFirebase,
  SiRabbitmq,
  SiApachekafka,
  SiNginx,
} from "react-icons/si";

const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const TECH_ICONS = [
  { Icon: SiNextdotjs, label: "Next.js", className: "text-foreground" },
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { Icon: SiExpress, label: "Express", className: "text-foreground" },
  { Icon: SiNestjs, label: "NestJS", color: "#E0234E" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
  { Icon: SiRedux, label: "Redux", color: "#764ABC" },
  { Icon: SiGraphql, label: "GraphQL", color: "#E10098" },
  { Icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  { Icon: SiMysql, label: "MySQL", color: "#4479A1" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { Icon: SiRedis, label: "Redis", color: "#DC382D" },
  { Icon: SiPrisma, label: "Prisma", color: "#2D3748" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
  { Icon: SiKubernetes, label: "Kubernetes", color: "#326CE5" },
  { Icon: SiAmazon, label: "AWS", color: "#FF9900" },
  { Icon: SiGooglecloud, label: "GCP", color: "#4285F4" },
  { Icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { Icon: SiRabbitmq, label: "RabbitMQ", color: "#FF6600" },
  { Icon: SiApachekafka, label: "Kafka", color: "#231F20" },
  { Icon: SiNginx, label: "Nginx", color: "#009639" },
  { Icon: SiVite, label: "Vite", color: "#646CFF" },
  {
    Icon: SiGithub,
    label: "GitHub",
    className: "text-black dark:text-white",
  },
];

function TechIconRow() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {TECH_ICONS.map(({ Icon, label, className, color }, i) => (
        <span key={i} title={label} className="inline-flex">
          <Icon
            size={70}
            style={color ? { color } : undefined}
            className={cn(
              "transition-transform duration-200 hover:scale-110",
              className
            )}
          />
        </span>
      ))}
    </div>
  );
}

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

export default function TechStack() {
  return (
    <section className="pb-24 pt-16">
      <motion.div variants={item} className="mb-6 text-center">
        <SectionHeading
          title="USING TECHNOLOGIES"
          Icon={Cpu}
          subtitle="A pragmatic stack I use to ship fast, scalable products."
        />
      </motion.div>
      <section className="py-8 bg-muted/50">
        <div className="marquee">
          <div className="marquee-track px-6">
            <TechIconRow />
            <div className="w-12" />
            <TechIconRow />
            <div className="w-12" />
            <TechIconRow />
          </div>
        </div>
      </section>
    </section>
  );
}
