export interface Deal {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  store: string;
  category: string;
  postedAt: string;
  upvotes: number;
  commentsCount: number;
  url: string;
  imageUrl?: string;
}

/** Hardcoded sample deals — replace with tRPC query once API is wired */
export const SAMPLE_DEALS: Deal[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: "$299",
    originalPrice: "$549",
    store: "JB Hi-Fi",
    category: "Electronics",
    postedAt: "2 hours ago",
    upvotes: 312,
    commentsCount: 45,
    url: "#",
  },
  {
    id: 2,
    title: "LEGO Technic Bugatti Bolide 42151 — 900 Pieces",
    price: "$89",
    originalPrice: "$149",
    store: "Big W",
    category: "Toys",
    postedAt: "4 hours ago",
    upvotes: 198,
    commentsCount: 22,
    url: "#",
  },
  {
    id: 3,
    title: "Dyson V12 Detect Slim Cordless Vacuum",
    price: "$599",
    originalPrice: "$999",
    store: "Harvey Norman",
    category: "Appliances",
    postedAt: "6 hours ago",
    upvotes: 87,
    commentsCount: 11,
    url: "#",
  },
  {
    id: 4,
    title: "Nike Air Max 270 — Multiple Colours",
    price: "$99",
    originalPrice: "$180",
    store: "Nike Online",
    category: "Clothing",
    postedAt: "8 hours ago",
    upvotes: 54,
    commentsCount: 8,
    url: "#",
  },
];

// ---------------------------------------------------------------------------
// Deal submission form types & constants
// ---------------------------------------------------------------------------

export interface DealFormData {
  title: string;
  url: string;
  isFreebie: boolean;
  price: string;
  originalPrice: string;
  store: string;
  category: string;
  promoCode: string;
  affiliation: string;
  startsAt: string;
  expiresAt: string;
  description: string;
  tags?: string[];
  timestamp: Date;
}

export type UrlCheckStatus =
  | "idle"
  | "checking"
  | "ok"
  | "invalid_syntax"
  | "invalid_protocol"
  | "not_found"
  | "domain_not_found"
  | "blocked_by_site"
  | "timeout"
  | "site_error"
  | "blocked_host";

export const URL_ERROR_MESSAGES: Record<string, string> = {
  invalid_syntax: "Not a valid URL — check for typos",
  invalid_protocol: "Only http:// and https:// URLs are allowed",
  not_found: "Page not found — the deal may have expired (404)",
  domain_not_found: "Domain doesn't exist — check the URL",
  blocked_by_site: "Site blocked access — you can still fill in details manually",
  timeout: "Site took too long to respond",
  site_error: "Site returned an error — you can still submit manually",
  blocked_host: "URL not allowed",
};

export const EMPTY_FORM: DealFormData = {
  title: "",
  url: "",
  isFreebie: false,
  price: "",
  originalPrice: "",
  store: "",
  category: "",
  promoCode: "",
  affiliation: "",
  startsAt: "",
  expiresAt: "",
  description: "",
  tags: [],
  timestamp: new Date(),
};

export const CATEGORIES = [
  "Electronics",
  "Clothing & Shoes",
  "Home & Garden",
  "Toys & Games",
  "Food & Grocery",
  "Travel",
  "Beauty & Health",
  "Sports & Outdoors",
  "Automotive",
  "Other",
];
