import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertCircle, Sparkles } from "lucide-react";

const insights = [
  {
    id: 1,
    type: "warning",
    title: "Gastos com Alimentação Aumentaram 25%",
    description: "Seus gastos com alimentação fora de casa aumentaram significativamente. Considere preparar mais refeições em casa.",
    impact: "Economia potencial: R$ 300/mês"
  },
  {
    id: 2,
    type: "success",
    title: "Parabéns! Meta de Poupança Atingida",
    description: "Você conseguiu poupar mais do que sua meta este mês. Continue assim!",
    impact: "Você está 15% acima da meta"
  },
  {
    id: 3,
    type: "tip",
    title: "Oportunidade de Economia em Assinaturas",
    description: "Você tem 3 assinaturas ativas que não usou nos últimos 30 dias. Considere cancelá-las.",
    impact: "Economia potencial: R$ 89,90/mês"
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
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle>Educação Financeira</CardTitle>
          <CardDescription>Dicas para melhorar sua gestão financeira</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold mb-1">Regra 50-30-20</h3>
                <p className="text-sm text-muted-foreground">
                  Destine 50% da renda para necessidades, 30% para desejos e 20% para poupança e investimentos.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold mb-1">Fundo de Emergência</h3>
                <p className="text-sm text-muted-foreground">
                  Mantenha de 3 a 6 meses de despesas guardadas para imprevistos. Este deve ser seu primeiro objetivo.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold mb-1">Metas SMART</h3>
                <p className="text-sm text-muted-foreground">
                  Defina metas Específicas, Mensuráveis, Atingíveis, Relevantes e com prazo definido (Temporais).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
