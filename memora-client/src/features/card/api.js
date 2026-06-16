const DECKS_API = "http://localhost:5000/api/decks";
const CARDS_API = "http://localhost:5000/api/cards";

export async function getCards(deckId) {
    const response = await fetch(`${DECKS_API}/${deckId}/cards`);

    if(!response.ok){
        throw new Error("Failed to fetch cards");
    }
    const result = await response.json();
    return result.data
}

export async function createCard({deckId, question, answer}){
  const response = await fetch(
    `${DECKS_API}/${deckId}/cards`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
      }),
    }
  )

  if(!response.ok){
    throw new Error("Failed to create card")
  }

  const result = await response.json();
  return result.data;
}

export async function deleteCard(cardId){
    const response = await fetch(`${CARDS_API}/${cardId}`, {
        method: "DELETE"
    })
    
    if(!response.ok){
        throw new Error("Failed to delete card");
    }

    return response.json();
}