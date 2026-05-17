import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  Key,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  CheckCircle2,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/ai-settings")({
  component: AISettings,
});

const DEFAULT_PROMPT = `أنت "نيكسا"، المساعد الذكي اللطيف لمتجرنا الإلكتروني.
- رحّب بالعملاء بدفء وبلغتهم (العربية أو الإنجليزية).
- أجب عن أسئلة المنتجات باختصار. استخدم الإيموجي باعتدال.
- إذا لم تعرف الإجابة، اعرض تحويلهم لوكيل بشري.
- اختم دائمًا بخطوة واضحة (أضف إلى السلة، اطلب اتصالًا، أو حدّد موعدًا).`;

function AISettings() {
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4o-mini");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [temperature, setTemperature] = useState([0.7]);

  const [autoDraft, setAutoDraft] = useState(true);
  const [autoReply, setAutoReply] = useState(false);
  const [followUp, setFollowUp] = useState(true);
  const [handoff, setHandoff] = useState(true);

  function handleSave() {
    toast.success("تم حفظ إعدادات الذكاء الاصطناعي", {
      description: `${provider} · ${model} · حرارة ${temperature[0]}`,
    });
  }

  return (
    <div>
      <PageHeader
        icon={<Bot className="h-5 w-5" />}
        title="الرد الآلي بالذكاء الاصطناعي"
        description="اضبط نموذج اللغة، شخصية البوت، وقواعد الأتمتة."
        actions={
          <Button size="sm" onClick={handleSave} className="bg-gradient-primary shadow-elegant">
            <Save className="me-1.5 h-4 w-4" />
            حفظ التغييرات
          </Button>
        }
      />

      <div className="grid gap-6 p-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Key className="h-4 w-4 text-primary" />
                مزوّد LLM ومفتاح API
              </CardTitle>
              <CardDescription>
                مفتاحك مخزَّن مشفَّرًا ولن يُرسَل لأي طرف ثالث.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>المزوّد</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="google">Google Gemini</SelectItem>
                      <SelectItem value="groq">Groq</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>النموذج</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                      <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                      <SelectItem value="claude-3-5-sonnet">claude-3-5-sonnet</SelectItem>
                      <SelectItem value="gemini-1.5-pro">gemini-1.5-pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>API key</Label>
                <div className="relative">
                  <Input
                    type={showKey ? "text" : "password"}
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pe-10 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey((v) => !v)}
                    className="absolute end-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {apiKey && (
                  <Badge variant="secondary" className="mt-2 gap-1 text-success">
                    <CheckCircle2 className="h-3 w-3" /> Key format looks valid
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">
                    Temperature{" "}
                    <span className="font-mono text-muted-foreground">{temperature[0]}</span>
                  </Label>
                  <span className="text-[11px] text-muted-foreground">
                    Lower = focused · Higher = creative
                  </span>
                </div>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                System Prompt — AI persona
              </CardTitle>
              <CardDescription>
                Tell the AI exactly how to behave, tone, what to sell, and edge cases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={10}
                className="resize-none font-mono text-xs leading-relaxed"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{prompt.length} characters</span>
                <span>Recommended: 200-1,500 chars</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — toggles */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-primary" />
                Automation toggles
              </CardTitle>
              <CardDescription>Control how aggressively the bot acts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <ToggleRow
                label="Auto-Draft responses"
                description="Generate replies for your agents to review and send."
                checked={autoDraft}
                onChange={setAutoDraft}
              />
              <ToggleRow
                label="Direct auto-reply"
                description="Send AI replies immediately, without human approval."
                checked={autoReply}
                onChange={setAutoReply}
                accent
              />
              <ToggleRow
                label="Automated follow-ups"
                description="Re-engage stalled leads after 24h with a smart nudge."
                checked={followUp}
                onChange={setFollowUp}
              />
              <ToggleRow
                label="Smart handoff to agent"
                description="Detect frustration or complex queries and route to a human."
                checked={handoff}
                onChange={setHandoff}
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
            <CardContent className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Quality tip</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                For Arabic-speaking customers, add 5-10 sample Q&A pairs in the prompt — it
                improves dialect handling more than switching models.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  accent?: boolean;
}

function ToggleRow({ label, description, checked, onChange, accent }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-muted/40">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {accent && checked && (
            <Badge className="bg-warning/20 text-warning-foreground hover:bg-warning/20">
              Live
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
