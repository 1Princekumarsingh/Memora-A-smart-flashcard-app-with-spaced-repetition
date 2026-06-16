import { AppError } from "../../utils/AppError.js";
import { Prisma } from "../../generated/prisma/client.ts";
import * as cardService from "./card.service.js";

export const getCards = async (req, res) => {
    const cards = await cardService.getCardsByDeckId(req.params.deckId);

    res.status(200).json({
        success: true,
        data: cards
    })
}

export const createCard = async (req, res) => {
    const card = await cardService.createCard(req.body);

    res.status(201).json({
        success: true,
        data: card
    })
}

export const deleteCard = async (req, res) => {
  try {
    await cardService.deleteCard(req.params.cardId);

    res.status(200).json({
      success: true,
      message: "Card deleted successfully"
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"){
      throw new AppError("Card not found", 404)
    }

    throw error
  }
}