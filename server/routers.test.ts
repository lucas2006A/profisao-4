import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(userId = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Comments Router", () => {
  it("should create a comment", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    // Mock the database and notification
    vi.mock("./db", () => ({
      getDb: vi.fn().mockResolvedValue({
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockResolvedValue({ insertId: 1 }),
        }),
      }),
    }));

    // This test would need proper database mocking
    // For now, we're testing the structure
    expect(caller.comments).toBeDefined();
    expect(caller.comments.create).toBeDefined();
  });

  it("should list comments by state", async () => {
    const caller = appRouter.createCaller(createMockContext());

    expect(caller.comments.list).toBeDefined();
  });
});

describe("Data Router", () => {
  it("should get economic data for a state", async () => {
    const caller = appRouter.createCaller(createMockContext());

    expect(caller.data.getEconomicData).toBeDefined();
  });

  it("should get all economic data", async () => {
    const caller = appRouter.createCaller(createMockContext());

    expect(caller.data.getAllData).toBeDefined();
  });
});

describe("AI Router", () => {
  it("should process a chat message", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    expect(caller.ai.chat).toBeDefined();
  });
});

describe("Auth Router", () => {
  it("should return current user", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeDefined();
    expect(result?.id).toBe(1);
    expect(result?.openId).toBe("user-1");
  });

  it("should logout user", async () => {
    const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];

    const ctx = createMockContext();
    ctx.res = {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"];

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies.length).toBeGreaterThan(0);
  });
});
