import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";
import { getContact } from "../lib/data";
import { tw } from "@/styles/tw";
import { Input } from "./ui/input";
import { sendCvPasswordEmail } from "@/lib/email";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/projects", label: "Projects" },
  { path: "/side-missions", label: "Side Missions" },

  { path: "/lab", label: "Lab" },
  { path: "/journey", label: "Journey" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [cvEmail, setCvEmail] = useState("");
  const [sending, setSending] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const contact = getContact();
  const cvDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickAway = (e: MouseEvent) => {
      if (!isCvOpen) return;
      const target = e.target as Node | null;
      if (
        cvDropdownRef.current &&
        target &&
        !cvDropdownRef.current.contains(target)
      ) {
        setIsCvOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, [isCvOpen]);

  const triggerDownload = () => {
    if (!contact.cvUrl) return;
    const a = document.createElement("a");
    a.href = contact.cvUrl;
    a.setAttribute("download", "");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownload = async () => {
    if (!contact.cvUrl || !cvEmail.trim()) return;
    setSending(true);
    try {
      // Fire-and-forget email sending; still proceed to download immediately
      void sendCvPasswordEmail(cvEmail.trim()).catch(() => {});
      triggerDownload();
    } finally {
      setSending(false);
      setIsCvOpen(false);
    }
  };

  return (
    <nav className={tw.nav}>
      <div className={tw.container}>
        <div className={tw.navRow}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-display text-primary"
            >
              AG.Workfolio;
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className={tw.navDesk}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${tw.navLink} ${
                  location.pathname === item.path
                    ? tw.navLinkActive
                    : tw.navLinkMuted
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* CV Download Dropdown */}
            {contact.cvUrl && (
              <div className="relative" ref={cvDropdownRef}>
                <Button
                  size="sm"
                  variant="outline"
                  className="hidden sm:inline-flex"
                  onClick={() => setIsCvOpen((v) => !v)}
                >
                  Download CV
                </Button>
                {isCvOpen && (
                  <div className="absolute right-0 mt-2 w-[360px] max-w-[90vw] rounded-lg border bg-background p-4 shadow-lg">
                    <div className="flex items-start justify-between">
                      <label className="text-sm font-medium">Email</label>
                      <button
                        aria-label="Close"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setIsCvOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={cvEmail}
                        onChange={(e) => setCvEmail(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Download CV. Password will be sent to your email.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={handleDownload}
                        disabled={sending || !cvEmail.trim()}
                      >
                        {sending ? "Processing..." : "Download"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Book Session Button */}
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a
                href={contact.topmateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Session
              </a>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className={tw.navMobileList}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {contact.cvUrl && (
                <div className="relative mt-4" ref={cvDropdownRef}>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setIsCvOpen((v) => !v)}
                  >
                    Download CV
                  </Button>
                  {isCvOpen && (
                    <div className="absolute right-0 mt-2 w-full rounded-lg border bg-background p-4 shadow-lg">
                      <div className="flex items-start justify-between">
                        <label className="text-sm font-medium">Email</label>
                        <button
                          aria-label="Close"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setIsCvOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={cvEmail}
                          onChange={(e) => setCvEmail(e.target.value)}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Download CV. Password will be sent to your email.
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button
                          className="w-full"
                          onClick={handleDownload}
                          disabled={sending || !cvEmail.trim()}
                        >
                          {sending ? "Processing..." : "Download"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <Button asChild className="w-full mt-4">
                <a
                  href={contact.topmateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Session
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
