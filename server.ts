import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
//
import connectDB from "./config/db";
import { Users, Intro } from "./routes";
import { errorHandler, notFound } from "./middlewares";

// Initialize the Hono app
const app = new Hono().basePath("/api/v1");

// Config MongoDB
connectDB();

// Initialize middlewares
app.use("*", logger(), prettyJSON());

// Initialize Secure Heders
app.use(secureHeaders());

// Cors
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Home Route
app.get("/", (c) => c.text("Welcome to the API!"));

// User Routes
app.route("/users", Users);
app.route("/intro", Intro);

// Error Handler
app.onError((err, c) => {
  const error = errorHandler(c);
  return error;
});

// Not Found Handler
app.notFound((c) => {
  const error = notFound(c);
  return error;
});

const port = Bun.env.PORT || 8000;

export default {
  port,
  fetch: app.fetch,
};
