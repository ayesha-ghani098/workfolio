import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getContact } from "@/lib/data";
import { sendCvPasswordEmail } from "@/lib/email";

interface CvDownloadProps {
  isMobile?: boolean;
  className?: string;
}

export default function CvDownload({
  isMobile = false,
  className = "",
}: CvDownloadProps) {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [cvEmail, setCvEmail] = useState("");
  const [sending, setSending] = useState(false);
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

  if (!contact.cvUrl) return null;

  return (
    <div className={`relative ${className}`} ref={cvDropdownRef}>
      <Button
        size="sm"
        variant="outline"
        className={isMobile ? "w-full" : "hidden sm:inline-flex"}
        onClick={() => setIsCvOpen((v) => !v)}
      >
        Download CV
      </Button>
      {isCvOpen && (
        <div
          className={`absolute ${isMobile ? "right-0" : "right-0"} mt-2 ${
            isMobile ? "w-full" : "w-[360px] max-w-[90vw]"
          } rounded-lg border bg-background p-4 shadow-lg`}
        >
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
              className={isMobile ? "w-full" : ""}
              onClick={handleDownload}
              disabled={sending || !cvEmail.trim()}
            >
              {sending ? "Processing..." : "Download"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
