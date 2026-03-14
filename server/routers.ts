import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { comments, economicData, aiConversations } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Comments router
  comments: router({
    create: protectedProcedure
      .input(z.object({
        state: z.enum(["MT", "PR"]),
        content: z.string().min(1).max(1000),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const result = await db.insert(comments).values({
          userId: ctx.user.id,
          state: input.state,
          content: input.content,
          approved: 0,
        });

        // Notify owner of new comment
        await notifyOwner({
          title: "Novo Comentário Pendente",
          content: `Novo comentário sobre ${input.state}: "${input.content.substring(0, 50)}..."`,
        });

        return result;
      }),

    list: publicProcedure
      .input(z.object({
        state: z.enum(["MT", "PR"]).optional(),
      }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];

        let query = db.select().from(comments).where(eq(comments.approved, 1));

        if (input?.state) {
          query = db
            .select()
            .from(comments)
            .where(
              input.state === "MT"
                ? eq(comments.state, "MT")
                : eq(comments.state, "PR")
            );
        }

        return await query.orderBy(comments.createdAt);
      }),
  }),

  // Economic data router
  data: router({
    getEconomicData: publicProcedure
      .input(z.object({
        state: z.enum(["MT", "PR"]),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];

        return await db
          .select()
          .from(economicData)
          .where(eq(economicData.state, input.state));
      }),

    getAllData: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];

      return await db.select().from(economicData);
    }),
  }),

  // AI chat router
  ai: router({
    chat: protectedProcedure
      .input(z.object({
        question: z.string().min(1),
        context: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const systemPrompt = `Você é um especialista em economia regional brasileira, focando em Mato Grosso e Paraná.
Forneça análises precisas e baseadas em dados reais sobre:
- Salários e custo de vida
- Oportunidades de investimento
- Qualidade de vida
- Setores econômicos
- Mudança de estado

Dados conhecidos:
- Mato Grosso: Custo de vida R$ 3.360/mês, Crescimento PIB 5,8%, Foco em Agropecuária
- Paraná: Custo de vida R$ 4.300/mês, Crescimento PIB 4,5%, Foco em Indústria e Agro

Seja conciso, profissional e sempre cite dados quando possível.`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input.question },
          ],
        });

        const content = response.choices[0]?.message.content;
        const answer =
          typeof content === "string"
            ? content
            : "Desculpe, não consegui gerar uma resposta.";

        // Save conversation
        const db = await getDb();
        if (db) {
          await db.insert(aiConversations).values([
            {
              userId: ctx.user.id,
              question: input.question,
              answer: answer,
              context: input.context,
            },
          ]);
        }

        return { answer };
      }),
  }),
});

export type AppRouter = typeof appRouter;
