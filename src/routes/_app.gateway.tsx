import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { QrCode, Smartphone, CheckCircle2, Loader2, Terminal, Power, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/gateway")({
  component: Gateway,
});

type ConnState = "idle" | "scanning" | "connected";
interface LogLine {
  id: number;
  time: string;
  level: "info" | "ok" | "warn";
  text: string;
}

function Gateway() {
  const [state, setState] = useState<ConnState>("idle");
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 1, time: timeNow(), level: "info", text: "البوابة جاهزة. بانتظار مسح رمز QR." },
  ]);
  const idRef = useRef(2);

  function pushLog(text: string, level: LogLine["level"] = "info") {
    setLogs((l) => [...l, { id: idRef.current++, time: timeNow(), level, text }]);
  }

  function handleScan() {
    if (state !== "idle") return;
    setState("scanning");
    pushLog("تم مسح رمز QR بواسطة الجهاز المحمول…");
    setTimeout(() => pushLog("جارٍ التحقق من بصمة الجهاز…"), 600);
    setTimeout(() => pushLog("تفاوض المفاتيح التشفيرية بين الطرفين…"), 1300);
    setTimeout(() => pushLog("تم إنشاء الجلسة (مصافحة Noise XX).", "ok"), 2000);
    setTimeout(() => {
      setState("connected");
      pushLog("بوابة واتساب متصلة · +966 50 ••• 4592", "ok");
      pushLog("الاشتراك في الرسائل والإشعارات وإيصالات القراءة.");
      toast.success("تم الاتصال ببوابة واتساب", {
        description: "البوت يستقبل الرسائل الآن.",
      });
    }, 2600);
  }

  function handleDisconnect() {
    setState("idle");
    pushLog("تم إنهاء الجلسة بواسطة المستخدم.", "warn");
  }

  // simulate incoming after connect
  useEffect(() => {
    if (state !== "connected") return;
    const events = [
      "رسالة واردة من +971 55 ••• 6543",
      "تم إرسال ردّ تلقائي من البوت (زمن الاستجابة 412 مللي ثانية)",
      "نبضة سليمة · وقت التشغيل 00:00:42",
      "رسالة واردة من +20 100 ••• 7788",
      "صاغ البوت ردًا لمراجعة بشرية",
    ];
    let i = 0;
    const t = setInterval(() => {
      pushLog(events[i % events.length]);
      i++;
    }, 3500);
    return () => clearInterval(t);
  }, [state]);

  return (
    <div>
      <PageHeader
        icon={<QrCode className="h-5 w-5" />}
        title="بوابة واتساب"
        description="اربط رقم واتساب الأعمال عبر إقران آمن برمز QR."
        actions={
          state === "connected" ? (
            <Button size="sm" variant="outline" onClick={handleDisconnect}>
              <Power className="me-1.5 h-4 w-4" /> قطع الاتصال
            </Button>
          ) : (
            <Badge variant="secondary" className="h-9 rounded-full px-3 text-xs">
              <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              غير متصل
            </Badge>
          )
        }
      />

      <div className="grid gap-6 p-6 lg:grid-cols-5">
        {/* QR card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">اربط هاتفك</CardTitle>
            <CardDescription>
              افتح واتساب ← الإعدادات ← الأجهزة المرتبطة ← ربط جهاز.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className={cn(
                  "relative flex h-64 w-64 items-center justify-center rounded-2xl border bg-white p-4 transition-all",
                  state === "connected" && "border-success/40 bg-success/5",
                  state === "scanning" && "border-primary/40",
                )}
              >
                {state === "connected" ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
                      <CheckCircle2 className="h-12 w-12 text-success" />
                    </div>
                    <Badge className="bg-success text-success-foreground hover:bg-success">
                      متصل
                    </Badge>
                  </div>
                ) : (
                  <>
                    <QrPattern />
                    {state === "scanning" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-background/85 backdrop-blur-sm">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-xs font-medium text-foreground">
                          جارٍ إنشاء جلسة آمنة…
                        </span>
                      </div>
                    )}
                    {state === "idle" && (
                      <div className="pointer-events-none absolute inset-x-4 top-0 h-1 animate-[scan_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                    )}
                  </>
                )}
              </div>
            </div>

            {state === "idle" && (
              <Button onClick={handleScan} className="w-full bg-gradient-primary shadow-elegant">
                <Smartphone className="me-2 h-4 w-4" />
                محاكاة مسح QR
              </Button>
            )}
            {state === "scanning" && (
              <Button disabled className="w-full">
                <Loader2 className="me-2 h-4 w-4 animate-spin" /> جارٍ الاتصال…
              </Button>
            )}
            {state === "connected" && (
              <Button variant="outline" onClick={handleDisconnect} className="w-full">
                <RefreshCw className="me-2 h-4 w-4" /> إعادة تعيين الجلسة
              </Button>
            )}

            <p className="text-center text-[11px] text-muted-foreground">
              مشفَّر طرفًا إلى طرف · تنتهي الجلسة بعد 7 أيام من عدم النشاط
            </p>

            <style>{`@keyframes scan { 0%, 100% { transform: translateY(0); opacity: 0.3 } 50% { transform: translateY(15rem); opacity: 1 } }`}</style>
          </CardContent>
        </Card>

        {/* Logs */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Terminal className="h-4 w-4 text-primary" />
                سجلّ الاتصال
              </CardTitle>
              <CardDescription>أحداث البوابة الفورية</CardDescription>
            </div>
            {state === "connected" && (
              <Badge className="rounded-full bg-success/15 text-success hover:bg-success/15">
                <span className="me-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                متصل الآن
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[420px] rounded-xl border border-border bg-[#0b0f14] p-4 font-mono text-[12px] leading-relaxed">
              {logs.map((l) => (
                <div key={l.id} className="flex gap-3">
                  <span className="text-[#5b6b80]">{l.time}</span>
                  <span
                    className={cn(
                      "uppercase",
                      l.level === "ok" && "text-emerald-400",
                      l.level === "warn" && "text-amber-400",
                      l.level === "info" && "text-sky-400",
                    )}
                  >
                    [{l.level}]
                  </span>
                  <span className="text-slate-200">{l.text}</span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function timeNow() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
}

/** Decorative QR-like pattern — purely visual. */
function QrPattern() {
  const cells = 21;
  // deterministic pseudo-random fill
  const grid = Array.from({ length: cells * cells }, (_, i) => {
    const x = i % cells;
    const y = Math.floor(i / cells);
    // corners (finder patterns)
    const corner =
      (x < 7 && y < 7) ||
      (x >= cells - 7 && y < 7) ||
      (x < 7 && y >= cells - 7);
    if (corner) {
      const cx = x < 7 ? x : cells - 1 - x;
      const cy = y < 7 ? y : cells - 1 - y;
      const inOuter = cx === 0 || cx === 6 || cy === 0 || cy === 6;
      const inInner = cx >= 2 && cx <= 4 && cy >= 2 && cy <= 4;
      return inOuter || inInner ? 1 : 0;
    }
    return (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 > 0.55 ? 1 : 0;
  });

  return (
    <div
      className="grid h-full w-full"
      style={{ gridTemplateColumns: `repeat(${cells}, 1fr)`, gap: 1 }}
    >
      {grid.map((v, i) => (
        <div key={i} className={cn(v ? "bg-foreground" : "bg-transparent", "rounded-[1px]")} />
      ))}
    </div>
  );
}
