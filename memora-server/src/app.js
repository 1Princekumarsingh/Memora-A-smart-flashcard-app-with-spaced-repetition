import express from 'express';
import cors from 'cors';

import authRoutes from "./modules/auth/auth.routes.js";
import deckRoutes from './modules/deck/deck.routes.js';
import cardRoutes from "./modules/card/card.routes.js";
import reviewRoutes from "./modules/review/review.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";
import { authenticate } from "./middleware/authenticate.js";

import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use("/api/decks", authenticate, deckRoutes);
app.use("/api/cards", authenticate, cardRoutes);
app.use("/api/reviews", authenticate, reviewRoutes);
app.use("/api/stats", authenticate, statsRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
