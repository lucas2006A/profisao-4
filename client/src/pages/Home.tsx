import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, DollarSign, Briefcase } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [showComparative, setShowComparative] = useState(false);

  const handleEnterPlatform = () => {
    setShowComparative(true);
  };

  // Economic data for comparison
  const comparisonData = [
    {
      metric: "Custo de Vida Mensal",
      mt: "R$ 3.360",
      pr: "R$ 4.300",
      mtBetter: true,
    },
    {
      metric: "Crescimento PIB",
      mt: "~5,8%",
      pr: "~4,5%",
      mtBetter: true,
    },
    {
      metric: "Foco Econômico",
      mt: "Agropecuária",
      pr: "Indústria + Agro",
      mtBetter: false,
    },
    {
      metric: "Produção Agrícola",
      mt: "Soja, Milho, Algodão",
      pr: "Soja, Milho",
      mtBetter: true,
    },
  ];

  if (!showComparative) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Hero Section with Farm Image */}
        <div className="relative h-screen w-full overflow-hidden">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663435431882/7sVfRzFyjFbh8dtQpiNSJD/farm-hero_70fd4dca.png"
            alt="Fazenda - Mato Grosso vs Paraná"
            className="w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Mato Grosso vs Paraná
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md max-w-2xl">
              Descubra as oportunidades econômicas e qualidade de vida entre os dois maiores polos agroindustriais do Brasil
            </p>

            {/* CTA Button */}
            <button
              onClick={handleEnterPlatform}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Entrar na Plataforma
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="text-white/70 text-sm">Clique para explorar</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              MG vs PR
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#comparison" className="text-slate-600 hover:text-slate-900 font-medium transition">
              Comparativo
            </a>
            <a href="#data" className="text-slate-600 hover:text-slate-900 font-medium transition">
              Dados
            </a>
            <a href="#chat" className="text-slate-600 hover:text-slate-900 font-medium transition">
              IA
            </a>
            <a href="#comments" className="text-slate-600 hover:text-slate-900 font-medium transition">
              Comentários
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Comparison Section */}
        <section id="comparison" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comparativo Econômico</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Análise detalhada dos principais indicadores econômicos entre Mato Grosso e Paraná
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {comparisonData.map((item, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-slate-900">{item.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-lg ${
                        item.mtBetter
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300"
                          : "bg-slate-50 border border-slate-200"
                      }`}
                    >
                      <p className="text-sm text-slate-600 font-medium mb-1">Mato Grosso</p>
                      <p className="text-xl font-bold text-slate-900">{item.mt}</p>
                      {item.mtBetter && (
                        <div className="flex items-center gap-1 mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-xs font-semibold">Melhor</span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        !item.mtBetter
                          ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300"
                          : "bg-slate-50 border border-slate-200"
                      }`}
                    >
                      <p className="text-sm text-slate-600 font-medium mb-1">Paraná</p>
                      <p className="text-xl font-bold text-slate-900">{item.pr}</p>
                      {!item.mtBetter && (
                        <div className="flex items-center gap-1 mt-2 text-blue-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-xs font-semibold">Melhor</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Mato Grosso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 mb-2">Custo de vida mais acessível</p>
                <p className="text-2xl font-bold">R$ 3.360/mês</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  Paraná
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 mb-2">Maior diversificação industrial</p>
                <p className="text-2xl font-bold">Polo Logístico</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Crescimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 mb-2">MT lidera em crescimento PIB</p>
                <p className="text-2xl font-bold">5,8% vs 4,5%</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Quer explorar mais?</h3>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Converse com nossa IA para análises personalizadas, veja dados detalhados e compartilhe sua experiência com outros usuários.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/data")}
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-3 rounded-lg"
            >
              Ver Dados Completos
            </Button>
            <Button
              onClick={() => setLocation("/chat")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg"
            >
              Conversar com IA
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
