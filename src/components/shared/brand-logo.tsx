import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { box: "h-7 w-7", icon: "h-4 w-4", text: "text-[14px]" },
  md: { box: "h-9 w-9", icon: "h-[18px] w-[18px]", text: "text-[15px]" },
  lg: { box: "h-11 w-11", icon: "h-5 w-5", text: "text-[17px]" },
};

/**
 * Nexa brand mark — gradient tile with chat bubble + spark accent.
 * Use anywhere the brand identity needs to appear.
 */
export function BrandLogo({ className, showWordmark = true, size = "md" }: BrandLogoProps) {
  const s = sizes[size];
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant",
          s.box,
        )}
      >
        <span className="absolute inset-0 rounded-xl bg-gradient-primary opacity-60 blur-md" aria-hidden />
        <svg viewBox="0 0 24 24" fill="none" className={cn("relative", s.icon)} aria-hidden>
          <path
            d="M12 3c-4.97 0-9 3.58-9 8 0 1.6.52 3.08 1.42 4.34L3 21l5.78-1.3A9.96 9.96 0 0 0 12 20c4.97 0 9-3.58 9-8s-4.03-9-9-9Z"
            fill="currentColor"
          />
        </svg>
        <span
          className="absolute -end-0.5 -top-0.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-warning ring-2 ring-background"
          aria-hidden
        />
      </span>
      {showWordmark && (
        <span className={cn("font-bold tracking-tight", s.text)}>
          Nexa
        </span>
      )}
    </span>
  );
}
