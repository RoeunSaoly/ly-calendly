
import { time } from "console";
import { pgTable, uuid, text, boolean, timestamp, index, pgEnum } from "drizzle-orm/pg-core";
import { DAYS_OF_WEEK_IN_ORDER } from "../constants/index";
import { relations } from "drizzle-orm";
const createdAt = timestamp("created_at").notNull().defaultNow(); // Creation timestamp
const updatedAt = timestamp("updated_at")
    .notNull().defaultNow().$onUpdate(() =>new Date()); // Update timestamp
// Define the events table schema
    export const EventTable = pgTable(
    "events", // table name
    {
        id: uuid("id").primaryKey().defaultRandom(), // UUID primary key
        // unique ID with default UUID
        name: text("name").notNull(), // Event name
        description: text("description").notNull(), // Event description
        durationInMinutes: text("duration_in_minutes").notNull(), // Duration in minutes
        clerkUserId: text("clerk_user_id").notNull(), // Clerk user ID
        isActive: boolean("is_active").notNull().default(true), // Active status
        createdAt, // Creation timestamp
        updatedAt, // Update timestamp
    },
    table => ([
        index("clerkUserIdIndex").on(table.clerkUserId), // Index on clerk user ID
    ])
);


// Define the schedules
export const ScheduleTable = pgTable(
    "schedules", // table name
    {
        id: uuid("id").primaryKey().defaultRandom(), // UUID primary key
        timezone: text("timezone").notNull(), // Timezone for the schedule
        clerkUserId: text("clerkUserId").notNull().unique(), // Clerk user ID
        createdAt, // Creation timestamp
        updatedAt, // Update timestamp
    }
);
export const scheduleRelations = relations(ScheduleTable,({many}) => ({
    availabilities: many(ScheduleAvailabilityTable), // Relation to schedule availabilities
}));

export const scheduleDayOfWeekEnum = pgEnum ("day",DAYS_OF_WEEK_IN_ORDER); // Enum for days of the week
// Define the schedule slots
export const ScheduleAvailabilityTable = pgTable(
    "scheduleAvailabilities", // table name 
    {
        id: uuid("id").primaryKey().defaultRandom(), // UUID primary key
        scheduleId: uuid("scheduleId")
        .notNull()
        .references(() => ScheduleTable.id,{ onDelete: "cascade"}), // Schedule ID
        startTime: text("start_time").notNull(), // Start time of the slot
        endTime: text("end_time").notNull(), // End time of the slot
        dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(), // Day of the week
    },
    table => ([
        index("scheduleIdIndex").on(table.scheduleId), // Index on schedule ID
        ])
    );

export const scheduleAvailabilityRelations = relations(ScheduleAvailabilityTable, ({one}) => ({
    schedule: one(ScheduleTable, {
        fields: [ScheduleAvailabilityTable.scheduleId],
        references: [ScheduleTable.id],
    }), // Relation to schedule
}));



