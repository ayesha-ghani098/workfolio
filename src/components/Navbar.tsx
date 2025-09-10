import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";
import { getContact } from "../lib/data";
import { tw } from "@/styles/tw";
import CvDownload from "./CvDownload";

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
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const contact = getContact();

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
              Workfolio
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
            {/* CV Download */}
            <CvDownload />

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
                <Menu className="h-4 w-4" />
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

              {/* CV Download for Mobile */}
              <div className="mt-4">
                <CvDownload isMobile />
              </div>

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
