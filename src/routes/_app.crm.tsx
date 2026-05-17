import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Filter,
  Users,
  Phone,
  MoreHorizontal,
  Trash2,
  Pencil,
  MessageCircle,
  Send,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/page-header";
import { MOCK_CONTACTS, STATUS_META, type Contact, type ContactStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/crm")({
  component: CRM,
});

const TONE_CLASS: Record<string, string> = {
  info: "bg-info/15 text-info border-info/20",
  warning: "bg-warning/20 text-warning-foreground border-warning/30",
  success: "bg-success/15 text-success border-success/20",
  destructive: "bg-destructive/15 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border",
};

function StatusBadge({ status }: { status: ContactStatus }) {
  const meta = STATUS_META[status];
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium", TONE_CLASS[meta.tone])}>
      <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </Badge>
  );
}

function CRM() {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">("all");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState({ name: "", phone: "", country: "" });

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchQ =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.phone.includes(query);
      const matchS = statusFilter === "all" || c.status === statusFilter;
      return matchQ && matchS;
    });
  }, [contacts, query, statusFilter]);

  function handleDelete(id: string) {
    setContacts((cs) => cs.filter((c) => c.id !== id));
    toast.success("تم حذف جهة الاتصال");
  }

  function handleStatusChange(id: string, status: ContactStatus) {
    setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)));
    toast.success(`تم تحديث الحالة إلى ${STATUS_META[status].label}`);
  }

  function handleAdd() {
    if (!draft.name || !draft.phone) {
      toast.error("الاسم ورقم الهاتف مطلوبان");
      return;
    }
    const id = `c${Date.now()}`;
    setContacts((cs) => [
      {
        id,
        name: draft.name,
        phone: draft.phone,
        country: draft.country || "—",
        flag: "🌍",
        status: "new",
        lastOrder: "—",
        totalSpent: 0,
        lastSeen: "الآن",
        tags: ["جديد"],
        history: [],
      },
      ...cs,
    ]);
    setAddOpen(false);
    setDraft({ name: "", phone: "", country: "" });
    toast.success("تمت إضافة جهة الاتصال");
  }

  return (
    <div>
      <PageHeader
        icon={<Users className="h-5 w-5" />}
        title="جهات اتصال العملاء"
        description="إدارة العملاء المحتملين والمتابعات وقمع المبيعات عبر واتساب."
        actions={
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary shadow-elegant">
                <Plus className="me-1.5 h-4 w-4" /> إضافة جهة اتصال
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>جهة اتصال جديدة</DialogTitle>
                <DialogDescription>
                  أضف عميلًا يدويًا. العملاء الجدد من واتساب يُضافون تلقائيًا.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="space-y-1.5">
                  <Label htmlFor="n">الاسم الكامل</Label>
                  <Input
                    id="n"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    placeholder="أحمد حسن"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p">رقم واتساب</Label>
                  <Input
                    id="p"
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    placeholder="+966 50 123 4567"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c">الدولة</Label>
                  <Input
                    id="c"
                    value={draft.country}
                    onChange={(e) => setDraft({ ...draft, country: e.target.value })}
                    placeholder="السعودية"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAdd} className="bg-gradient-primary">
                  إنشاء جهة اتصال
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-4 p-6">
        <Card className="p-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالاسم أو رقم الهاتف…"
                className="h-10 ps-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ContactStatus | "all")}>
              <SelectTrigger className="h-10 w-full sm:w-44">
                <Filter className="me-1.5 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                {Object.entries(STATUS_META).map(([k, m]) => (
                  <SelectItem key={k} value={k}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="h-10 px-3 text-xs">
              {filtered.length} جهة اتصال
            </Badge>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>جهة الاتصال</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>آخر طلب</TableHead>
                <TableHead className="text-end">المبلغ</TableHead>
                <TableHead>آخر ظهور</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer transition-colors hover:bg-muted/40"
                  onClick={() => setSelected(c)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 ring-1 ring-border">
                        <AvatarFallback className="bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                          {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                          <span>{c.flag}</span>
                          {c.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {c.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.lastOrder}</TableCell>
                  <TableCell className="text-end font-mono text-sm font-medium">
                    {c.totalSpent ? `$${c.totalSpent.toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{c.lastSeen}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelected(c)}>
                          <Pencil className="me-2 h-4 w-4" /> View / edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {Object.entries(STATUS_META).map(([k, m]) => (
                          <DropdownMenuItem
                            key={k}
                            onClick={() => handleStatusChange(c.id, k as ContactStatus)}
                          >
                            Set status: {m.label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(c.id)}
                        >
                          <Trash2 className="me-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                    No contacts match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Slide-over */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-primary text-sm font-semibold text-primary-foreground">
                      {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-start">
                      {selected.flag} {selected.name}
                    </SheetTitle>
                    <SheetDescription className="text-start">
                      {selected.phone} · {selected.country}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-4 px-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <div className="text-lg font-bold text-foreground">
                      ${selected.totalSpent}
                    </div>
                    <div className="text-[10px] uppercase text-muted-foreground">Spent</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <div className="text-lg font-bold text-foreground">
                      {selected.history.length}
                    </div>
                    <div className="text-[10px] uppercase text-muted-foreground">Messages</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <StatusBadge status={selected.status} />
                    <div className="mt-1 text-[10px] uppercase text-muted-foreground">Status</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="flex items-center gap-1.5 text-sm font-semibold">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      Recent chat
                    </h4>
                  </div>
                  <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-3">
                    {selected.history.length === 0 && (
                      <p className="py-6 text-center text-xs text-muted-foreground">
                        No messages yet.
                      </p>
                    )}
                    {selected.history.map((m) => (
                      <div
                        key={m.id}
                        className={cn(
                          "flex",
                          m.from === "customer" ? "justify-start" : "justify-end",
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm",
                            m.from === "customer"
                              ? "rounded-bl-sm bg-card text-card-foreground"
                              : m.from === "bot"
                                ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
                                : "rounded-br-sm bg-info text-info-foreground",
                          )}
                        >
                          <p>{m.text}</p>
                          <div className="mt-1 text-[9px] opacity-70">{m.time} · {m.from}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-border pt-3">
                  <Input placeholder="Type a reply…" className="h-10" />
                  <Button size="icon" className="h-10 w-10 bg-gradient-primary">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
