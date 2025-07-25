/*
# app.use 用法，与 Koa 相同

# 步骤

Step 1:
yarn run:example app/middleware/app start

Step 2:
curl http://localhost:13000/
*/
import { Application } from '@nocobase/server';

const app = new Application({
  database: {
    logging: process.env.DB_LOGGING === 'on' ? console.log : false,
    dialect: process.env.DB_DIALECT as any,
    storage: process.env.DB_STORAGE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    timezone: process.env.DB_TIMEZONE,
    tablePrefix: process.env.DB_TABLE_PREFIX,
  },
  resourcer: {
    prefix: '/api',
  },
  plugins: [],
});

// Same as Koa
app.use(async (ctx, next) => {
  ctx.body = 'Hello AMS-GHMC';
  await next();
});

if (require.main === module) {
  app.runAsCLI();
}

export default app;
