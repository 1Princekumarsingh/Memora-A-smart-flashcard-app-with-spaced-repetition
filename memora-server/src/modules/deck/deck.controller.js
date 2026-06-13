import { AppError } from "../../utils/AppError.js";

import * as deckService from "./deck.service.js";

export const getDecks = async(req, res) => {
    const decks = await deckService.getAllDecks();

    res.status(200).json({
        success: true,
        data: decks
    })
}

export const getDeck = async(req, res) => {
    const deck = await deckService.getDeckById(req.params.id);

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
    const TEMP_USER_ID = "cmq7wfs4t0000cwdn9384p58p";

    const deck = await deckService.createDeck(
        name,
        TEMP_USER_ID
    )

    res.status(201).json({
        success: true, 
        data: deck
    })
}

export const deleteDeck = async(req, res) => {
    const deck = await deckService.getDeckById(req.params.id);

    if(!deck){
        throw new AppError(
            "Deck not found", 404
        )
    }

    await deckService.deleteDeck(req.params.id)

    res.status(200).json({
        success: true,
        message: "Deck deleted successfully"
    })
}