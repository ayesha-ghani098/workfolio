import { motion } from "framer-motion";
import { Map, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/heading";
import { getJourney } from "@/lib/data";
import { tw } from "@/styles/tw";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

interface JourneyNodeProps {
  entry: any;
  index: number;
}

function JourneyNode({ entry, index }: JourneyNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div variants={itemVariants} className="relative">
      {/* Timeline line */}
      {index < 4 && (
        <div className="absolute left-6 top-16 w-0.5 h-16 bg-muted-foreground/20" />
      )}

      <Card className="ml-12 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
        <CardHeader
          className="cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className={tw.titlePrimary}>
                {entry.position}
              </CardTitle>
              <p className="text-sm font-medium text-foreground">
                {entry.company}
              </p>
              <p className="text-sm text-muted-foreground">
                {entry.duration} • {entry.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  {index + 1}
                </span>
              </div>
              <button
                className="p-1 hover:bg-muted rounded"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Description
                  </h4>
                  <p className="text-sm leading-relaxed">{entry.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.technologies.map((tech: string) => (
                      <span key={tech} className={tw.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

export default function Journey() {
  const journey = getJourney();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className={`${tw.container} ${tw.section}`}>
        {/* Header */}
        <PageHeader
          title="Journey Map"
          subtitle="My career timeline - from intern to software engineer, each step building towards expertise"
          icon={<Map className="w-8 h-8 text-primary" />}
        />

        {/* Timeline */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {journey.map((entry, index) => (
              <JourneyNode key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
