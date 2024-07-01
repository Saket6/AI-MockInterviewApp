/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./db/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Data_owner:J8ZKSLjWytH3@ep-royal-pine-a5o57ni0.us-east-2.aws.neon.tech/Data?sslmode=require',
    }
  };