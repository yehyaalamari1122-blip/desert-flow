import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  MessageSquare,
  Target,
  Activity,
  Bot,
  CheckCircle2,
  Sparkles,
  Download,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  REVENUE_SERIES,
  CONVERSION_SERIES,
  CHANNEL_SHARE,
  LIVE_FEED,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  component: Analytics,
});

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

interface KpiProps {
  label: string;
  value: string;
  delta: number;
  icon: React.ReactNode;
  tint: "primary" | "info" | "warning" | "success";
  index: number;
}

const KPI_TINTS: Record<KpiProps["tint"], { wash: string; ring: string; iconBg: string }> = {
  primary: { wash: "from-primary/10", ring: "group-hover:ring-primary/30", iconBg: "bg-primary/10 text-primary" },
  info:    { wash: "from-info/10",    ring: "group-hover:ring-info/30",    iconBg: "bg-info/10 text-info" },
  warning: { wash: "from-warning/15", ring: "group-hover:ring-warning/30", iconBg: "bg-warning/15 text-warning" },
  success: { wash: "from-success/10", ring: "group-hover:ring-success/30", iconBg: "bg-success/10 text-success" },
};

function KpiCard({ label, value, delta, icon, tint, index }: KpiProps) {
  const positive = delta >= 0;
  const t = KPI_TINTS[tint];
  return (
    <motion.div custom={index} variants={fadeUp} initial="hidden" animate="show">
      <Card
        className={cn(
          "group relative overflow-hidden rounded-2xl border-border/60 bg-card/80 shadow-soft ring-1 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant",
          t.ring,
        )}
      >
        <div className={cn("pointer-events-none absolute inset-x-0 -top-1/2 h-full bg-gradient-to-b to-transparent opacity-60", t.wash)} />
        <CardContent className="relative p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {label}
            </span>
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", t.iconBg)}>
              {icon}
            </div>
          </div>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-[28px] font-bold leading-none tracking-tight text-foreground">{value}</span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold",
                positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(delta)}%
            </span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">مقارنةً بالأسبوع الماضي</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function HeroGreeting() {
  return (
    <div className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 mesh-bg" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-info/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative px-5 py-8 md:px-8 md:py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <Badge variant="secondary" className="rounded-full border border-border/60 bg-background/70 px-2.5 py-0.5 text-[10.5px] font-medium backdrop-blur">
            <span className="me-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            كل الأنظمة تعمل بشكل ممتاز
          </Badge>

          <h1 className="mt-4 text-[26px] font-bold tracking-tight text-gradient-hero md:text-[34px]">
            مرحبًا بك مجددًا، نيكسا 👋
          </h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground md:text-sm">
            نظرة فورية على مبيعات واتساب وردود الذكاء الاصطناعي وصحّة قنوات البيع.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 rounded-full border-border/70 bg-background/60 backdrop-blur">
              <Calendar className="h-3.5 w-3.5" /> آخر 7 أيام
            </Button>
            <Button size="sm" className="h-9 rounded-full bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
              <Download className="h-3.5 w-3.5" /> تصدير التقرير
            </Button>
            <div className="ms-auto hidden items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur md:flex">
              <Sparkles className="h-3 w-3 text-primary" />
              تم تحديث البيانات قبل لحظات
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div>
      <HeroGreeting />

      <div className="space-y-5 p-5 md:p-8">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard index={0} label="الإيرادات اليومية" value="6,420 $" delta={12.4} tint="primary" icon={<DollarSign className="h-4 w-4" />} />
          <KpiCard index={1} label="إجمالي الطلبات" value="184" delta={8.1} tint="info" icon={<ShoppingCart className="h-4 w-4" />} />
          <KpiCard index={2} label="محادثات البوت النشطة" value="92" delta={24.6} tint="warning" icon={<MessageSquare className="h-4 w-4" />} />
          <KpiCard index={3} label="معدّل التحويل" value="6.8%" delta={-1.2} tint="success" icon={<Target className="h-4 w-4" />} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-2">
            <Card className="rounded-2xl border-border/60 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">إيرادات هذا الأسبوع</CardTitle>
                  <p className="mt-1 text-[12px] text-muted-foreground">الإيرادات اليومية وحجم الطلبات</p>
                </div>
                <Badge variant="secondary" className="rounded-full text-[10.5px]">
                  <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  مباشر
                </Badge>
              </CardHeader>
              <CardContent className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_SERIES} margin={{ top: 6, right: 8, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                        fontSize: 12,
                        boxShadow: "var(--shadow-elegant)",
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#revFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
            <Card className="rounded-2xl border-border/60 shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-[15px] font-semibold tracking-tight">توزيع القنوات</CardTitle>
                <p className="mt-1 text-[12px] text-muted-foreground">مصادر الردود</p>
              </CardHeader>
              <CardContent className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHANNEL_SHARE}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      stroke="var(--color-background)"
                      strokeWidth={3}
                    >
                      {CHANNEL_SHARE.map((_, i) => (
                        <Cell key={i} fill={`var(--color-chart-${i + 1})`} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1.5">
                  {CHANNEL_SHARE.map((c, i) => (
                    <div key={c.name} className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-2 w-2 rounded-full" style={{ background: `var(--color-chart-${i + 1})` }} />
                        {c.name}
                      </span>
                      <span className="font-semibold text-foreground">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show">
            <Card className="rounded-2xl border-border/60 shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-[15px] font-semibold tracking-tight">معدّل التحويل بالساعة</CardTitle>
                <p className="mt-1 text-[12px] text-muted-foreground">ذروة التحويل: 8 - 10 مساءً</p>
              </CardHeader>
              <CardContent className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CONVERSION_SERIES} margin={{ top: 6, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="rate" radius={[6, 6, 0, 0]} fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-2">
            <Card className="rounded-2xl border-border/60 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
                    <Activity className="h-4 w-4 text-primary" />
                    النشاط المباشر
                  </CardTitle>
                  <p className="mt-1 text-[12px] text-muted-foreground">الرسائل الآلية والمبيعات المُكتمَلة</p>
                </div>
                <Badge className="rounded-full bg-success/15 text-success hover:bg-success/15">
                  <span className="me-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                  مباشر
                </Badge>
              </CardHeader>
              <CardContent className="space-y-1">
                {LIVE_FEED.map((f, i) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.35 }}
                    className="group flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all hover:border-border/60 hover:bg-muted/50"
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        f.type === "sale" ? "bg-success/15 text-success" : "bg-info/15 text-info",
                      )}
                    >
                      {f.type === "sale" ? <CheckCircle2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] text-foreground">{f.text}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{f.time}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
