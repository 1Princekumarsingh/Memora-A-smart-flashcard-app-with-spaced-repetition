import express from 'express';

import authRoutes from "./modules/auth/auth.routes.js";
import deckRoutes from './modules/deck/deck.routes.js';
import cardRoutes from "./modules/card/card.routes.js";
import reviewRoutes from "./modules/review/review.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";
import { authenticate } from "./middleware/authenticate.js";

import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

import { corsMiddleware } from './middleware/security/cors.js';
import { helmetMiddleware } from './middleware/security/helmet.js';
import { apiLimiter, authLimiter } from './middleware/security/rateLimit.js';
import { JSON_LIMIT } from "./config/security.js";

import compression from "compression";
import hpp from "hpp";

const app = express();

app.disable("x-powered-by");

// Security
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compression());
app.use(hpp());

// parsers
app.use(express.json({ limit: JSON_LIMIT}));
app.use(express.urlencoded({ extended: true }));

// rate limiting
app.use("/api", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/signup", authLimiter);
app.use("/api/auth/refresh", authLimiter);

// public routes
app.use("/api/auth", authRoutes);

// protected routes
app.use("/api/decks", authenticate, deckRoutes);
app.use("/api/cards", authenticate, cardRoutes);
app.use("/api/reviews", authenticate, reviewRoutes);
app.use("/api/stats", authenticate, statsRoutes);

// error handling
app.use(notFound);
app.use(errorHandler);

export default app;
