export function parseDeckList(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const cards = [];

  for (const line of lines) {
    const match = line.match(/^(\d+)\s+(.+)$/);
    
    if (match) {
      const qty = parseInt(match[1], 10);
      const name = match[2].trim();
      
      if (name) {
        cards.push({ qty, name });
      }
    }
  }

  return cards;
}

export function validateDeckList(cards) {
  const errors = [];
  
  if (cards.length === 0) {
    errors.push('Aucune carte détectée');
  }

  cards.forEach((card, index) => {
    if (card.qty < 1 || card.qty > 4) {
      errors.push(`Ligne ${index + 1}: Quantité invalide (${card.qty})`);
    }
    if (!card.name || card.name.length === 0) {
      errors.push(`Ligne ${index + 1}: Nom de carte vide`);
    }
  });

  return errors;
}
