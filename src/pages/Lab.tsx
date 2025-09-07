import { motion } from "framer-motion";
import { FlaskConical, Palette, Zap } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/heading";
import { tw } from "@/styles/tw";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function Lab() {
  const [hue, setHue] = useState(220);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHue(parseInt(e.target.value));
  const toggleAnimation = () => setIsAnimating(!isAnimating);

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
          title="Lab"
          subtitle="Experimental playground for testing new ideas and interactive demos"
          icon={<FlaskConical className="w-8 h-8 text-primary" />}
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Theme Hue Slider */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme Hue Slider
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className={tw.body}>
                  Experiment with different color themes by adjusting the hue
                  value.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="hue-slider" className="text-sm font-medium">
                      Hue: {hue}°
                    </label>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: `hsl(${hue}, 70%, 50%)` }}
                    />
                  </div>

                  <input
                    id="hue-slider"
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={handleHueChange}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />

                  <div className="grid grid-cols-5 gap-2">
                    {[0, 60, 120, 180, 240, 300, 360].map((value) => (
                      <button
                        key={value}
                        onClick={() => setHue(value)}
                        className="h-8 rounded border-2 border-border hover:border-primary transition-colors"
                        style={{ backgroundColor: `hsl(${value}, 70%, 50%)` }}
                        aria-label={`Set hue to ${value}°`}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: `hsl(${hue}, 10%, 95%)` }}
                >
                  <p
                    className="text-sm"
                    style={{ color: `hsl(${hue}, 70%, 30%)` }}
                  >
                    Preview: This is how text would look with the selected hue
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animation Playground */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Animation Playground
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className={tw.body}>
                  Test different animation states and interactions.
                </p>

                <div className="space-y-4">
                  <Button onClick={toggleAnimation} className="w-full">
                    {isAnimating ? "Stop Animation" : "Start Animation"}
                  </Button>

                  <div className="flex justify-center">
                    <motion.div
                      className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold"
                      animate={
                        isAnimating
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360],
                              borderRadius: ["8px", "50%", "8px"],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: isAnimating ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    >
                      {isAnimating ? "🎯" : "🎲"}
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-16 bg-muted rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={
                          isAnimating
                            ? { y: [0, -10, 0], opacity: [1, 0.7, 1] }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          repeat: isAnimating ? Infinity : 0,
                          delay: i * 0.2,
                        }}
                      >
                        <span className="text-sm font-medium">Item {i}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Coming Soon Section */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <FlaskConical className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                More Experiments Coming Soon
              </h3>
              <p className="text-muted-foreground">
                This lab space will feature more interactive demos, code
                experiments, and creative projects. Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
