/** Shared mock data for the CRM demo (no backend). */

export type ContactStatus =
  | "new"
  | "interested"
  | "follow_up"
  | "shipped"
  | "cancelled";

export interface ChatMessage {
  id: string;
  from: "customer" | "bot" | "agent";
  text: string;
  time: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  country: string;
  flag: string;
  status: ContactStatus;
  lastOrder: string;
  totalSpent: number;
  lastSeen: string;
  tags: string[];
  history: ChatMessage[];
}

export const STATUS_META: Record<
  ContactStatus,
  { label: string; tone: "info" | "warning" | "success" | "destructive" | "muted" }
> = {
  new: { label: "جديد", tone: "info" },
  interested: { label: "مهتم", tone: "warning" },
  follow_up: { label: "متابعة", tone: "muted" },
  shipped: { label: "تم الشحن", tone: "success" },
  cancelled: { label: "ملغى", tone: "destructive" },
};

export const MOCK_CONTACTS: Contact[] = [
  {
    id: "c1",
    name: "Ahmed Hassan",
    phone: "+966 50 123 4567",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    status: "shipped",
    lastOrder: "ORD-4592",
    totalSpent: 4820,
    lastSeen: "2m ago",
    tags: ["VIP", "Repeat"],
    history: [
      { id: "m1", from: "customer", text: "Hi, is the leather wallet still in stock?", time: "10:24" },
      { id: "m2", from: "bot", text: "Yes! We have 12 units in cognac and 8 in black.", time: "10:24" },
      { id: "m3", from: "customer", text: "I'll take one in cognac.", time: "10:25" },
      { id: "m4", from: "bot", text: "Perfect. Sending checkout link now ✅", time: "10:25" },
    ],
  },
  {
    id: "c2",
    name: "Layla Mohamed",
    phone: "+971 55 987 6543",
    country: "UAE",
    flag: "🇦🇪",
    status: "interested",
    lastOrder: "—",
    totalSpent: 0,
    lastSeen: "14m ago",
    tags: ["Lead"],
    history: [
      { id: "m1", from: "customer", text: "Do you ship to Dubai?", time: "09:11" },
      { id: "m2", from: "bot", text: "Yes, free shipping over 200 AED, 2-day delivery.", time: "09:11" },
    ],
  },
  {
    id: "c3",
    name: "Youssef Karim",
    phone: "+20 100 555 7788",
    country: "Egypt",
    flag: "🇪🇬",
    status: "follow_up",
    lastOrder: "ORD-4488",
    totalSpent: 1240,
    lastSeen: "1h ago",
    tags: ["Returning"],
    history: [
      { id: "m1", from: "agent", text: "Hi Youssef, following up on your last order — any feedback?", time: "08:02" },
    ],
  },
  {
    id: "c4",
    name: "Sara Al-Otaibi",
    phone: "+966 53 222 1100",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    status: "new",
    lastOrder: "—",
    totalSpent: 0,
    lastSeen: "just now",
    tags: ["Instagram"],
    history: [
      { id: "m1", from: "customer", text: "Hello! Saw your ad on IG.", time: "11:42" },
      { id: "m2", from: "bot", text: "Welcome to Nexa! How can I help you today? 🌿", time: "11:42" },
    ],
  },
  {
    id: "c5",
    name: "Mariam Tariq",
    phone: "+92 300 444 5566",
    country: "Pakistan",
    flag: "🇵🇰",
    status: "shipped",
    lastOrder: "ORD-4571",
    totalSpent: 2300,
    lastSeen: "3h ago",
    tags: ["Repeat"],
    history: [
      { id: "m1", from: "bot", text: "Your order ORD-4571 is out for delivery 🚚", time: "07:30" },
    ],
  },
  {
    id: "c6",
    name: "Omar Benali",
    phone: "+212 661 778 899",
    country: "Morocco",
    flag: "🇲🇦",
    status: "cancelled",
    lastOrder: "ORD-4501",
    totalSpent: 0,
    lastSeen: "yesterday",
    tags: ["Refunded"],
    history: [
      { id: "m1", from: "customer", text: "Please cancel my order, changed my mind.", time: "Yesterday" },
      { id: "m2", from: "agent", text: "Done, refund processed in 3-5 days. 🙏", time: "Yesterday" },
    ],
  },
  {
    id: "c7",
    name: "Fatima Zahra",
    phone: "+962 79 333 2211",
    country: "Jordan",
    flag: "🇯🇴",
    status: "interested",
    lastOrder: "—",
    totalSpent: 0,
    lastSeen: "5h ago",
    tags: ["TikTok"],
    history: [],
  },
  {
    id: "c8",
    name: "Khalid Rashid",
    phone: "+965 666 12 345",
    country: "Kuwait",
    flag: "🇰🇼",
    status: "shipped",
    lastOrder: "ORD-4602",
    totalSpent: 6890,
    lastSeen: "30m ago",
    tags: ["VIP"],
    history: [],
  },
];

export const REVENUE_SERIES = [
  { day: "Mon", revenue: 3200, orders: 14 },
  { day: "Tue", revenue: 4100, orders: 18 },
  { day: "Wed", revenue: 3850, orders: 17 },
  { day: "Thu", revenue: 5200, orders: 22 },
  { day: "Fri", revenue: 6400, orders: 29 },
  { day: "Sat", revenue: 7100, orders: 33 },
  { day: "Sun", revenue: 5980, orders: 27 },
];

export const CONVERSION_SERIES = [
  { hour: "00", rate: 2.1 },
  { hour: "04", rate: 1.4 },
  { hour: "08", rate: 3.8 },
  { hour: "12", rate: 5.6 },
  { hour: "16", rate: 6.9 },
  { hour: "20", rate: 8.2 },
];

export const CHANNEL_SHARE = [
  { name: "WhatsApp Bot", value: 64 },
  { name: "Live Agent", value: 22 },
  { name: "Web Chat", value: 14 },
];

export const LIVE_FEED = [
  { id: 1, type: "sale", text: "Khalid Rashid placed order ORD-4602 — 890 SAR", time: "now" },
  { id: 2, type: "bot", text: "AI auto-replied to Sara Al-Otaibi (new lead)", time: "1m" },
  { id: 3, type: "sale", text: "Ahmed Hassan paid invoice INV-203 — 1,250 SAR", time: "3m" },
  { id: 4, type: "bot", text: "Bot qualified 4 new leads from Instagram", time: "8m" },
  { id: 5, type: "sale", text: "Layla Mohamed added cart — 540 AED", time: "12m" },
  { id: 6, type: "bot", text: "Auto follow-up sent to 12 follow_up contacts", time: "18m" },
] as const;
