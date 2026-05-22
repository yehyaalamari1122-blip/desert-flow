import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — Nexa" },
      { name: "description", content: "كيف تجمع Nexa بياناتك وتحميها وتستخدمها." },
      { property: "og:title", content: "سياسة الخصوصية — Nexa" },
      { property: "og:description", content: "كيف تجمع Nexa بياناتك وتحميها وتستخدمها." },
      { property: "og:url", content: "https://desert-flow.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://desert-flow.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalShell title="سياسة الخصوصية" updated="مايو ٢٠٢٦">
    <p>نلتزم في Nexa بحماية خصوصيتك. تشرح هذه السياسة أنواع البيانات التي نجمعها وكيف نستخدمها ونحميها.</p>
    <h2>البيانات التي نجمعها</h2>
    <p>نجمع البيانات اللازمة لتقديم الخدمة فقط: معلومات الحساب، بيانات الاستخدام، ومحتوى المحادثات الذي تختار مزامنته.</p>
    <h2>كيف نستخدم البيانات</h2>
    <p>لتشغيل وتحسين المنصة، تخصيص تجربتك، توفير الدعم، وإرسال إشعارات مهمة. لا نبيع بياناتك لأي طرف ثالث.</p>
    <h2>الأمان</h2>
    <p>نستخدم تشفيراً من طرف إلى طرف ونسخاً احتياطياً يومياً ومراكز بيانات معتمدة دولياً.</p>
    <h2>حقوقك</h2>
    <p>يمكنك في أي وقت طلب نسخة من بياناتك أو حذفها بالكامل من إعدادات الحساب أو بالتواصل معنا.</p>
  </LegalShell>;
}

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b border-border/60 glass sticky top-0 z-40">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 md:px-6">
          <Link to="/"><BrandLogo size="sm" /></Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> العودة للرئيسية
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <p className="text-[12px] uppercase tracking-wider text-muted-foreground">آخر تحديث · {updated}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gradient-hero md:text-4xl">{title}</h1>
        <div className="prose prose-slate mt-8 max-w-none text-[14.5px] leading-loose text-foreground/80 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:mt-3">
          {children}
        </div>
      </main>
    </div>
  );
}
