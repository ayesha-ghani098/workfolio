import { motion } from "framer-motion";
import { BookOpen, Database, Smartphone, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tw } from "@/styles/tw";

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

const services = [
  {
    title: "System Design & DB Architecture",
    desc: "Designing scalable systems, APIs, and databases for reliability and performance.",
    icon: Database,
    iconClass: "text-amber-500",
  },
  {
    title: "Web & Mobile",
    desc: "Transforming ideas into exceptional web/mobile experiences.",
    icon: Smartphone,
    iconClass: "text-blue-500",
  },
  {
    title: "Development",
    desc: "Bringing visions to life with modern tech and best practices.",
    icon: Code,
    iconClass: "text-green-500",
  },
];

export default function WhatIDo() {
  return (
    <section className={`${tw.container} pb-12 pt-10`}>
      <motion.div variants={item} className="mb-6">
        <SectionHeading
          title="WHAT I DO"
          Icon={BookOpen}
          subtitle="Four pillars where I create value — from UX to engineering."
        />
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((card) => (
          <motion.div key={card.title} variants={item}>
            <Card className="rounded-2xl border bg-card/70 p-6 text-left shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <card.icon className={cn("w-6 h-6", card.iconClass)} />
                </div>
                <div>
                  <h3 className="text-lg font-heading mb-2 text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
