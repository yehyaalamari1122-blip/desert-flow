import { createFileRoute } from "@tanstack/react-router";
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
  LayoutDashboard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
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

interface KpiProps {
  label: string;
  value: string;
  delta: number;
  icon: React.ReactNode;
  tint: "primary" | "info" | "warning" | "success";
}

const KPI_TINTS: Record<KpiProps["tint"], string> = {
  primary: "from-primary/15 to-primary/0 text-primary",
  info: "from-info/15 to-info/0 text-info",
  warning: "from-warning/20 to-warning/0 text-warning",
  success: "from-success/15 to-success/0 text-success",
};

function KpiCard({ label, value, delta, icon, tint }: KpiProps) {
  const positive = delta >= 0;
  return (
    <Card className="group relative overflow-hidden border-border/60 transition-all hover:shadow-elegant">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-100",
          KPI_TINTS[tint],
        )}
      />
      <CardContent className="relative p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/70 backdrop-blur">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              positive ? "text-success" : "text-destructive",
            )}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">مقارنةً بالأسبوع الماضي</p>
      </CardContent>
    </Card>
  );
}

function Analytics() {
  return (
    <div>
      <PageHeader
        icon={<LayoutDashboard className="h-5 w-5" />}
        title="لوحة التحكم"
        description="نظرة فورية على مبيعات واتساب وردود الذكاء الاصطناعي وصحّة قنوات البيع."
        actions={
          <>
            <Button variant="outline" size="sm">
              آخر 7 أيام
            </Button>
            <Button size="sm" className="bg-gradient-primary shadow-elegant">
              تصدير التقرير
            </Button>
          </>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="الإيرادات اليومية"
            value="6,420 $"
            delta={12.4}
            tint="primary"
            icon={<DollarSign className="h-4 w-4 text-primary" />}
          />
          <KpiCard
            label="إجمالي الطلبات"
            value="184"
            delta={8.1}
            tint="info"
            icon={<ShoppingCart className="h-4 w-4 text-info" />}
          />
          <KpiCard
            label="محادثات البوت النشطة"
            value="92"
            delta={24.6}
            tint="warning"
            icon={<MessageSquare className="h-4 w-4 text-warning" />}
          />
          <KpiCard
            label="معدّل التحويل"
            value="6.8%"
            delta={-1.2}
            tint="success"
            icon={<Target className="h-4 w-4 text-success" />}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Revenue chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">إيرادات هذا الأسبوع</CardTitle>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  الإيرادات اليومية وحجم الطلبات
                </p>
              </div>
              <Badge variant="secondary" className="rounded-full">
                <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
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
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    fill="url(#revFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Channel share */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Channel mix</CardTitle>
              <p className="text-xs text-muted-foreground">Where replies originate</p>
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
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1.5">
                {CHANNEL_SHARE.map((c, i) => (
                  <div key={c.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: `var(--color-chart-${i + 1})` }}
                      />
                      {c.name}
                    </span>
                    <span className="font-semibold text-foreground">{c.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Conversion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Conversion rate by hour</CardTitle>
              <p className="text-xs text-muted-foreground">Peak conversion window: 8-10 PM</p>
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
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="rate" radius={[6, 6, 0, 0]} fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Live activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Activity className="h-4 w-4 text-primary" />
                  Live activity
                </CardTitle>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Automated messages and completed sales
                </p>
              </div>
              <Badge className="rounded-full bg-success/15 text-success hover:bg-success/15">
                <span className="me-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                Streaming
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              {LIVE_FEED.map((f) => (
                <div
                  key={f.id}
                  className="group flex items-start gap-3 rounded-lg border border-transparent p-2.5 transition-colors hover:border-border hover:bg-muted/40"
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      f.type === "sale"
                        ? "bg-success/15 text-success"
                        : "bg-info/15 text-info",
                    )}
                  >
                    {f.type === "sale" ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{f.text}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{f.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
