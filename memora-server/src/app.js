import express from 'express';
import cors from 'cors';

import deckRoutes from './modules/deck/deck.routes.js';
import cardRoutes from "./modules/card/card.routes.js";

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

app.use('/api/decks', deckRoutes);
app.use("/api/cards", cardRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
