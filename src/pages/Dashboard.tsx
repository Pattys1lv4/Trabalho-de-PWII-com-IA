import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Target, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Mock data - será substituído por dados reais
const expensesByCategory = [
  { name: "Alimentação", value: 1200, color: "hsl(var(--chart-1))" },
  { name: "Transporte", value: 800, color: "hsl(var(--chart-2))" },
  { name: "Moradia", value: 2000, color: "hsl(var(--chart-3))" },
  { name: "Lazer", value: 500, color: "hsl(var(--chart-4))" },
  { name: "Outros", value: 300, color: "hsl(var(--chart-5))" },
];

const monthlyTrend = [
  { month: "Jun", receita: 5000, despesa: 4200 },
  { month: "Jul", receita: 5200, despesa: 4500 },
  { month: "Ago", receita: 5000, despesa: 4800 },
  { month: "Set", receita: 5500, despesa: 4600 },
  { month: "Out", receita: 5300, despesa: 4900 },
  { month: "Nov", receita: 5600, despesa: 4800 },
];

// Dados detalhados para os dialogs
const incomeDetails = [
  { source: "Salário", value: 4500, percentage: 80.4 },
  { source: "Freelance", value: 800, percentage: 14.3 },
  { source: "Investimentos", value: 300, percentage: 5.3 },
];

const expenseDetails = [
  { category: "Moradia", value: 2000, percentage: 41.7, color: "hsl(var(--chart-3))" },
  { category: "Alimentação", value: 1200, percentage: 25.0, color: "hsl(var(--chart-1))" },
  { category: "Transporte", value: 800, percentage: 16.7, color: "hsl(var(--chart-2))" },
  { category: "Lazer", value: 500, percentage: 10.4, color: "hsl(var(--chart-4))" },
  { category: "Outros", value: 300, percentage: 6.2, color: "hsl(var(--chart-5))" },
];

const balanceBreakdown = [
  { item: "Conta Corrente", value: 500, icon: Wallet },
  { item: "Reserva de Emergência", value: 200, icon: Target },
  { item: "Disponível para Investir", value: 100, icon: TrendingUp },
];

