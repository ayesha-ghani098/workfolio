import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Lab from "./pages/Lab";
import Journey from "./pages/Journey";
import Contact from "./pages/Contact";
import SideMissions from "./pages/SideMissions";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/side-missions" element={<SideMissions />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
