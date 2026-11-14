export type NavSubItem = {
  href: string;
  label: string;
  description?: string;
  megaMenuSection?: "core" | "more";
  hasRightArrow?: boolean;
};

export type NavLinkItem = {
  href: string;
  label: string;
  isMegaMenu?: boolean;
  megaMenuVariant?: "features" | "products";
  defaultMegaTitle?: string;
  subItems?: NavSubItem[];
};

export type FooterSection = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
};

