import { Github, Linkedin, Mail } from "lucide-react";
import { getContact, getConfig } from "../lib/data";
import { tw } from "@/styles/tw";

export default function Footer() {
  const contact = getContact();
  const config = getConfig();

  return (
    <footer className={tw.footer}>
      <div className={`${tw.container} py-8`}>
        <div className={tw.footerRow}>
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2024 {config.siteName}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className={tw.footerIcon}
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={tw.footerIcon}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={tw.footerIcon}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
