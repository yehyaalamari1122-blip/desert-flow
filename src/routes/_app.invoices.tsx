import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Printer,
  Send,
  MessageCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/invoices")({
  component: Invoices,
});

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

const CURRENCIES = [
  { code: "SAR", symbol: "ر.س" },
  { code: "AED", symbol: "د.إ" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "EGP", symbol: "ج.م" },
];

function Invoices() {
  const [number] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
  );
  const [currency, setCurrency] = useState("SAR");
  const [taxRate, setTaxRate] = useState(15);

  const [customer, setCustomer] = useState({
    name: "أحمد حسن",
    phone: "+966 50 123 4567",
    email: "ahmed@example.com",
    address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
  });
  const [seller, setSeller] = useState({
    name: "نيكسا للتجارة ذ.م.م",
    phone: "+966 11 555 7700",
    address: "حي العليا، الرياض، السعودية",
    vat: "300123456700003",
  });
  const [notes, setNotes] = useState("شكرًا لتسوّقك معنا! الدفع مستحق خلال 7 أيام.");

  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "محفظة جلدية فاخرة — لون كونياك", quantity: 1, price: 320 },
    { id: "2", description: "خدمة الحفر والنقش", quantity: 1, price: 80 },
  ]);

  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "$";

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const tax = (subtotal * taxRate) / 100;
    const grand = subtotal + tax;
    return { subtotal, tax, grand };
  }, [items, taxRate]);

  function addItem() {
    setItems((it) => [
      ...it,
      { id: String(Date.now()), description: "", quantity: 1, price: 0 },
    ]);
  }
  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((it) => it.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }
  function removeItem(id: string) {
    setItems((it) => it.filter((i) => i.id !== id));
  }

  function handlePrint() {
    window.print();
  }
  function handleSendWhatsApp() {
    toast.success("تم إرسال الفاتورة عبر واتساب", {
      description: `${number} → ${customer.name} (${customer.phone})`,
    });
  }
  function handleDownload() {
    toast.success("جارٍ إنشاء PDF…", { description: "سيبدأ التنزيل خلال لحظات." });
  }

  return (
    <div>
      <PageHeader
        icon={<FileText className="h-5 w-5" />}
        title="الفواتير"
        description="أنشئ وعاين وأرسل فواتير جاهزة للضريبة لعملائك عبر واتساب."
        actions={
          <>
            <Button size="sm" variant="outline" onClick={handlePrint}>
              <Printer className="me-1.5 h-4 w-4" /> طباعة
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="me-1.5 h-4 w-4" /> PDF
            </Button>
            <Button size="sm" onClick={handleSendWhatsApp} className="bg-gradient-primary shadow-elegant">
              <Send className="me-1.5 h-4 w-4" /> إرسال عبر واتساب
            </Button>
          </>
        }
      />

      <div className="grid gap-6 p-6 lg:grid-cols-2 print:block print:p-0">
        {/* FORM */}
        <div className="space-y-6 print:hidden">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">تفاصيل الفاتورة</CardTitle>
              <CardDescription>البيانات الوصفية والعملة.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>رقم الفاتورة</Label>
                <Input value={number} readOnly className="font-mono" />
              </div>
              <div className="space-y-1.5">
                <Label>العملة</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.code} ({c.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>تاريخ الإصدار</Label>
                <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>تاريخ الاستحقاق</Label>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>نسبة ضريبة القيمة المضافة (%)</Label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">فاتورة إلى</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>اسم العميل</Label>
                <Input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>رقم واتساب</Label>
                <Input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>البريد الإلكتروني</Label>
                <Input value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>عنوان الفوترة</Label>
                <Textarea
                  rows={2}
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">عناصر الفاتورة</CardTitle>
              <Button size="sm" variant="outline" onClick={addItem}>
                <Plus className="me-1.5 h-4 w-4" /> إضافة عنصر
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="grid grid-cols-[1fr_70px_90px_36px] items-center gap-2 rounded-lg border border-border bg-muted/20 p-2"
                >
                  <Input
                    placeholder="الوصف"
                    value={it.description}
                    onChange={(e) => updateItem(it.id, { description: e.target.value })}
                    className="h-9 border-none bg-transparent shadow-none focus-visible:ring-1"
                  />
                  <Input
                    type="number"
                    value={it.quantity}
                    onChange={(e) => updateItem(it.id, { quantity: Number(e.target.value) })}
                    className="h-9"
                  />
                  <Input
                    type="number"
                    value={it.price}
                    onChange={(e) => updateItem(it.id, { price: Number(e.target.value) })}
                    className="h-9"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(it.id)}
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">ملاحظات</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        {/* PREVIEW */}
        <div className="lg:sticky lg:top-20 lg:self-start print:static">
          <Card className="overflow-hidden border-border bg-white text-slate-900 shadow-elegant print:border-none print:shadow-none">
            <div className="bg-gradient-primary p-6 text-primary-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-widest opacity-80">فاتورة</div>
                  <div className="mt-1 font-mono text-2xl font-bold">{number}</div>
                </div>
                <div className="text-end">
                  <div className="text-sm font-semibold">{seller.name}</div>
                  <div className="text-[11px] opacity-90">{seller.address}</div>
                  <div className="mt-1 text-[11px] opacity-90">الرقم الضريبي: {seller.vat}</div>
                </div>
              </div>
            </div>

            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="mb-1 font-semibold uppercase tracking-wider text-slate-500">
                    فاتورة إلى
                  </div>
                  <div className="font-semibold text-slate-900">{customer.name}</div>
                  <div className="text-slate-600">{customer.address}</div>
                  <div className="text-slate-600">{customer.phone}</div>
                  <div className="text-slate-600">{customer.email}</div>
                </div>
                <div className="text-end">
                  <div className="mb-1 font-semibold uppercase tracking-wider text-slate-500">
                    التواريخ
                  </div>
                  <div className="text-slate-700">الإصدار: {issueDate}</div>
                  <div className="text-slate-700">الاستحقاق: {dueDate}</div>
                </div>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="py-2 text-start font-semibold">الوصف</th>
                    <th className="py-2 text-end font-semibold">الكمية</th>
                    <th className="py-2 text-end font-semibold">السعر</th>
                    <th className="py-2 text-end font-semibold">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-b border-slate-100">
                      <td className="py-2.5">{it.description || "—"}</td>
                      <td className="py-2.5 text-end">{it.quantity}</td>
                      <td className="py-2.5 text-end font-mono">
                        {symbol} {it.price.toFixed(2)}
                      </td>
                      <td className="py-2.5 text-end font-mono font-semibold">
                        {symbol} {(it.quantity * it.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ms-auto w-full max-w-xs space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>المجموع الفرعي</span>
                  <span className="font-mono">
                    {symbol} {totals.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ضريبة القيمة المضافة ({taxRate}%)</span>
                  <span className="font-mono">
                    {symbol} {totals.tax.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t-2 border-slate-900 pt-2 text-base font-bold text-slate-900">
                  <span>الإجمالي المستحق</span>
                  <span className="font-mono">
                    {symbol} {totals.grand.toFixed(2)}
                  </span>
                </div>
              </div>

              {notes && (
                <div className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                  <div className="mb-1 font-semibold uppercase tracking-wider text-slate-500">
                    ملاحظات
                  </div>
                  {notes}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-[11px] text-slate-500">
                <span>تم إنشاؤها بواسطة نيكسا · واتساب CRM</span>
                <Badge variant="outline" className="gap-1 border-emerald-200 text-emerald-700">
                  <MessageCircle className="h-3 w-3" /> أُرسلت عبر واتساب
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
