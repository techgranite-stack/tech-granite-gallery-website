export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavGroup {
  heading: string;
  href?: string;
  items: NavLinkItem[];
}

export interface NavItem {
  label: string;
  href?: string;
  mega?: boolean;
  groups?: NavGroup[];
  items?: NavLinkItem[];
}

export interface NavbarProps {
  links: NavItem[];
  logoSrc: string;
  scrolledLogoSrc?: string;
  invertLogoOnScroll?: boolean;
  logoAlt?: string;
  navBackgroundRgb?: string;
  ctaText?: string;
  ctaHref?: string;
}
