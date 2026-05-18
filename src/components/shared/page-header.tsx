import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, icon, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden border-b border-border/60", className)}>
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" />
      <div className="relative flex flex-col gap-4 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-40" />
              <span className="relative">{icon}</span>
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-[22px] font-bold tracking-tight text-gradient-hero md:text-[26px]">
              {title}
            </h1>
            {description && (
              <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-muted-foreground md:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
