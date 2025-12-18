import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").order("desc").collect();
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    type: v.string(),
    status: v.string(),
    description: v.optional(v.string()),
    attendanceLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});
