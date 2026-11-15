export type EventItem = {
  id: string;
  date: string;
  title: string;
  venue: string;
  location: string;
  status: string;
  flyerUrl: string;
  description: string;
};

export type LivePerformanceVideo = {
  id: string;
  youtubeId: string;
  title: string;
  subtitle: string;
};

export const HOME_UPCOMING_TOURS: EventItem[] = [
  {
    id: "01",
    date: "15th APRIL 2022",
    title: "SAFARI LUX LOUNGE",
    venue: "Safari Lux Lounge",
    location: "Charlotte, NC",
    status: "SOLD OUT",
    flyerUrl: "/images/events/1.jpg",
    description:
      "Wiz Ofuasia (Wizboyy) live in concert at Safari Lux Lounge, 5020 E Independence Blvd, Charlotte, NC. Music by DJ Beezy.",
  },
  {
    id: "02",
    date: "27th MAY 2022",
    title: "LIVE IN D.M.V",
    venue: "VIP Lounge",
    location: "Hyattsville, MD",
    status: "SOLD OUT",
    flyerUrl: "/images/events/2-1272.jpg",
    description:
      "Memorial Day Weekend special live performance by Wiz Ofuasia (Wizboyy) at VIP Lounge, 5365 Jackson St, Hyattsville, MD.",
  },
  {
    id: "03",
    date: "23rd APRIL 2022",
    title: "LIVE IN OAKLAND",
    venue: "New Karibean City",
    location: "Oakland, CA",
    status: "SOLD OUT",
    flyerUrl: "/images/events/3.jpg",
    description:
      "Sky Concept presents Wizboyy (Wiz Ofuasia) Live in Oakland at New Karibean City, 1408 Webster St, Oakland, CA.",
  },
];

export const ALL_EVENTS: EventItem[] = [
  ...HOME_UPCOMING_TOURS,
  {
    id: "04",
    date: "2022",
    title: "CAMEROON LIVE CONCERT",
    venue: "Cameroon Tour",
    location: "Cameroon",
    status: "PAST SHOW",
    flyerUrl: "/images/events/cameroon-event--2022-wiz-ofuasia.jpg",
    description:
      "Wiz Ofuasia (Wizboyy) headlining live in Cameroon — Afrobeats & Highlife showcase.",
  },
  {
    id: "05",
    date: "FEBRUARY 2022",
    title: "AFROCENTRIC TOUR",
    venue: "USA Tour Dates",
    location: "United States",
    status: "PAST TOUR",
    flyerUrl: "/images/events/afrocentric-tour-feb-2022-wiz-ofuasia.jpg",
    description:
      "Wiz Ofuasia Afrocentric Tour — February 2022 live tour series across major US cities.",
  },
  {
    id: "06",
    date: "MAY 2022",
    title: "LIVE IN JACKSON ST.",
    venue: "Jackson St. Showcase",
    location: "United States",
    status: "PAST SHOW",
    flyerUrl: "/images/events/wiz-ofuasia-live-in-jackson-st--may-2022.jpg",
    description:
      "Wiz Ofuasia live performance at Jackson St. — May 2022 special edition.",
  },
  {
    id: "07",
    date: "TOUR ARCHIVE",
    title: "WIZ OFUASIA LIVE SHOWCASE",
    venue: "Special Appearance",
    location: "International",
    status: "ARCHIVE",
    flyerUrl: "/images/events/1-1241.jpg",
    description:
      "Official event flyer and live concert appearance by Wiz Ofuasia (Wizboyy).",
  },
];

export const LIVE_PERFORMANCE_VIDEOS: LivePerformanceVideo[] = [
  {
    id: "01",
    youtubeId: "YUjB15y-zE0",
    title: "Wizboyy Live in Concert — Malabo Stadium",
    subtitle: "Equatorial Guinea Live Performance",
  },
  {
    id: "02",
    youtubeId: "hc0ifBn4ebQ",
    title: "Wizboyy Live in Cologne",
    subtitle: "Europe Tour Live Performance",
  },
  {
    id: "03",
    youtubeId: "V3_Z69vskic",
    title: "Wizboyy Live in Zurich, Switzerland",
    subtitle: "Hey City Club — Europe Tour",
  },
];

export const EUROPE_TOUR_HIGHLIGHTS = [
  "Wiz Ofuasia live in Nurnberg, Germany (Europe Tour 2018)",
  "Wiz Ofuasia live in Amsterdam (Europe Tour 2016)",
  "Wiz Ofuasia live in Linz, Austria (Europe Tour 2016)",
];

