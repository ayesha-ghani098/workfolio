import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import FooterV2 from "./components/FooterV2";
import DashboardV2 from "./pages/DashboardV2";
import Projects from "./pages/Projects";
import Lab from "./pages/Lab";
import Journey from "./pages/Journey";
import Contact from "./pages/Contact";
import SideMissions from "./pages/SideMissions";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<DashboardV2 />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/side-missions" element={<SideMissions />} />
            </Routes>
          </AnimatePresence>
        </main>
        <FooterV2 />
      </div>
    </ThemeProvider>
  );
}

export default App;
