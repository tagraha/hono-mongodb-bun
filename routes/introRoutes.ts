import { Hono } from "hono";

const intro = new Hono();

// Print json intro
intro.get("/", (c) => {
  return c.json({
    success: true,
    message: "this is intro route",
  });
});

export default intro;
