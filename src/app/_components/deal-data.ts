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
