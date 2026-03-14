import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Loader2, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

export default function CommentsPage() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [selectedState, setSelectedState] = useState<"MT" | "PR">("MT");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Queries
  const { data: comments = [], isLoading: isLoadingComments, refetch } = trpc.comments.list.useQuery({
    state: selectedState,
  });

  // Mutations
  const createCommentMutation = trpc.comments.create.useMutation();

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      toast.error("Por favor, escreva um comentário");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCommentMutation.mutateAsync({
        state: selectedState,
        content: commentText,
      });
      setCommentText("");
      toast.success("Comentário enviado para moderação!");
      refetch();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erro ao enviar comentário");
    } finally {
      setIsSubmitting(false);
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
              Você precisa estar autenticado para comentar.
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
            Comentários
          </h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Comment Form */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Compartilhe sua experiência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* State Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Qual estado você quer comentar?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedState("MT")}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    selectedState === "MT"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  🌾 Mato Grosso
                </button>
                <button
                  onClick={() => setSelectedState("PR")}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    selectedState === "PR"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  🏭 Paraná
                </button>
              </div>
            </div>

            {/* Comment Input */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Seu comentário
              </label>
              <Textarea
                placeholder="Compartilhe sua experiência, opinião ou pergunta sobre o estado..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={isSubmitting}
                className="min-h-24 border-slate-300 resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                {commentText.length}/1000 caracteres
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitComment}
              disabled={isSubmitting || !commentText.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Comentário
                </>
              )}
            </Button>
            <p className="text-xs text-slate-500 text-center">
              Seu comentário será revisado antes de ser publicado
            </p>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comentários sobre {selectedState === "MT" ? "Mato Grosso" : "Paraná"}
          </h2>

          {isLoadingComments ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          ) : comments.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">
                  Nenhum comentário ainda. Seja o primeiro a comentar!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="border-0 shadow-md hover:shadow-lg transition">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          Usuário #{comment.userId}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          comment.state === "MT"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {comment.state}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
