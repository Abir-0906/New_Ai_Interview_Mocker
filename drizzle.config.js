/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:HmBRcDp70AYh@ep-red-king-a5vnomcq.us-east-2.aws.neon.tech/Ai-mock-iv?sslmode=require',
    }
  };