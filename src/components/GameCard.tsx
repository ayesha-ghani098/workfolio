import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { tw } from "@/styles/tw";
import { Link } from "react-router-dom";

interface GameCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  href?: string;
  className?: string;
  iconColorClass?: string; // kept for future, but icon now uses white for contrast in dark
}

export default function GameCard({
  icon: Icon,
  title,
  description,
  href,
  className = "",
  iconColorClass = "text-primary",
}: GameCardProps) {
  const isInternal = Boolean(href && href.startsWith("/"));
  const CardComponent: any = href ? (isInternal ? Link : "a") : "div";

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        rotateX: 2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`h-full ${className}`}
    >
      <Card
        className={cn(
          "h-full cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 hover:border-primary/30 glass group/card"
        )}
      >
        <CardComponent
          {...(href ? (isInternal ? { to: href } : { href }) : {})}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  tw.iconWrap,
                  "group-hover/card:scale-110 transition-transform duration-300"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    iconColorClass || "text-primary",
                    "dark:text-primary-foreground"
                  )}
                />
              </div>
              <CardTitle className="text-xl font-heading group-hover/card:text-primary transition-colors duration-300">
                {title}
              </CardTitle>
            </div>
          </CardHeader>
          {description && (
            <CardContent>
              <p className={tw.body}>{description}</p>
            </CardContent>
          )}
        </CardComponent>
      </Card>
    </motion.div>
  );
}