const savingsHistory = [
  { month: "Jun", rate: 12.0, amount: 600 },
  { month: "Jul", rate: 13.5, amount: 702 },
  { month: "Ago", rate: 4.0, amount: 200 },
  { month: "Set", rate: 16.4, amount: 902 },
  { month: "Out", rate: 7.5, amount: 398 },
  { month: "Nov", rate: 14.3, amount: 800 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<"income" | "expenses" | "balance" | "savings" | null>(null);
  
  const totalIncome = 5600;
  const totalExpenses = 4800;
  const balance = totalIncome - totalExpenses;
  const savingsRate = ((balance / totalIncome) * 100).toFixed(1);

  const handleCategoryClick = (categoryName: string) => {
    navigate('/transactions', { state: { filterCategory: categoryName } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral das suas finanças</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          variant="elevated" 
          className="cursor-pointer hover:scale-105 transition-smooth animate-fade-in"
          onClick={() => setOpenDialog("income")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              R$ {totalIncome.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +8% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card 
          variant="elevated"
          className="cursor-pointer hover:scale-105 transition-smooth animate-fade-in"
          onClick={() => setOpenDialog("expenses")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              R$ {totalExpenses.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card 
          variant="elevated"
          className="cursor-pointer hover:scale-105 transition-smooth animate-fade-in"
          onClick={() => setOpenDialog("balance")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {balance.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Disponível para poupar
            </p>
          </CardContent>
        </Card>

        <Card 
          variant="elevated"
          className="cursor-pointer hover:scale-105 transition-smooth animate-fade-in"
          onClick={() => setOpenDialog("savings")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Poupança</CardTitle>
            <CreditCard className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {savingsRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Meta: 20%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs de Detalhes */}
      {/* Dialog Receita Total */}
      <Dialog open={openDialog === "income"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-success">
              <TrendingUp className="h-5 w-5" />
              Detalhamento de Receitas - Novembro
            </DialogTitle>
            <DialogDescription>
              Análise completa das suas fontes de renda
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Receitas</p>
                  <p className="text-3xl font-bold text-success">R$ {totalIncome.toLocaleString("pt-BR")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Comparação</p>
                  <p className="flex items-center gap-1 text-success font-medium">
                    <ArrowUpRight className="h-4 w-4" />
                    +8% vs mês anterior
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Fontes de Receita</h3>
                <div className="space-y-3">
                  {incomeDetails.map((item) => (
                    <div key={item.source} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.source}</span>
                        <div className="text-right">
                          <span className="font-semibold">R$ {item.value.toLocaleString("pt-BR")}</span>
                          <span className="text-xs text-muted-foreground ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Dicas para Aumentar sua Receita
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Considere diversificar suas fontes de renda</li>
                  <li>• Explore oportunidades de freelance na sua área</li>
                  <li>• Invista em educação para aumentar seu potencial</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Despesas */}
      <Dialog open={openDialog === "expenses"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <TrendingDown className="h-5 w-5" />
              Detalhamento de Despesas - Novembro
            </DialogTitle>
            <DialogDescription>
              Veja onde seu dinheiro está sendo gasto
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Despesas</p>
                  <p className="text-3xl font-bold text-destructive">R$ {totalExpenses.toLocaleString("pt-BR")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Comparação</p>
                  <p className="flex items-center gap-1 text-destructive font-medium">
                    <ArrowUpRight className="h-4 w-4" />
                    +12% vs mês anterior
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Despesas por Categoria</h3>
                <div className="space-y-3">
                  {expenseDetails.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.category}</span>
                        <div className="text-right">
                          <span className="font-semibold">R$ {item.value.toLocaleString("pt-BR")}</span>
                          <span className="text-xs text-muted-foreground ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-smooth" 
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Oportunidades de Economia
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Moradia representa 41.7% do total - considere renegociar</li>
                  <li>• Alimentação acima da média - tente cozinhar mais em casa</li>
                  <li>• Revise assinaturas e serviços não utilizados</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Saldo */}
      <Dialog open={openDialog === "balance"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <DollarSign className="h-5 w-5" />
              Detalhamento do Saldo - Novembro
            </DialogTitle>
            <DialogDescription>
              Como seu saldo está distribuído
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Total</p>
                  <p className="text-3xl font-bold text-primary">R$ {balance.toLocaleString("pt-BR")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-primary font-medium">Positivo</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Distribuição do Saldo</h3>
                <div className="space-y-3">
                  {balanceBreakdown.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.item} className="flex items-center justify-between p-3 bg-card border rounded-lg hover:shadow-md transition-smooth">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{item.item}</span>
                        </div>
                        <span className="font-semibold">R$ {item.value.toLocaleString("pt-BR")}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <h4 className="font-semibold mb-2 text-success">Receita</h4>
                  <p className="text-2xl font-bold">R$ {totalIncome.toLocaleString("pt-BR")}</p>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold mb-2 text-destructive">Despesas</h4>
                  <p className="text-2xl font-bold">R$ {totalExpenses.toLocaleString("pt-BR")}</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Recomendações Financeiras
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Mantenha uma reserva de emergência de 3-6 meses</li>
                  <li>• Considere investir o excedente em ativos de baixo risco</li>
                  <li>• Continue monitorando seus gastos mensalmente</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Taxa de Poupança */}
      <Dialog open={openDialog === "savings"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-accent">
              <CreditCard className="h-5 w-5" />
              Detalhamento de Poupança - Novembro
            </DialogTitle>
            <DialogDescription>
              Histórico e metas de economia
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Poupança Atual</p>
                  <p className="text-3xl font-bold text-accent">{savingsRate}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Meta</p>
                  <p className="text-2xl font-bold text-muted-foreground">20%</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progresso para Meta (20%)</span>
                  <span className="text-sm text-muted-foreground">{((parseFloat(savingsRate) / 20) * 100).toFixed(0)}%</span>
                </div>
                <Progress value={(parseFloat(savingsRate) / 20) * 100} className="h-3" />
              </div>

              <div>
                <h3 className="font-semibold mb-3">Histórico de Poupança (Últimos 6 Meses)</h3>
                <div className="space-y-2">
                  {savingsHistory.map((item) => (
                    <div key={item.month} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                      <span className="text-sm font-medium">{item.month}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{item.rate.toFixed(1)}%</span>
                        <span className="font-semibold">R$ {item.amount.toLocaleString("pt-BR")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Dicas para Aumentar sua Taxa de Poupança
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Você está a {(20 - parseFloat(savingsRate)).toFixed(1)}% da sua meta de 20%</li>
                  <li>• Tente reduzir gastos não essenciais em 10%</li>
                  <li>• Configure transferências automáticas para poupança</li>
                  <li>• Revise gastos recorrentes como assinaturas</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
            <CardDescription>Clique em uma fatia para ver os detalhes das transações</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={(data) => handleCategoryClick(data.name)}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `R$ ${value}`}
                  cursor={{ fill: 'transparent' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendência Mensal</CardTitle>
            <CardDescription>Receitas vs Despesas nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrend}>
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
                <Bar dataKey="receita" fill="hsl(var(--success))" name="Receita" />
                <Bar dataKey="despesa" fill="hsl(var(--destructive))" name="Despesa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
