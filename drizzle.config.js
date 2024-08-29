/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://interviewdb_owner:pgYSyfV6xe9P@ep-royal-salad-a55hclil.us-east-2.aws.neon.tech/interviewdb?sslmode=require",
    }
  };