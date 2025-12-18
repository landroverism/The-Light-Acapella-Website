import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quotationRequests").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    fullName: v.string(),
    phone: v.string(),
    email: v.string(),
    eventType: v.string(),
    eventDate: v.string(),
    location: v.string(),
    guestCount: v.optional(v.string()),
    duration: v.optional(v.string()),
    amplificationNeeded: v.boolean(),
    specificSongs: v.optional(v.string()),
    specialRequests: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quotationRequests", {
      ...args,
      status: "pending",
    });
  },
});
