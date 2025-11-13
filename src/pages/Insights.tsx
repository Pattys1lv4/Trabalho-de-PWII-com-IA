import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertCircle, Sparkles, BookOpen, PiggyBank, Target } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const insights = [
  {
    id: 1,
    type: "warning",
    title: "Gastos com Alimentação Aumentaram 25%",
    description: "Seus gastos com alimentação fora de casa aumentaram significativamente. Considere preparar mais refeições em casa.",
    impact: "Economia potencial: R$ 300/mês",
    details: "Nos últimos 30 dias, você gastou R$ 450 com delivery e R$ 600 em restaurantes. Planeje suas refeições semanalmente e experimente preparar marmitas. Isso pode reduzir seus gastos em até 40%.",
    actionItems: [
      "Planeje um cardápio semanal",
      "Faça compras em horários estratégicos",
      "Prepare refeições em lote nos fins de semana",
      "Use aplicativos de receitas econômicas"
    ]
  },
  {
    id: 2,
    type: "success",
    title: "Parabéns! Meta de Poupança Atingida",
    description: "Você conseguiu poupar mais do que sua meta este mês. Continue assim!",
    impact: "Você está 15% acima da meta",
    details: "Sua disciplina financeira está excelente! Você economizou R$ 920 este mês, superando sua meta de R$ 800. Considere aumentar gradualmente sua meta de poupança.",
    actionItems: [
      "Mantenha o controle atual",
      "Considere aumentar a meta em 5-10%",
      "Explore opções de investimento",
      "Celebre suas conquistas!"
    ]
  },
  {
    id: 3,
    type: "tip",
    title: "Oportunidade de Economia em Assinaturas",
    description: "Você tem 3 assinaturas ativas que não usou nos últimos 30 dias. Considere cancelá-las.",
    impact: "Economia potencial: R$ 89,90/mês",
    details: "Identificamos assinaturas sem uso: Streaming de música (R$ 24,90), App de notícias (R$ 35,00) e Academia online (R$ 30,00). Avalie se você realmente precisa manter todas elas.",
    actionItems: [
      "Cancele assinaturas não utilizadas",
      "Configure alertas de cobrança",
      "Compartilhe planos familiares quando possível",
      "Reavalie suas assinaturas trimestralmente"
    ]
  }
];

const educationalContent = [
  {
    id: 1,
    icon: PiggyBank,
    title: "Regra 50-30-20",
    description: "Método eficaz de distribuição de renda",
    content: "A regra 50-30-20 é um método simples de orçamento: 50% da sua renda para necessidades essenciais (moradia, alimentação, transporte), 30% para desejos (lazer, restaurantes, hobbies) e 20% para poupança e investimentos. Este método ajuda a manter equilíbrio financeiro e construir patrimônio."
  },
  {
    id: 2,
    icon: Target,
    title: "Como Definir Metas Financeiras",
    description: "Estabeleça objetivos realistas e alcançáveis",
    content: "Metas financeiras eficazes devem ser SMART: Específicas, Mensuráveis, Atingíveis, Relevantes e Temporais. Comece com metas de curto prazo (até 1 ano), como criar um fundo de emergência. Depois, avance para metas de médio (1-5 anos) e longo prazo (5+ anos), como aposentadoria."
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Fundo de Emergência",
    description: "Sua rede de segurança financeira",
    content: "O fundo de emergência é essencial para segurança financeira. Recomenda-se guardar de 3 a 6 meses de despesas básicas em uma aplicação de alta liquidez. Comece pequeno: mesmo R$ 50 por mês já é um início. Este fundo protege você de imprevistos como desemprego, problemas de saúde ou reparos urgentes."
  }
];

export default function Insights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Insights com IA</h1>
          <p className="text-muted-foreground mt-1">Análises personalizadas para melhorar suas finanças</p>
        </div>
        <Button className="gap-2" variant="outline">
          <Sparkles className="h-4 w-4" />
          Gerar Novos Insights
        </Button>
      </div>

      {/* AI Summary */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Resumo Inteligente do Mês
          </CardTitle>
          <CardDescription>Análise automática baseada em seus padrões de gasto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">
            Este mês você gastou <strong className="text-primary">R$ 4.800</strong>, um aumento de 
            <strong className="text-destructive"> 12%</strong> em relação ao mês anterior. 
            O principal fator foi o aumento em despesas com alimentação e transporte. 
            Sua taxa de poupança foi de <strong className="text-accent">14.3%</strong>, 
            ligeiramente abaixo da sua meta de 20%.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Maior Gasto</p>
              <p className="text-lg font-bold text-foreground">Moradia</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categoria em Alta</p>
              <p className="text-lg font-bold text-foreground">Alimentação</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Potencial de Corte</p>
              <p className="text-lg font-bold text-success">R$ 450</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Análises Detalhadas</h2>
        {insights.map((insight) => {
          const Icon = 
            insight.type === "warning" ? AlertCircle :
            insight.type === "success" ? TrendingUp :
            Lightbulb;

          const colorClass = 
            insight.type === "warning" ? "text-warning" :
            insight.type === "success" ? "text-success" :
            "text-primary";

          const bgClass = 
            insight.type === "warning" ? "bg-warning/10 border-warning/30" :
            insight.type === "success" ? "bg-success/10 border-success/30" :
            "bg-primary/10 border-primary/30";

          return (
            <Card key={insight.id} className={bgClass}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${colorClass}`} />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <CardDescription className="mt-1">{insight.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${colorClass}`}>
                    {insight.impact}
                  </span>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Accordion type="single" collapsible>
                  <AccordionItem value="details" className="border-0">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Ver análise detalhada
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.details}
                      </p>
                      <div>
                        <p className="text-sm font-medium mb-2">Ações recomendadas:</p>
                        <ul className="space-y-1">
                          {insight.actionItems.map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Educational Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            Educação Financeira
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {educationalContent.map((content) => {
            const Icon = content.icon;
            return (
              <Card key={content.id}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-accent/10 p-2">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{content.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {content.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="content" className="border-0">
                      <AccordionTrigger className="text-sm hover:no-underline py-2">
                        Ler mais
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {content.content}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
