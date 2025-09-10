import { motion } from "framer-motion";
import { Mail, Zap } from "lucide-react";
import { getContact } from "@/lib/data";
import { tw } from "@/styles/tw";

const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function Statement() {
  const contact = getContact();

  return (
    <section className={`${tw.container} pb-24`}>
      <div className="grid grid-cols-3 items-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          // Design, Code, Engage
        </p>
        <div />
        <div className="flex justify-end">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs"
          >
            <Mail className="w-4 h-4" /> {contact.email}
          </a>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-5xl leading-[1.2] font-display text-black dark:text-foreground">
            <span className="text-primary">Empowering</span> success in the
            digital landscape.
            <br className="hidden md:block" /> Together, we shape a{" "}
            <span className="text-primary">visionary</span>
            future, delivering
            <br className="hidden md:block" /> on promises and{" "}
            <span className="text-primary">pioneering</span>
            <br className="hidden md:block" />{" "}
            <span className="text-primary">innovation</span>.
          </h2>
        </div>
        <div>
          <p className="text-sm md:text-base text-muted-foreground">
            My blend of design, coding, and interaction expertise distinguishes
            me within the tech industry.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-2xl md:text-3xl font-heading text-blue-400">
          Coding the Future
        </p>
        <p className="text-2xl md:text-3xl font-heading text-blue-400">
          Architecting Innovation
        </p>
      </div>

      <div className="relative my-6">
        <div className="border-t" />
        <div className="absolute -right-3 -top-6 w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Zap className="w-6 h-6 text-primary" />
        </div>
      </div>

      <p className="max-w-3xl text-base md:text-lg text-foreground/90">
        I specialize in engineering bespoke solutions, consistently pushing the
        limits in each project, with an unwavering dedication to prioritizing
        excellence.
      </p>
    </section>
  );
}
