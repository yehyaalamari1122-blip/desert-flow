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
    name: "أحمد حسن",
    phone: "+966 50 123 4567",
    country: "السعودية",
    flag: "🇸🇦",
    status: "shipped",
    lastOrder: "ORD-4592",
    totalSpent: 4820,
    lastSeen: "قبل دقيقتين",
    tags: ["VIP", "متكرّر"],
    history: [
      { id: "m1", from: "customer", text: "مرحبًا، هل المحفظة الجلدية ما زالت متوفّرة؟", time: "10:24" },
      { id: "m2", from: "bot", text: "نعم! لدينا 12 قطعة بلون الكونياك و8 بالأسود.", time: "10:24" },
      { id: "m3", from: "customer", text: "سآخذ واحدة بلون الكونياك.", time: "10:25" },
      { id: "m4", from: "bot", text: "ممتاز. سأرسل رابط الدفع الآن ✅", time: "10:25" },
    ],
  },
  {
    id: "c2",
    name: "ليلى محمد",
    phone: "+971 55 987 6543",
    country: "الإمارات",
    flag: "🇦🇪",
    status: "interested",
    lastOrder: "—",
    totalSpent: 0,
    lastSeen: "قبل 14 دقيقة",
    tags: ["عميل محتمل"],
    history: [
      { id: "m1", from: "customer", text: "هل تشحنون إلى دبي؟", time: "09:11" },
      { id: "m2", from: "bot", text: "نعم، شحن مجاني فوق 200 درهم، خلال يومَين.", time: "09:11" },
    ],
  },
  {
    id: "c3",
    name: "يوسف كريم",
    phone: "+20 100 555 7788",
    country: "مصر",
    flag: "🇪🇬",
    status: "follow_up",
    lastOrder: "ORD-4488",
    totalSpent: 1240,
    lastSeen: "قبل ساعة",
    tags: ["عائد"],
    history: [
      { id: "m1", from: "agent", text: "أهلًا يوسف، نتابع طلبك السابق — هل لديك ملاحظات؟", time: "08:02" },
    ],
  },
  {
    id: "c4",
    name: "سارة العتيبي",
    phone: "+966 53 222 1100",
    country: "السعودية",
    flag: "🇸🇦",
    status: "new",
    lastOrder: "—",
    totalSpent: 0,
    lastSeen: "الآن",
    tags: ["إنستغرام"],
    history: [
      { id: "m1", from: "customer", text: "السلام عليكم! شفت إعلانكم على إنستغرام.", time: "11:42" },
      { id: "m2", from: "bot", text: "أهلًا بكِ في نيكسا! كيف أقدر أساعدك اليوم؟ 🌿", time: "11:42" },
    ],
  },
  {
    id: "c5",
    name: "مريم طارق",
    phone: "+92 300 444 5566",
    country: "باكستان",
    flag: "🇵🇰",
    status: "shipped",
    lastOrder: "ORD-4571",
    totalSpent: 2300,
    lastSeen: "قبل 3 ساعات",
    tags: ["متكرّر"],
    history: [
      { id: "m1", from: "bot", text: "طلبك ORD-4571 خرج للتوصيل 🚚", time: "07:30" },
    ],
  },
  {
    id: "c6",
    name: "عمر بن علي",
    phone: "+212 661 778 899",
    country: "المغرب",
    flag: "🇲🇦",
    status: "cancelled",
    lastOrder: "ORD-4501",
    totalSpent: 0,
    lastSeen: "أمس",
    tags: ["تم الاسترجاع"],
    history: [
      { id: "m1", from: "customer", text: "أرجو إلغاء طلبي، غيّرت رأيي.", time: "أمس" },
      { id: "m2", from: "agent", text: "تم، الاسترداد خلال 3-5 أيام. 🙏", time: "أمس" },
    ],
  },
  {
    id: "c7",
    name: "فاطمة الزهراء",
    phone: "+962 79 333 2211",
    country: "الأردن",
    flag: "🇯🇴",
    status: "interested",
    lastOrder: "—",
    totalSpent: 0,
    lastSeen: "قبل 5 ساعات",
    tags: ["تيك توك"],
    history: [],
  },
  {
    id: "c8",
    name: "خالد راشد",
    phone: "+965 666 12 345",
    country: "الكويت",
    flag: "🇰🇼",
    status: "shipped",
    lastOrder: "ORD-4602",
    totalSpent: 6890,
    lastSeen: "قبل 30 دقيقة",
    tags: ["VIP"],
    history: [],
  },
];

export const REVENUE_SERIES = [
  { day: "الإثنين", revenue: 3200, orders: 14 },
  { day: "الثلاثاء", revenue: 4100, orders: 18 },
  { day: "الأربعاء", revenue: 3850, orders: 17 },
  { day: "الخميس", revenue: 5200, orders: 22 },
  { day: "الجمعة", revenue: 6400, orders: 29 },
  { day: "السبت", revenue: 7100, orders: 33 },
  { day: "الأحد", revenue: 5980, orders: 27 },
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
  { name: "بوت واتساب", value: 64 },
  { name: "وكيل بشري", value: 22 },
  { name: "دردشة الموقع", value: 14 },
];

export const LIVE_FEED = [
  { id: 1, type: "sale", text: "خالد راشد أنشأ الطلب ORD-4602 — 890 ر.س", time: "الآن" },
  { id: 2, type: "bot", text: "ردّ الذكاء الاصطناعي تلقائيًا على سارة العتيبي (عميل جديد)", time: "د 1" },
  { id: 3, type: "sale", text: "أحمد حسن دفع الفاتورة INV-203 — 1,250 ر.س", time: "د 3" },
  { id: 4, type: "bot", text: "البوت أهّل 4 عملاء جدد من إنستغرام", time: "د 8" },
  { id: 5, type: "sale", text: "ليلى محمد أضافت إلى السلة — 540 د.إ", time: "د 12" },
  { id: 6, type: "bot", text: "تم إرسال متابعة تلقائية لـ 12 جهة اتصال", time: "د 18" },
] as const;
