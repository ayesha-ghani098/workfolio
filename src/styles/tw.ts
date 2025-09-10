export const tw = {
  // Layout
  container: "container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-full",
  grid2: "grid lg:grid-cols-2 gap-8 sm:gap-12",
  grid3: "grid lg:grid-cols-3 gap-6 sm:gap-8",

  // Cards & glass
  glass: "glass rounded-2xl",
  glassSoft: "glass rounded-xl",
  panel: "glass rounded-2xl p-4 sm:p-6",
  cardHeader: "bg-gradient-to-r from-primary/10 to-primary/10 p-3 sm:p-4",
  cardHeaderLg: "bg-gradient-to-r from-primary/5 to-primary/10 p-4 sm:p-6",
  cardBorder: "border-2 border-primary/30",

  // Typography
  h1: "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-display tracking-tight",
  h3: "text-lg sm:text-xl font-heading",
  body: "text-xs sm:text-sm text-muted-foreground font-body leading-relaxed",
  titlePrimary: "text-base sm:text-lg font-heading text-primary",

  // Buttons
  pill: "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full",
  cta: "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition text-sm sm:text-base",
  ctaOutline:
    "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition text-sm sm:text-base",
  iconBtn: "w-7 h-7 sm:w-8 sm:h-8 p-0 bg-gradient-to-r from-primary to-primary text-white hover:opacity-90",
  iconBtnSm: "p-1.5 sm:p-2 bg-gradient-to-r from-primary to-primary text-white hover:opacity-90",

  // Badges
  badge: "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-[10px] sm:text-xs",

  // Chips
  techChip: "px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-primary/10 to-primary/10 text-primary text-[10px] sm:text-xs rounded-full border border-primary/20 font-body",
  techChipLg: "px-2.5 sm:px-3 py-1 bg-gradient-to-r from-primary/10 to-primary/10 text-primary text-xs rounded-full border border-primary/20 font-body",
  techPill: "px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 text-primary text-[10px] sm:text-xs rounded-full",

  // Icon chips
  iconWrap: "w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-primary/15 dark:bg-primary/20 flex items-center justify-center",
  icon: "w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary-foreground",

  // Social icon buttons
  socialBtn:
    "w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary/10 border border-primary/20 shadow-sm flex items-center justify-center hover:bg-primary/15 transition",
  socialIcon: "w-4 h-4 sm:w-5 sm:h-5 text-primary",

  // Nav/Footer
  nav: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
  navRow: "flex h-14 sm:h-16 items-center justify-between",
  navDesk: "hidden md:flex items-center space-x-6 sm:space-x-8",
  navLink: "relative text-xs sm:text-sm font-medium transition-colors hover:text-primary",
  navLinkActive: "text-primary",
  navLinkMuted: "text-muted-foreground",
  navMobileList: "px-2 pt-2 pb-3 space-y-1",
  footer: "border-t bg-background",
  footerRow: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0",
  footerIcon: "text-muted-foreground hover:text-primary transition-colors",

  // Spacing helpers
  section: "pt-16 sm:pt-20 pb-16 sm:pb-20",
  heroGap: "space-y-4 sm:space-y-6",
}; 