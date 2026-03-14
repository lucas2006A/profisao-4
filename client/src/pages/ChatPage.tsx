import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Streamdown } from "streamdown";
import { getLoginUrl } from "@/const";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.ai.chat.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await chatMutation.mutateAsync({
        question: input,
        context: "general_inquiry",
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-4">
        <Card className="border-0 shadow-lg max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Acesso Necessário</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-600">
              Você precisa estar autenticado para usar o chat com IA.
            </p>
            <a href={getLoginUrl()}>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Fazer Login
              </Button>
            </a>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setLocation("/")}
            >
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
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
            Assistente IA
          </h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-0 shadow-lg h-full flex flex-col">
          {/* Messages Container */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Bem-vindo ao Assistente IA
                </h2>
                <p className="text-slate-600 max-w-sm mb-6">
                  Faça perguntas sobre Mato Grosso e Paraná. Posso ajudar com:
                </p>
                <ul className="text-left space-y-2 text-slate-600">
                  <li>💰 Comparação de salários e custo de vida</li>
                  <li>📊 Análise de oportunidades de investimento</li>
                  <li>🏘️ Informações sobre qualidade de vida</li>
                  <li>🚀 Oportunidades de negócios</li>
                  <li>📍 Mudança de estado</li>
                </ul>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-green-600 text-white rounded-br-none"
                          : "bg-slate-100 text-slate-900 rounded-bl-none"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Streamdown>{message.content}</Streamdown>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Pensando...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </CardContent>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-4 bg-slate-50">
            <div className="flex gap-2">
              <Input
                placeholder="Faça uma pergunta sobre MG ou PR..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="flex-1 border-slate-300"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-green-600 hover:bg-green-700 text-white px-4"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Pressione Enter para enviar ou Shift+Enter para quebra de linha
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
