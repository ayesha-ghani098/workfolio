import { motion } from "framer-motion";
import { Mail, Send, Calendar, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/heading";
import { getContact } from "@/lib/data";
import { sendEmail, EmailFormData } from "@/lib/email";
import { tw } from "@/styles/tw";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function Contact() {
  const contact = getContact();
  const [formData, setFormData] = useState<EmailFormData & { hp?: string }>({
    name: "",
    email: "",
    subject: "",
    message: "",
    hp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: if filled, silently succeed to bots
    if (formData.hp && formData.hp.trim().length > 0) {
      setSubmitStatus({ success: true, message: "Message sent successfully!" });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const { hp, ...payload } = formData as any;
      const result = await sendEmail(payload);
      setSubmitStatus(result);
      if (result.success)
        setFormData({ name: "", email: "", subject: "", message: "", hp: "" });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange =
    (field: keyof (EmailFormData & { hp?: string })) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

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
          title="Contact Beacon"
          subtitle="Ready to collaborate? Let's discuss your next project or just say hello!"
          icon={<Mail className="w-8 h-8 text-primary" />}
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (screen-reader/visual hidden) */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="hp">Do not fill this field</label>
                    <input
                      id="hp"
                      type="text"
                      autoComplete="off"
                      tabIndex={-1}
                      value={formData.hp}
                      onChange={handleInputChange("hp")}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange("subject")}
                      required
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange("message")}
                      required
                      placeholder="Tell me about your project or just say hello!"
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  {submitStatus && (
                    <div
                      className={`p-3 rounded-md text-sm ${
                        submitStatus.success
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                      role="alert"
                      aria-live="polite"
                    >
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary" />
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${tw.body} mb-4`}>
                  Schedule a call to discuss your project, collaboration
                  opportunities, or just to chat about technology.
                </p>
                <Button asChild className="w-full">
                  <a
                    href={contact.topmateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Session
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
