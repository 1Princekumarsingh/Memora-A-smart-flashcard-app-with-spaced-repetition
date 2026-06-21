import { AppError } from "../../utils/AppError.js";
import { Prisma } from "../../generated/prisma/client.ts";

import * as deckService from "./deck.service.js";

export const getDecks = async(req, res) => {
    const decks = await deckService.getAllDecks(req.user.id);

    res.status(200).json({
        success: true,
        data: decks
    })
}

export const getDeck = async(req, res) => {
    const deck = await deckService.getDeckById(req.params.deckId, req.user.id);

    if(!deck){
        throw new AppError("Deck not found", 404)
    }

    res.status(200).json({
        success: true,
        data: deck
    })
}

export const createDeck = async(req, res) => {
    const {name} = req.body;

    const deck = await deckService.createDeck(
        name,
        req.user.id
    )

    res.status(201).json({
        success: true, 
        data: deck
    })
}

export const deleteDeck = async (req, res) => {
  const deck = await deckService.getDeckById(
    req.params.deckId,
    req.user.id
  );

  if (!deck) {
    throw new AppError("Deck not found", 404);
  }

  await deckService.deleteDeck(req.params.deckId);

  res.status(200).json({
    success: true,
    message: "Deck deleted successfully"
  });
}

export const getStudyCards = async(req, res) => {
    const deck = await deckService.getDeckById(req.params.deckId, req.user.id);

    if(!deck){
        throw new AppError("Deck not found", 404)
    }

    const cards = await deckService.getDueCards(req.params.deckId);

    res.status(200).json({
        success: true,
        data: cards
    })
}