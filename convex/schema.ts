import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  events: defineTable({
    title: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    type: v.string(),
    status: v.string(),
    description: v.optional(v.string()),
    attendanceLink: v.optional(v.string()),
  }),
  
  songs: defineTable({
    title: v.string(),
    audioUrl: v.string(),
    duration: v.string(),
    category: v.string(), // "original", "cover", "live"
    description: v.optional(v.string()),
    youtubeId: v.optional(v.string()),
  }),
  
  members: defineTable({
    name: v.string(),
    voicePart: v.string(),
    imageUrl: v.string(),
    yearsWithGroup: v.number(),
    testimony: v.optional(v.string()),
  }),
  
  quotationRequests: defineTable({
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
    status: v.string(), // "pending", "contacted", "quoted", "booked"
  }),
  
  donations: defineTable({
    amount: v.number(),
    phoneNumber: v.string(),
    status: v.string(), // "pending", "completed", "failed"
    transactionId: v.optional(v.string()),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
