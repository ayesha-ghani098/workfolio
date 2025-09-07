export const tw = {
  // Layout
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  grid2: "grid lg:grid-cols-2 gap-12",
  grid3: "grid lg:grid-cols-3 gap-8",

  // Cards & glass
  glass: "glass rounded-2xl",
  glassSoft: "glass rounded-xl",
  panel: "glass rounded-2xl p-6",
  cardHeader: "bg-gradient-to-r from-primary/10 to-primary/10 p-4",
  cardHeaderLg: "bg-gradient-to-r from-primary/5 to-primary/10 p-6",
  cardBorder: "border-2 border-primary/30",

  // Typography
  h1: "text-5xl md:text-7xl leading-[1.1] font-display tracking-tight",
  h3: "text-xl font-heading",
  body: "text-sm text-muted-foreground font-body leading-relaxed",
  titlePrimary: "text-lg font-heading text-primary",

  // Buttons
  pill: "px-5 py-2.5 rounded-full",
  cta: "px-5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition",
  ctaOutline:
    "px-5 py-2.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition",
  iconBtn: "w-8 h-8 p-0 bg-gradient-to-r from-primary to-primary text-white hover:opacity-90",
  iconBtnSm: "p-2 bg-gradient-to-r from-primary to-primary text-white hover:opacity-90",

  // Badges
  badge: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs",

  // Chips
  techChip: "px-2 py-1 bg-gradient-to-r from-primary/10 to-primary/10 text-primary text-xs rounded-full border border-primary/20 font-body",
  techChipLg: "px-3 py-1 bg-gradient-to-r from-primary/10 to-primary/10 text-primary text-xs rounded-full border border-primary/20 font-body",
  techPill: "px-2 py-1 bg-primary/10 text-primary text-xs rounded-full",

  // Icon chips
  iconWrap: "w-12 h-12 shrink-0 rounded-xl bg-primary/15 dark:bg-primary/20 flex items-center justify-center",
  icon: "w-6 h-6 text-primary dark:text-primary-foreground",

  // Social icon buttons
  socialBtn:
    "w-11 h-11 rounded-full bg-primary/10 border border-primary/20 shadow-sm flex items-center justify-center hover:bg-primary/15 transition",
  socialIcon: "w-5 h-5 text-primary",

  // Nav/Footer
  nav: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
  navRow: "flex h-16 items-center justify-between",
  navDesk: "hidden md:flex items-center space-x-8",
  navLink: "relative text-sm font-medium transition-colors hover:text-primary",
  navLinkActive: "text-primary",
  navLinkMuted: "text-muted-foreground",
  navMobileList: "px-2 pt-2 pb-3 space-y-1",
  footer: "border-t bg-background",
  footerRow: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0",
  footerIcon: "text-muted-foreground hover:text-primary transition-colors",

  // Spacing helpers
  section: "pt-20 pb-20",
  heroGap: "space-y-6",
}; 