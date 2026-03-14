import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function DataPage() {
  const [, setLocation] = useLocation();

  // Economic comparison data
  const comparisonChartData = [
    { metric: "Custo de Vida", MT: 3360, PR: 4300 },
    { metric: "PIB Growth %", MT: 5.8, PR: 4.5 },
    { metric: "Salary Index", MT: 100, PR: 105 },
  ];

  // Sector distribution
  const mtSectors = [
    { name: "Agropecuária", value: 65 },
    { name: "Indústria", value: 20 },
    { name: "Serviços", value: 15 },
  ];

  const prSectors = [
    { name: "Indústria", value: 40 },
    { name: "Agropecuária", value: 35 },
    { name: "Serviços", value: 25 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

  // Detailed metrics table
  const detailedMetrics = [
    {
      category: "Finanças",
      metric: "Custo de Vida Mensal",
      mt: "R$ 3.360",
      pr: "R$ 4.300",
      advantage: "MT",
    },
    {
      category: "Economia",
      metric: "Crescimento PIB",
      mt: "5,8%",
      pr: "4,5%",
      advantage: "MT",
    },
    {
      category: "Agricultura",
      metric: "Produção de Soja",
      mt: "Líder Nacional",
      pr: "2º Maior",
      advantage: "MT",
    },
    {
      category: "Infraestrutura",
      metric: "Porto Principal",
      mt: "Cuiabá",
      pr: "Paranaguá",
      advantage: "PR",
    },
    {
      category: "Indústria",
      metric: "Foco Industrial",
      mt: "Agro-indústria",
      pr: "Diversificada",
      advantage: "PR",
    },
    {
      category: "Logística",
      metric: "Conectividade",
      mt: "Crescente",
      pr: "Consolidada",
      advantage: "PR",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Dados Econômicos
          </h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Comparison Chart */}
        <section className="mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Comparativo de Indicadores Principais</CardTitle>
              <CardDescription>
                Análise dos principais indicadores econômicos entre os estados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="MT" fill="#10b981" name="Mato Grosso" />
                  <Bar dataKey="PR" fill="#3b82f6" name="Paraná" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Sector Distribution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* MT Sectors */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Distribuição Setorial - Mato Grosso</CardTitle>
              <CardDescription>Composição da economia por setor</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mtSectors}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mtSectors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* PR Sectors */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Distribuição Setorial - Paraná</CardTitle>
              <CardDescription>Composição da economia por setor</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={prSectors}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {prSectors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Metrics Table */}
        <section>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Métricas Detalhadas</CardTitle>
              <CardDescription>Comparação completa de indicadores econômicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Categoria</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Métrica</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-600">Mato Grosso</th>
                      <th className="text-left py-3 px-4 font-semibold text-blue-600">Paraná</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">Vantagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedMetrics.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-slate-100 ${
                          idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                        } hover:bg-slate-100 transition`}
                      >
                        <td className="py-3 px-4 text-slate-600">{row.category}</td>
                        <td className="py-3 px-4 font-medium text-slate-900">{row.metric}</td>
                        <td className="py-3 px-4 text-green-700 font-semibold">{row.mt}</td>
                        <td className="py-3 px-4 text-blue-700 font-semibold">{row.pr}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              row.advantage === "MT"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {row.advantage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Insights */}
        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-900">Mato Grosso</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-800">
                <ul className="space-y-2">
                  <li>✓ Custo de vida mais acessível</li>
                  <li>✓ Maior crescimento econômico</li>
                  <li>✓ Líder em produção agrícola</li>
                  <li>✓ Potencial de expansão</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Paraná</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800">
                <ul className="space-y-2">
                  <li>✓ Economia mais diversificada</li>
                  <li>✓ Infraestrutura consolidada</li>
                  <li>✓ Polo logístico importante</li>
                  <li>✓ Estabilidade econômica</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-900">Oportunidades</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-800">
                <ul className="space-y-2">
                  <li>✓ Agronegócio em expansão</li>
                  <li>✓ Investimento em infraestrutura</li>
                  <li>✓ Crescimento populacional</li>
                  <li>✓ Mercado em desenvolvimento</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
