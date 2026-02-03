import React, { useState } from 'react';
import DeckInput from './components/DeckInput';
import Preview from './components/Preview';

function App() {
  const [cards, setCards] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleCardsLoaded = (loadedCards, images) => {
    setCards(loadedCards);
    setCardImages(images);
    setStatus(null);
  };

  const handleStatus = (message, type) => {
    setStatus({ message, type });
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="container">
      <header>
        <h1>⚔️ MTG Print FR</h1>
        <p>Convertissez votre decklist en grille prête à imprimer</p>
      </header>

      <div className="main-content">
        <DeckInput 
          onCardsLoaded={handleCardsLoaded}
          onStatus={handleStatus}
          onLoading={handleLoading}
          isLoading={loading}
          cardImages={cardImages}
        />
        <Preview 
          cards={cards}
          cardImages={cardImages}
          status={status}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

export default App;
