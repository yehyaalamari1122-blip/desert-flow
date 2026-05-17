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
  { title: "لوحة التحكم", url: "/", icon: LayoutDashboard, group: "نظرة عامة" },
  { title: "جهات اتصال العملاء", url: "/crm", icon: Users, group: "المبيعات" },
  { title: "الفواتير", url: "/invoices", icon: FileText, group: "المبيعات" },
  { title: "الرد الآلي بالذكاء الاصطناعي", url: "/ai-settings", icon: Bot, group: "الأتمتة" },
  { title: "بوابة واتساب", url: "/gateway", icon: QrCode, group: "الأتمتة" },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  const groups = Array.from(new Set(navItems.map((i) => i.group)));

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <MessageCircle className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            <Sparkles className="absolute -right-0.5 -top-0.5 h-3 w-3 text-warning" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-sidebar-foreground">
                نيكسا
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                واتساب CRM
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-1">
        {groups.map((group) => (
          <SidebarGroup key={group}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
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
                            "group/btn h-10 rounded-lg transition-all",
                            active &&
                              "bg-gradient-primary text-primary-foreground shadow-elegant hover:bg-gradient-primary hover:text-primary-foreground",
                          )}
                        >
                          <Link to={item.url} className="flex items-center gap-3">
                            <item.icon
                              className={cn(
                                "h-[18px] w-[18px] shrink-0 transition-transform group-hover/btn:scale-110",
                              )}
                            />
                            {!collapsed && (
                              <span className="text-sm font-medium">{item.title}</span>
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

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed ? (
          <div className="rounded-xl bg-gradient-primary p-3 text-primary-foreground shadow-elegant">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold">الباقة الاحترافية</span>
            </div>
            <p className="mt-1 text-[11px] opacity-90">2,481 / 5,000 رد ذكاء اصطناعي مُستخدم</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/20">
              <div className="h-full w-[49%] rounded-full bg-primary-foreground" />
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
