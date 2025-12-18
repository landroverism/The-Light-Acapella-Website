import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("members").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    voicePart: v.string(),
    imageUrl: v.string(),
    yearsWithGroup: v.number(),
    testimony: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("members", args);
  },
});
