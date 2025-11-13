import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, AlertTriangle } from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Fundo de Emergência",
    target: 10000,
    current: 3500,
    category: "Poupança",
    deadline: "2026-06-01"
  },
  {
    id: 2,
    name: "Viagem de Férias",
    target: 5000,
    current: 1800,
    category: "Lazer",
    deadline: "2026-01-01"
  },
  {
    id: 3,
    name: "Curso de Especialização",
    target: 3000,
    current: 2400,
    category: "Educação",
    deadline: "2025-12-01"
  }
];

export default function Budget() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Metas e Orçamento</h1>
          <p className="text-muted-foreground mt-1">Defina e acompanhe seus objetivos financeiros</p>
        </div>
        <Button className="gap-2">
          <Target className="h-4 w-4" />
          Nova Meta
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Progresso Geral
          </CardTitle>
          <CardDescription>Seu desempenho financeiro este mês</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Meta de Economia</span>
              <span className="text-sm font-bold text-primary">70% atingido</span>
            </div>
            <Progress value={70} className="h-3" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">R$ 800</p>
              <p className="text-xs text-muted-foreground">Economizado</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">R$ 350</p>
              <p className="text-xs text-muted-foreground">Falta atingir</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">14.3%</p>
              <p className="text-xs text-muted-foreground">Taxa mensal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Suas Metas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const daysLeft = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          const isUrgent = daysLeft < 30;

          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    <CardDescription>{goal.category}</CardDescription>
                  </div>
                  {isUrgent && (
                    <div className="flex items-center gap-1 text-warning text-sm font-medium">
                      <AlertTriangle className="h-4 w-4" />
                      {daysLeft} dias
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      R$ {goal.current.toLocaleString("pt-BR")} de R$ {goal.target.toLocaleString("pt-BR")}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Prazo: {new Date(goal.deadline).toLocaleDateString("pt-BR")}
                  </span>
                  <span className="text-success font-medium">
                    Falta: R$ {(goal.target - goal.current).toLocaleString("pt-BR")}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
        </div>
      </div>

      {/* Tips Card */}
      <Card className="border-accent/50 bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle>Dicas para Alcançar suas Metas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="mt-0.5">✅</div>
            <div>
              <p className="font-medium">Automatize suas economias</p>
              <p className="text-sm text-muted-foreground">
                Configure transferências automáticas logo após receber seu salário
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5">📊</div>
            <div>
              <p className="font-medium">Revise mensalmente</p>
              <p className="text-sm text-muted-foreground">
                Ajuste suas metas com base no seu progresso e mudanças de vida
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5">🎯</div>
            <div>
              <p className="font-medium">Seja específico</p>
              <p className="text-sm text-muted-foreground">
                Metas claras e mensuráveis são mais fáceis de alcançar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
