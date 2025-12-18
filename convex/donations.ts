import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    amount: v.number(),
    phoneNumber: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("donations", {
      ...args,
      status: "pending",
    });
  },
});
