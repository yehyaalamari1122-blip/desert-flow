import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Languages,
  Command,
  LayoutDashboard,
  Users,
  Bot,
  QrCode,
  FileText,
  CheckCircle2,
  Sparkles,
  Receipt,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppShell } from "@/providers/app-shell-provider";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Notif = {
  id: number;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  icon: React.ComponentType<{ className?: string }>;
  tint: "primary" | "info" | "warning";
};

const notifications: Notif[] = [
  { id: 1, title: "طلب جديد من أحمد حسن", body: "الطلب #4592 — 1,250 ر.س", time: "د 2", unread: true, icon: Receipt, tint: "primary" },
  { id: 2, title: "ردّ الذكاء الاصطناعي على 12 رسالة", body: "الردّ التلقائي مُفعَّل", time: "د 14", unread: true, icon: Sparkles, tint: "info" },
  { id: 3, title: "تم إرسال الفاتورة #INV-203", body: "العميل: ليلى محمد", time: "س 1", unread: false, icon: CheckCircle2, tint: "warning" },
];

const tints = {
  primary: "bg-primary/10 text-primary",
  info: "bg-info/10 text-info",
  warning: "bg-warning/15 text-warning",
} as const;

const commands = [
  { label: "لوحة التحكم", to: "/", icon: LayoutDashboard },
  { label: "جهات اتصال العملاء", to: "/crm", icon: Users },
  { label: "الفواتير", to: "/invoices", icon: FileText },
  { label: "الرد الآلي بالذكاء الاصطناعي", to: "/ai-settings", icon: Bot },
  { label: "بوابة واتساب", to: "/gateway", icon: QrCode },
] as const;

export function Topbar() {
  const { theme, toggleTheme, dir, toggleDir } = useAppShell();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="glass sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/60 px-3 sm:px-5">
      <SidebarTrigger className="-ms-1 h-8 w-8" />
      <Separator orientation="vertical" className="h-5" />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group hidden h-9 min-w-[300px] items-center gap-2.5 rounded-full border border-border/70 bg-muted/40 px-3.5 text-[13px] text-muted-foreground transition-all hover:border-border hover:bg-muted/70 md:flex"
      >
        <Search className="h-4 w-4" />
        <span>ابحث في كل شيء…</span>
        <kbd className="ms-auto inline-flex items-center gap-0.5 rounded border border-border/70 bg-background/80 px-1.5 py-0.5 text-[10px] font-medium">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>
      <Button size="icon" variant="ghost" className="h-9 w-9 md:hidden" onClick={() => setOpen(true)} aria-label="بحث">
        <Search className="h-4 w-4" />
      </Button>

      <div className="ms-auto flex items-center gap-0.5">
        <Button size="icon" variant="ghost" onClick={toggleDir} aria-label="Language" className="relative h-9 w-9 rounded-full">
          <Languages className="h-4 w-4" />
          <span className="absolute -bottom-0 end-0 text-[8px] font-bold text-primary">
            {dir === "rtl" ? "AR" : "EN"}
          </span>
        </Button>

        <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Theme" className="h-9 w-9 rounded-full">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="الإشعارات">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute end-1.5 top-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="w-[360px] overflow-hidden rounded-2xl border-border/70 p-0 shadow-elegant"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">الإشعارات</span>
                <span className="text-[11px] text-muted-foreground">{unread} غير مقروء</span>
              </div>
              <button className="text-[11px] font-medium text-primary hover:underline">
                تعليم الكل كمقروء
              </button>
            </div>
            <div className="max-h-[420px] overflow-y-auto py-1.5">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="group/n relative flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/60"
                >
                  {n.unread && (
                    <span className="absolute start-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary" />
                  )}
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", tints[n.tint])}>
                    <n.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[13px] font-medium leading-tight text-foreground">{n.title}</p>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/60 bg-muted/30 px-4 py-2.5 text-center">
              <button className="text-[12px] font-medium text-foreground/80 transition-colors hover:text-primary">
                عرض كل الإشعارات
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-1.5 h-5" />

        <Avatar className="h-8 w-8 ring-2 ring-background ring-offset-2 ring-offset-primary/30">
          <AvatarFallback className="bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
            NX
          </AvatarFallback>
        </Avatar>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="ابحث في الصفحات والعملاء والفواتير…" />
        <CommandList>
          <CommandEmpty>لا توجد نتائج.</CommandEmpty>
          <CommandGroup heading="التنقّل">
            {commands.map((c) => (
              <CommandItem
                key={c.to}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: c.to });
                }}
              >
                <c.icon className="me-2 h-4 w-4" />
                {c.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
