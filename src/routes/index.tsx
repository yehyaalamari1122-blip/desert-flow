import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageCircle,
  Sparkles,
  ArrowLeft,
  Bot,
  Users,
  FileText,
  QrCode,
  BarChart3,
  Zap,
  ShieldCheck,
  Check,
  Star,
  ChevronDown,
  Globe,
  Menu,
  X,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/shared/brand-logo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexa — منصة واتساب للتسويق والمبيعات الذكية" },
      {
        name: "description",
        content:
          "منصة Nexa لإدارة محادثات واتساب، أتمتة الردود بالذكاء الاصطناعي، CRM متكامل، فواتير، وتحليلات — مصممة للتجارة الإلكترونية في الوطن العربي والعالم.",
      },
    ],
  }),
  component: LandingPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

function LandingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <Hero />
      <Stats />
      <LogosStrip />
      <Features />
      <DashboardPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ───────────────────── Navbar ───────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "المميزات", href: "#features" },
    { label: "لوحة التحكم", href: "#preview" },
    { label: "الأسعار", href: "#pricing" },
    { label: "الأسئلة", href: "#faq" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/" aria-label="Nexa">
          <BrandLogo size="sm" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">تسجيل الدخول</Link>
          </Button>
          <Button size="sm" asChild className="bg-gradient-primary shadow-elegant hover:opacity-95">
            <Link to="/dashboard">
              ابدأ مجاناً
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/40 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link to="/dashboard">دخول</Link>
              </Button>
              <Button size="sm" asChild className="flex-1 bg-gradient-primary">
                <Link to="/dashboard">ابدأ مجاناً</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ───────────────────── Hero ───────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh-bg" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 md:px-6 md:pt-24">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-5 gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11.5px] font-medium backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            جديد · ردود ذكية بالذكاء الاصطناعي على مدار الساعة
          </Badge>

          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-gradient-hero md:text-6xl">
            حوّل محادثات واتساب
            <br className="hidden md:block" />
            إلى مبيعات حقيقية.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
            منصة Nexa تجمع CRM ذكي، أتمتة بالذكاء الاصطناعي، فواتير احترافية،
            وتحليلات لحظية — في مكان واحد مصمم لمتاجر التجارة الإلكترونية في العالم العربي.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="bg-gradient-primary shadow-elegant hover:opacity-95">
              <Link to="/dashboard">
                ابدأ تجربتك المجانية
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#preview">شاهد العرض التوضيحي</a>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> بدون بطاقة ائتمان
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> إعداد خلال دقيقتين
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> دعم العربية الكامل
            </span>
          </div>
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="absolute inset-x-10 -bottom-6 h-24 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-elegant">
            <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
              <span className="mx-auto text-[11px] text-muted-foreground">nexa.app/dashboard</span>
            </div>
            <MockDashboard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MockDashboard() {
  const stats = [
    { label: "الإيرادات", value: "٤٨٢٬٣٠٠", suffix: "ر.س", trend: "+١٢٫٤٪", icon: BarChart3 },
    { label: "محادثات نشطة", value: "١٬٢٤٧", trend: "+٨٫٢٪", icon: MessageCircle },
    { label: "معدل التحويل", value: "٢٤٫٧٪", trend: "+٣٫١٪", icon: Zap },
  ];
  return (
    <div className="grid gap-4 p-5 md:grid-cols-[1fr_280px] md:p-6">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border/70 bg-background p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] text-muted-foreground">{s.label}</span>
                <s.icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-lg font-bold tracking-tight">{s.value}</span>
                {"suffix" in s && (
                  <span className="text-[10.5px] text-muted-foreground">{s.suffix}</span>
                )}
              </div>
              <span className="mt-0.5 inline-block text-[10.5px] font-medium text-success">
                {s.trend}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border/70 bg-background p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12.5px] font-semibold">أداء المبيعات</span>
            <Badge variant="secondary" className="rounded-full text-[10px]">آخر ٣٠ يوم</Badge>
          </div>
          <div className="flex h-32 items-end gap-1.5">
            {[40, 55, 38, 62, 48, 70, 58, 78, 65, 82, 72, 88, 95, 85, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-primary"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/70 bg-background p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12.5px] font-semibold">محادثات حية</span>
          <span className="flex items-center gap-1 text-[10.5px] text-success">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            مباشر
          </span>
        </div>
        <div className="space-y-2.5">
          {[
            { n: "أحمد م.", m: "هل المنتج متوفر؟", t: "الآن" },
            { n: "سارة ع.", m: "شكراً، تم الطلب 🌹", t: "٢ د" },
            { n: "خالد ف.", m: "متى الشحن؟", t: "٥ د" },
          ].map((c) => (
            <div key={c.n} className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                {c.n[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-[12px] font-medium">{c.n}</span>
                  <span className="text-[10px] text-muted-foreground">{c.t}</span>
                </div>
                <p className="truncate text-[11px] text-muted-foreground">{c.m}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── Logos ───────────────────── */
function LogosStrip() {
  const logos = ["Shopify", "Salla", "Zid", "WooCommerce", "Stripe", "Tap"];
  return (
    <section className="border-y border-border/60 bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="mb-5 text-center text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">
          موثوق به من قِبل أكثر من ٢٬٠٠٠ متجر إلكتروني
        </p>
        <div className="grid grid-cols-3 items-center gap-6 opacity-70 md:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l}
              className="text-center text-base font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Features ───────────────────── */
function Features() {
  const items = [
    {
      icon: Bot,
      title: "ذكاء اصطناعي يرد عنك",
      desc: "ردود فورية وذكية بالعربية على مدار الساعة. خصّص الشخصية، النبرة، والأهداف.",
    },
    {
      icon: Users,
      title: "CRM متكامل",
      desc: "إدارة كل عميل من البداية للنهاية مع سجل محادثات، حالات الطلب، والملاحظات.",
    },
    {
      icon: FileText,
      title: "فواتير احترافية",
      desc: "أنشئ فواتير جاهزة للطباعة بدعم الريال، الدرهم، والجنيه — مع حساب الضريبة تلقائياً.",
    },
    {
      icon: QrCode,
      title: "بوابة واتساب فورية",
      desc: "ربط حسابك بـ QR في ثوانٍ. سجلات حية، إعادة اتصال تلقائي، وأمان كامل.",
    },
    {
      icon: BarChart3,
      title: "تحليلات لحظية",
      desc: "تتبّع الإيرادات، التحويلات، ومصادر الطلبات بلوحات تحكم جميلة وقابلة للتصدير.",
    },
    {
      icon: ShieldCheck,
      title: "أمان على مستوى المؤسسات",
      desc: "تشفير من طرف إلى طرف، صلاحيات دقيقة، ونسخ احتياطي تلقائي لبياناتك.",
    },
  ];
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1 text-[11px]">
            المميزات
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gradient-hero md:text-4xl">
            كل ما تحتاجه لإدارة مبيعاتك على واتساب
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            منصة واحدة بدلاً من خمس أدوات. مصممة بعناية لتعطيك السرعة والوضوح والاحترافية.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-l from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-[15.5px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Dashboard Preview ───────────────────── */
function DashboardPreview() {
  return (
    <section id="preview" className="relative overflow-hidden border-y border-border/60 bg-muted/30 py-24">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1 text-[11px]">
            لوحة التحكم
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gradient-hero md:text-4xl">
            واجهة مدروسة. بيانات واضحة.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            تصميم أنيق مستوحى من أفضل منتجات SaaS العالمية — مع دعم كامل للعربية و RTL.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="relative mx-auto mt-12 max-w-6xl">
          <div className="absolute inset-x-20 -bottom-8 h-28 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-elegant">
            <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
            </div>
            <MockDashboard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── Pricing ───────────────────── */
function Pricing() {
  const plans = [
    {
      name: "البداية",
      price: "٩٩",
      desc: "للمتاجر الصغيرة التي تبدأ رحلتها.",
      features: [
        "حتى ١٬٠٠٠ محادثة شهرياً",
        "ردود ذكية أساسية",
        "CRM لـ ٥٠٠ عميل",
        "فواتير غير محدودة",
        "دعم بريد إلكتروني",
      ],
      cta: "ابدأ مجاناً",
      featured: false,
    },
    {
      name: "النمو",
      price: "٢٤٩",
      desc: "الأكثر شعبية للمتاجر النامية.",
      features: [
        "حتى ١٠٬٠٠٠ محادثة شهرياً",
        "ذكاء اصطناعي متقدم + تخصيص كامل",
        "CRM غير محدود",
        "أتمتة المبيعات والتذكيرات",
        "تحليلات متقدمة",
        "دعم أولوية على مدار الساعة",
      ],
      cta: "اختر النمو",
      featured: true,
    },
    {
      name: "المؤسسات",
      price: "حسب الطلب",
      desc: "للعلامات التجارية الكبيرة والوكالات.",
      features: [
        "محادثات غير محدودة",
        "بوابات واتساب متعددة",
        "صلاحيات وفرق متقدمة",
        "تكاملات مخصصة (API)",
        "مدير حساب مخصص",
      ],
      cta: "تواصل معنا",
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1 text-[11px]">
            الأسعار
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gradient-hero md:text-4xl">
            أسعار بسيطة. قيمة عظيمة.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            ابدأ مجاناً. ارقَ متى احتجت. ألغِ في أي وقت.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.07 }}
              className={cn(
                "group relative flex flex-col rounded-2xl border p-7 transition-all hover:-translate-y-1",
                p.featured
                  ? "border-primary/40 bg-card shadow-glow"
                  : "border-border/70 bg-card shadow-soft hover:shadow-elegant",
              )}
            >
              {p.featured && (
                <div className="absolute -top-3 right-6 rounded-full bg-gradient-primary px-3 py-1 text-[10.5px] font-semibold text-primary-foreground shadow-elegant">
                  الأكثر شعبية
                </div>
              )}
              <h3 className="text-[15px] font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                {p.price !== "حسب الطلب" && (
                  <span className="text-[12.5px] text-muted-foreground">ر.س / شهر</span>
                )}
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Button
                  asChild
                  className={cn(
                    "w-full",
                    p.featured
                      ? "bg-gradient-primary shadow-elegant hover:opacity-95"
                      : "bg-foreground text-background hover:bg-foreground/90",
                  )}
                >
                  <Link to="/dashboard">{p.cta}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Testimonials ───────────────────── */
function Testimonials() {
  const tests = [
    {
      name: "نورة الحربي",
      role: "مؤسسة متجر Lumière",
      quote:
        "ضاعفنا مبيعاتنا خلال ٦ أسابيع. الردود الذكية أنقذت فريقنا من ساعات لا تنتهي على واتساب.",
    },
    {
      name: "محمد الزهراني",
      role: "مدير عمليات — Atlas Store",
      quote:
        "أخيراً منصة عربية تفهم احتياجاتنا. التصميم نظيف والأداء سريع جداً، ودعم العملاء استثنائي.",
    },
    {
      name: "ليان عبدالله",
      role: "صاحبة براند Mira Beauty",
      quote:
        "الفواتير تلقائية، CRM منظم، والتحليلات تساعدني أتخذ قرارات حقيقية بدل التخمين. أوصي فيها بقوة.",
    },
  ];
  return (
    <section className="border-y border-border/60 bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1 text-[11px]">
            آراء العملاء
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gradient-hero md:text-4xl">
            يحبّها أصحاب المتاجر
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tests.map((t, i) => (
            <motion.figure
              key={t.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.07 }}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft"
            >
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[14px] leading-relaxed text-foreground/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-[12px] font-semibold text-primary-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[13px] font-semibold">{t.name}</div>
                  <div className="text-[11.5px] text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── FAQ ───────────────────── */
function FAQ() {
  const faqs = [
    {
      q: "هل أحتاج إلى حساب واتساب للأعمال؟",
      a: "نعم، نوصي باستخدام WhatsApp Business لأفضل تجربة. عملية الربط تتم عبر مسح QR لا تستغرق أكثر من دقيقة.",
    },
    {
      q: "هل يدعم النظام اللغة العربية بالكامل؟",
      a: "بالتأكيد. الواجهة، الردود الذكية، الفواتير، والتقارير كلها تدعم العربية و RTL بشكل احترافي.",
    },
    {
      q: "هل بياناتي آمنة؟",
      a: "نستخدم تشفيراً من طرف إلى طرف، ونسخاً احتياطياً يومياً، ومراكز بيانات معتمدة دولياً. بياناتك ملكك بالكامل.",
    },
    {
      q: "هل يمكنني الإلغاء في أي وقت؟",
      a: "نعم، بدون أي التزام. يمكنك الترقية، التخفيض، أو الإلغاء من لوحة التحكم مباشرة.",
    },
    {
      q: "هل تقدمون تكاملات مع المتاجر؟",
      a: "ندعم Salla و Zid و Shopify و WooCommerce بالإضافة إلى API مفتوح للتكاملات المخصصة.",
    },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <motion.div {...fadeUp} className="text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1 text-[11px]">
            الأسئلة الشائعة
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gradient-hero md:text-4xl">
            عندك سؤال؟ لدينا الإجابة.
          </h2>
        </motion.div>

        <div className="mt-12 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right transition-colors hover:bg-accent/30"
                >
                  <span className="text-[14px] font-semibold">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                      open && "rotate-180 text-primary",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden px-5 transition-all duration-300",
                    open ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0 text-[13.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── CTA ───────────────────── */
function CTA() {
  return (
    <section className="px-4 py-20 md:px-6">
      <motion.div
        {...fadeUp}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary via-primary to-primary-glow p-10 text-center shadow-glow md:p-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <h2 className="relative text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
          جاهز ترفع مبيعات متجرك؟
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-primary-foreground/85">
          انضم لأكثر من ٢٬٠٠٠ متجر يستخدم Nexa يومياً. تجربة مجانية لمدة ١٤ يوم — بدون بطاقة ائتمان.
        </p>
        <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90">
            <Link to="/dashboard">
              ابدأ تجربتك الآن
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20"
          >
            <a href="#pricing">شاهد الأسعار</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────── Footer ───────────────────── */
function Footer() {
  const cols = [
    {
      title: "المنتج",
      links: ["المميزات", "الأسعار", "لوحة التحكم", "التكاملات", "API"],
    },
    {
      title: "الشركة",
      links: ["من نحن", "المدونة", "الوظائف", "تواصل معنا"],
    },
    {
      title: "قانوني",
      links: ["شروط الاستخدام", "سياسة الخصوصية", "ملفات تعريف الارتباط"],
    },
  ];
  return (
    <footer className="border-t border-border/60 bg-muted/30 py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <MessageCircle className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.5} />
                <Sparkles className="absolute -right-0.5 -top-0.5 h-3 w-3 text-warning" />
              </div>
              <span className="text-[15px] font-bold tracking-tight">Nexa</span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              منصة واتساب ذكية لإدارة محادثات العملاء، أتمتة المبيعات، وتنمية متجرك بثقة.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11.5px] text-muted-foreground">
              <Globe className="h-3 w-3" /> العربية · English coming soon
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-[12.5px] font-semibold tracking-tight">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-[12px] text-muted-foreground md:flex-row">
          <p>© ٢٠٢٦ Nexa. جميع الحقوق محفوظة.</p>
          <p>صُنع بـ ❤️ للمتاجر العربية.</p>
        </div>
      </div>
    </footer>
  );
}
