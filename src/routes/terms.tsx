import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "./privacy";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "شروط الاستخدام — Nexa" },
      { name: "description", content: "الشروط والأحكام التي تحكم استخدامك لمنصة Nexa." },
      { property: "og:title", content: "شروط الاستخدام — Nexa" },
      { property: "og:description", content: "الشروط والأحكام التي تحكم استخدامك لمنصة Nexa." },
      { property: "og:url", content: "https://desert-flow.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://desert-flow.lovable.app/terms" }],
  }),
  component: () => (
    <LegalShell title="شروط الاستخدام" updated="مايو ٢٠٢٦">
      <p>باستخدامك منصة Nexa فإنك توافق على هذه الشروط. يرجى قراءتها بعناية قبل البدء.</p>
      <h2>قبول الشروط</h2>
      <p>يعدّ إنشاء حساب أو استخدام الخدمة موافقة كاملة منك على هذه الشروط وعلى سياسة الخصوصية الخاصة بنا.</p>
      <h2>الاشتراك والدفع</h2>
      <p>تُجدَّد الاشتراكات تلقائياً ما لم يتم إلغاؤها. يمكنك إلغاء أو ترقية خطتك في أي وقت من لوحة التحكم.</p>
      <h2>الاستخدام المقبول</h2>
      <p>يُحظر استخدام المنصة لأي غرض غير قانوني أو لإرسال رسائل مزعجة أو محتوى ينتهك قوانين واتساب.</p>
      <h2>إنهاء الخدمة</h2>
      <p>نحتفظ بالحق في تعليق أو إنهاء الحسابات التي تنتهك هذه الشروط مع إشعار مسبق متى أمكن.</p>
    </LegalShell>
  ),
});
