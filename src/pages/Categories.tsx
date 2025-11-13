import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingBag, Car, Home, Smile, MoreHorizontal } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const categories = [
  { 
    id: 1, 
    name: "Alimentação", 
    icon: ShoppingBag, 
    spent: 1200, 
    budget: 1500,
    color: "hsl(var(--chart-1))"
  },
  { 
    id: 2, 
    name: "Transporte", 
    icon: Car, 
    spent: 800, 
    budget: 900,
    color: "hsl(var(--chart-2))"
  },
  { 
    id: 3, 
    name: "Moradia", 
    icon: Home, 
    spent: 2000, 
    budget: 2000,
    color: "hsl(var(--chart-3))"
  },
  { 
    id: 4, 
    name: "Lazer", 
    icon: Smile, 
    spent: 500, 
    budget: 600,
    color: "hsl(var(--chart-4))"
  },
  { 
    id: 5, 
    name: "Outros", 
    icon: MoreHorizontal, 
    spent: 300, 
    budget: 400,
    color: "hsl(var(--chart-5))"
  },
];

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categorias</h1>
          <p className="text-muted-foreground mt-1">Organize e monitore seus gastos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => {
          const percentage = (category.spent / category.budget) * 100;
          const Icon = category.icon;
          
          return (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="rounded-lg p-2"
                      style={{ backgroundColor: category.color, opacity: 0.1 }}
                    >
                      <Icon className="h-5 w-5" style={{ color: category.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>
                        R$ {category.spent.toLocaleString("pt-BR")} de R$ {category.budget.toLocaleString("pt-BR")}
                      </CardDescription>
                    </div>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: category.color }}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={percentage} 
                  className="h-2"
                  style={{ 
                    // @ts-ignore
                    "--progress-background": category.color 
                  }}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {percentage >= 100 ? (
                    <span className="text-destructive font-medium">
                      Orçamento excedido em R$ {(category.spent - category.budget).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-success font-medium">
                      R$ {(category.budget - category.spent).toFixed(2)} disponíveis
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dicas para Categorização</CardTitle>
          <CardDescription>Como organizar melhor seus gastos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
            <h3 className="font-semibold text-primary mb-2">💡 Use a IA para categorizar</h3>
            <p className="text-sm text-muted-foreground">
              Nossa inteligência artificial aprende com seus padrões e categoriza automaticamente novas transações.
            </p>
          </div>
          <div className="rounded-lg bg-accent/5 p-4 border border-accent/20">
            <h3 className="font-semibold text-accent mb-2">🎯 Defina orçamentos realistas</h3>
            <p className="text-sm text-muted-foreground">
              Baseie seus limites nos últimos 3 meses de gastos e ajuste gradualmente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
