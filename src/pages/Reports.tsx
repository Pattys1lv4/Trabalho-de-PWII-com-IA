import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const allMonthlyData = [
  { month: "Jan", receita: 4500, despesa: 4100, poupanca: 400 },
  { month: "Fev", receita: 4600, despesa: 4300, poupanca: 300 },
  { month: "Mar", receita: 4700, despesa: 4000, poupanca: 700 },
  { month: "Abr", receita: 4900, despesa: 4400, poupanca: 500 },
  { month: "Mai", receita: 4800, despesa: 4200, poupanca: 600 },
  { month: "Jun", receita: 5000, despesa: 4200, poupanca: 800 },
  { month: "Jul", receita: 5200, despesa: 4500, poupanca: 700 },
  { month: "Ago", receita: 5000, despesa: 4800, poupanca: 200 },
  { month: "Set", receita: 5500, despesa: 4600, poupanca: 900 },
  { month: "Out", receita: 5300, despesa: 4900, poupanca: 400 },
  { month: "Nov", receita: 5600, despesa: 4800, poupanca: 800 },
  { month: "Dez", receita: 5800, despesa: 5000, poupanca: 800 },
];

const allCategoryTrend = [
  { month: "Jan", alimentacao: 850, transporte: 680, moradia: 2000, lazer: 370 },
  { month: "Fev", alimentacao: 870, transporte: 700, moradia: 2000, lazer: 430 },
  { month: "Mar", alimentacao: 820, transporte: 650, moradia: 2000, lazer: 330 },
  { month: "Abr", alimentacao: 890, transporte: 720, moradia: 2000, lazer: 490 },
  { month: "Mai", alimentacao: 880, transporte: 690, moradia: 2000, lazer: 430 },
  { month: "Jun", alimentacao: 900, transporte: 700, moradia: 2000, lazer: 400 },
  { month: "Jul", alimentacao: 950, transporte: 750, moradia: 2000, lazer: 500 },
  { month: "Ago", alimentacao: 1100, transporte: 800, moradia: 2000, lazer: 600 },
  { month: "Set", alimentacao: 1050, transporte: 750, moradia: 2000, lazer: 450 },
  { month: "Out", alimentacao: 1150, transporte: 850, moradia: 2000, lazer: 550 },
  { month: "Nov", alimentacao: 1200, transporte: 800, moradia: 2000, lazer: 500 },
  { month: "Dez", alimentacao: 1250, transporte: 820, moradia: 2000, lazer: 630 },
];

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function Reports() {
  const [startMonth, setStartMonth] = useState("6"); // June (index 6)
  const [monthsToShow, setMonthsToShow] = useState("6");

  const startIndex = parseInt(startMonth);
  const count = parseInt(monthsToShow);
  const endIndex = Math.min(startIndex + count, allMonthlyData.length);

  const monthlyData = allMonthlyData.slice(startIndex, endIndex);
  const categoryTrend = allCategoryTrend.slice(startIndex, endIndex);

  // Calculate metrics based on filtered data
  const avgIncome = monthlyData.reduce((sum, m) => sum + m.receita, 0) / monthlyData.length;
  const avgExpense = monthlyData.reduce((sum, m) => sum + m.despesa, 0) / monthlyData.length;
  const avgSavings = monthlyData.reduce((sum, m) => sum + m.poupanca, 0) / monthlyData.length;
  const savingsRate = ((avgSavings / avgIncome) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground mt-1">Análise detalhada das suas finanças</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Period Selector */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-lg">Selecione o Período de Análise</CardTitle>
          <CardDescription>Escolha o mês inicial e quantos meses deseja analisar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-month">Mês Inicial</Label>
              <Select value={startMonth} onValueChange={setStartMonth}>
                <SelectTrigger id="start-month">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {month} 2025
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="months-count">Quantidade de Meses</Label>
              <Select value={monthsToShow} onValueChange={setMonthsToShow}>
                <SelectTrigger id="months-count">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 mês</SelectItem>
                  <SelectItem value="3">3 meses</SelectItem>
                  <SelectItem value="6">6 meses</SelectItem>
                  <SelectItem value="12">12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Receita Média ({monthsToShow} {parseInt(monthsToShow) === 1 ? 'mês' : 'meses'})</CardDescription>
            <CardTitle className="text-3xl text-success">
              R$ {avgIncome.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingUp className="h-4 w-4" />
              <span>Período: {monthlyData[0]?.month} - {monthlyData[monthlyData.length - 1]?.month}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Despesa Média ({monthsToShow} {parseInt(monthsToShow) === 1 ? 'mês' : 'meses'})</CardDescription>
            <CardTitle className="text-3xl text-destructive">
              R$ {avgExpense.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{((avgExpense / avgIncome) * 100).toFixed(1)}% da receita média</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Poupança Média ({monthsToShow} {parseInt(monthsToShow) === 1 ? 'mês' : 'meses'})</CardDescription>
            <CardTitle className="text-3xl text-accent">
              R$ {avgSavings.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{savingsRate}% da receita média</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Fluxo Financeiro</CardTitle>
          <CardDescription>Evolução de receitas, despesas e poupança</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                formatter={(value) => `R$ ${value}`}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="receita" 
                stroke="hsl(var(--success))" 
                fillOpacity={1} 
                fill="url(#colorReceita)" 
                name="Receita"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="despesa" 
                stroke="hsl(var(--destructive))" 
                fillOpacity={1} 
                fill="url(#colorDespesa)" 
                name="Despesa"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência por Categoria</CardTitle>
          <CardDescription>Evolução dos gastos por categoria nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={categoryTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                formatter={(value) => `R$ ${value}`}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="alimentacao" 
                stroke="hsl(var(--chart-1))" 
                name="Alimentação"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="transporte" 
                stroke="hsl(var(--chart-2))" 
                name="Transporte"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="moradia" 
                stroke="hsl(var(--chart-3))" 
                name="Moradia"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="lazer" 
                stroke="hsl(var(--chart-4))" 
                name="Lazer"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle>Resumo do Período</CardTitle>
          <CardDescription>Análise consolidada dos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Receitas</p>
              <p className="text-2xl font-bold text-success">R$ 31.400</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Despesas</p>
              <p className="text-2xl font-bold text-destructive">R$ 27.300</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Poupado</p>
              <p className="text-2xl font-bold text-accent">R$ 4.100</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Taxa de Poupança</p>
              <p className="text-2xl font-bold text-primary">13.1%</p>
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <h3 className="font-semibold mb-2">Principais Observações</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span>•</span>
                <span>Suas receitas cresceram de forma consistente, com aumento médio de 2% ao mês</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Despesas com alimentação mostram tendência de crescimento - considere revisar este orçamento</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Sua taxa de poupança está abaixo da meta de 20% - recomendamos ajustar gastos variáveis</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
