import { useState } from "react";
import { Search, Bell, Moon, Sun, Languages, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { LayoutDashboard, Users, Bot, QrCode, FileText } from "lucide-react";
import { useEffect } from "react";

const notifications = [
  { id: 1, title: "طلب جديد من أحمد حسن", body: "الطلب رقم #4592 — 1,250 ر.س", time: "د 2" },
  { id: 2, title: "ردّ الذكاء الاصطناعي على 12 رسالة", body: "الردّ التلقائي مُفعَّل", time: "د 14" },
  { id: 3, title: "تم إرسال الفاتورة #INV-203", body: "العميل: ليلى محمد", time: "س 1" },
];

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
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl">
      <SidebarTrigger className="-ms-1" />
      <Separator orientation="vertical" className="h-6" />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group hidden h-9 min-w-[280px] items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
      >
        <Search className="h-4 w-4" />
        <span>Search contacts, orders, invoices…</span>
        <kbd className="ms-auto inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>
      <Button
        size="icon"
        variant="ghost"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>

      <div className="ms-auto flex items-center gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleDir}
          aria-label="Toggle language direction"
          className="relative"
        >
          <Languages className="h-4 w-4" />
          <span className="absolute -bottom-0.5 end-0.5 text-[8px] font-bold text-primary">
            {dir === "rtl" ? "AR" : "EN"}
          </span>
        </Button>

        <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="relative" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute end-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="rounded-full">
                {notifications.length} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2.5">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium">{n.title}</span>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <span className="text-xs text-muted-foreground">{n.body}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
          <AvatarFallback className="bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
            NX
          </AvatarFallback>
        </Avatar>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, contacts, invoices…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
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
