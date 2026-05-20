import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Bot,
  QrCode,
  FileText,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "لوحة التحكم", url: "/dashboard", icon: LayoutDashboard, group: "نظرة عامة" },
  { title: "جهات اتصال العملاء", url: "/crm", icon: Users, group: "المبيعات" },
  { title: "الفواتير", url: "/invoices", icon: FileText, group: "المبيعات" },
  { title: "الرد الآلي بالذكاء الاصطناعي", url: "/ai-settings", icon: Bot, group: "الأتمتة" },
  { title: "بوابة واتساب", url: "/gateway", icon: QrCode, group: "الأتمتة" },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string) => pathname.startsWith(url);
  const groups = Array.from(new Set(navItems.map((i) => i.group)));

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border/70 py-3">
        <Link to="/" className="flex items-center gap-2.5 px-1.5">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <MessageCircle className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.5} />
            <Sparkles className="absolute -right-0.5 -top-0.5 h-3 w-3 text-warning drop-shadow" />
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-sidebar-foreground">
                Nexa
              </span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                WhatsApp · CRM
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-1.5 py-2">
        {groups.map((group) => (
          <SidebarGroup key={group} className="py-1">
            {!collapsed && (
              <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                {group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {navItems
                  .filter((i) => i.group === group)
                  .map((item) => {
                    const active = isActive(item.url);
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={item.title}
                          className={cn(
                            "group/btn relative h-9 rounded-lg transition-all duration-200",
                            active
                              ? "bg-gradient-primary text-primary-foreground shadow-elegant hover:bg-gradient-primary hover:text-primary-foreground"
                              : "hover:bg-sidebar-accent/70",
                          )}
                        >
                          <Link to={item.url} className="flex items-center gap-2.5">
                            <item.icon
                              className={cn(
                                "h-[17px] w-[17px] shrink-0 transition-transform duration-200 group-hover/btn:scale-110",
                              )}
                            />
                            {!collapsed && (
                              <span className="text-[13px] font-medium tracking-tight">{item.title}</span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-2">
        {!collapsed ? (
          <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-3 text-primary-foreground shadow-elegant">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary-foreground/15 blur-xl" />
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[12px] font-semibold tracking-tight">الباقة الاحترافية</span>
              </div>
              <p className="mt-1 text-[10.5px] opacity-90">2,481 / 5,000 رد ذكاء اصطناعي</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-primary-foreground/20">
                <div className="h-full w-[49%] rounded-full bg-primary-foreground" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
