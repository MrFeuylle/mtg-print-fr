const SCRYFALL_API = 'https://api.scryfall.com/cards/search';

export async function searchCard(cardName) {
  try {
    // Remplacer les espaces par des + pour l'URL Scryfall
    const formattedName = cardName.trim().replace(/\s+/g, '+');
    const query = `lang:fr+${formattedName}`;
    const url = `${SCRYFALL_API}?q=${query}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error(`Carte non trouvée: ${cardName}`);
    }

    const card = data.data[0];

    if (!card.image_uris || !card.image_uris.large) {
      throw new Error(`Pas d'image disponible pour: ${cardName}`);
    }

    return {
      name: card.name,
      imageUrl: card.image_uris.large,
      scryfallId: card.id
    };
  } catch (error) {
    throw new Error(`Erreur pour "${cardName}": ${error.message}`);
  }
}

export async function searchCards(cardNames) {
  const results = [];
  
  for (const cardName of cardNames) {
    try {
      const card = await searchCard(cardName);
      results.push({ ...card, success: true });
    } catch (error) {
      results.push({
        name: cardName,
        success: false,
        error: error.message
      });
    }
    
    // Respecter les limites API de Scryfall
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}
