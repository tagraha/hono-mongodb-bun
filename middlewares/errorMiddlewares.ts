import { Context } from "hono";

// Error Handler
export const errorHandler = (c: Context) => {
  console.log(c.res.status);
  const isProd = process.env.NODE_ENV === "production";

  return c.json({
    success: false,
    message: c.error?.message,
    ...(isProd ? {} : { stack: c.error?.stack }),
  });
};

// Not Found Handler
export const notFound = (c: Context) => {
  return c.json({
    success: false,
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  });
};
