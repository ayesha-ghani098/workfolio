export interface Hero {
  name: string;
  tagline: string;
  oneLiner: string;
  frontImage: string;
  backImage: string;
}

export interface Media {
  demo?: string;
  image?: string;
}

export interface MajorProject {
  id: string;
  title: string;
  company: string;
  problem: string;
  approach: string;
  outcome: string;
  media: Media;
  technologies: string[];
  description?: string;
  year?: string;
  category?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imageKey?: string;
  tags?: string[];
}

export interface SideMission {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface JourneyEntry {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  media: Media;
  technologies: string[];
}

export interface Contact {
  email: string;
  topmateUrl: string;
  github: string;
  linkedin: string;
  // Optional extended fields used across the app
  phonePrimary?: string;
  phoneSecondary?: string;
  discordId?: string;
  discordUsername?: string;
  threads?: string; // handle, with or without leading @
  instagram?: string; // handle or full URL
  facebook?: string; // full URL
}

export interface Config {
  siteName: string;
  siteUrl: string;
  description: string;
}

export interface SiteData {
  hero: Hero;
  majorProjects: MajorProject[];
  sideMissions: SideMission[];
  journey: JourneyEntry[];
  skills: string[];
  contact: Contact;
  config: Config;
} 