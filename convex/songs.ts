import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("songs").collect();
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("songs")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    audioUrl: v.string(),
    duration: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    youtubeId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("songs", args);
  },
});
