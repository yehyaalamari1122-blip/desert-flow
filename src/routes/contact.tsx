import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — Nexa" },
      { name: "description", content: "هل لديك سؤال؟ تواصل مع فريق Nexa للمبيعات والدعم." },
      { property: "og:title", content: "تواصل معنا — Nexa" },
      { property: "og:description", content: "هل لديك سؤال؟ تواصل مع فريق Nexa." },
      { property: "og:url", content: "https://desert-flow.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://desert-flow.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const channels = [
    { icon: Mail, label: "البريد الإلكتروني", value: "hello@nexa.app" },
    { icon: Phone, label: "الهاتف", value: "‎+966 50 000 0000" },
    { icon: MessageCircle, label: "واتساب", value: "تواصل فوري" },
    { icon: MapPin, label: "العنوان", value: "الرياض، المملكة العربية السعودية" },
  ];
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b border-border/60 glass sticky top-0 z-40">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link to="/"><BrandLogo size="sm" /></Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> العودة للرئيسية
          </Link>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <p className="text-[12px] uppercase tracking-wider text-primary">تواصل معنا</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gradient-hero md:text-4xl">
            دعنا نتحدث عن متجرك
          </h1>
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
            فريقنا جاهز للرد على استفساراتك خلال ٢٤ ساعة. سواء كنت تبحث عن عرض توضيحي، تكامل مخصص، أو دعم — نحن هنا.
          </p>
          <div className="mt-8 space-y-4">
            {channels.map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/50 text-primary">
                  <c.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11.5px] text-muted-foreground">{c.label}</p>
                  <p className="text-[14px] font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("تم إرسال رسالتك بنجاح — سنعود إليك قريباً.");
            (e.target as HTMLFormElement).reset();
          }}
          className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft md:p-8"
        >
          <h2 className="text-lg font-semibold tracking-tight">أرسل لنا رسالة</h2>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[12.5px] font-medium">الاسم</label>
                <Input required placeholder="اسمك الكامل" className="mt-1.5" />
              </div>
              <div>
                <label className="text-[12.5px] font-medium">البريد الإلكتروني</label>
                <Input required type="email" placeholder="you@store.com" className="mt-1.5" />
              </div>
            </div>
            <div>
              <label className="text-[12.5px] font-medium">اسم المتجر</label>
              <Input placeholder="متجرك الإلكتروني" className="mt-1.5" />
            </div>
            <div>
              <label className="text-[12.5px] font-medium">رسالتك</label>
              <Textarea required rows={5} placeholder="كيف يمكننا مساعدتك؟" className="mt-1.5" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-primary shadow-elegant hover:opacity-95">
              إرسال الرسالة
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
