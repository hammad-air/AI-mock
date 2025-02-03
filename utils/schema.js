import { pgTable, serial, text, varchar,timestamp} from "drizzle-orm/pg-core";

export const MockInterview=pgTable('MockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer = pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt')
})


// for Badges Data


export const BadgesData = pgTable('BadgesData', {
    id: serial('id').primaryKey(),  // Unique ID for each badge entry
    userEmail: varchar('userEmail').notNull(),  // User's email
    badgeName: varchar('badgeName').notNull(),  // Name of the awarded badge
    awardedAt: timestamp('awardedAt').defaultNow().notNull()  // Timestamp when awarded
});
