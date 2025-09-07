import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  icon?: ReactNode;
}

export function Heading({
  children,
  level = 1,
  className,
  icon,
}: HeadingProps) {
  const baseClasses = "font-display tracking-tight";

  const sizeClasses = {
    1: "text-4xl md:text-5xl font-bold",
    2: "text-3xl md:text-4xl font-semibold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-medium",
    5: "text-lg md:text-xl font-medium",
    6: "text-base md:text-lg font-medium",
  };

  type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const Tag = `h${level}` as HeadingTag;

  return (
    <Tag className={cn(baseClasses, sizeClasses[level], className)}>
      {icon && <span className="inline-block mr-3">{icon}</span>}
      {children}
    </Tag>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <div className="flex items-center justify-center gap-3 mb-4">
        {icon && (
          <div className="p-3 bg-primary/10 rounded-2xl backdrop-blur-sm">
            {icon}
          </div>
        )}
        <Heading level={1}>{title}</Heading>
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, icon, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-8", className)}>
      {icon && <div className="p-2 bg-primary/10 rounded-xl">{icon}</div>}
      <Heading level={2}>{title}</Heading>
    </div>
  );
}
