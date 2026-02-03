import React, { useState } from 'react';
import { parseDeckList, validateDeckList } from '../utils/deckParser';
import { searchCards } from '../utils/scryfall';
import { generatePDF, downloadPDF, convertImageToBase64 } from '../utils/pdfGenerator';

function DeckInput({ onCardsLoaded, onStatus, onLoading, isLoading, cardImages }) {
  const [deckText, setDeckText] = useState('');

  const handlePreview = async () => {
    setDeckText(deckText.trim());

    if (!deckText.trim()) {
      onStatus('Veuillez coller une decklist', 'error');
      return;
    }

    try {
      onLoading(true);
      onStatus('Parsing de la decklist...', 'loading');

      // Parser la decklist
      const parsedCards = parseDeckList(deckText);

      // Valider
      const errors = validateDeckList(parsedCards);
      if (errors.length > 0) {
        onStatus(errors.join(' | '), 'error');
        onLoading(false);
        return;
      }

      onStatus(`${parsedCards.length} cartes trouvées. Récupération des images...`, 'loading');

      // Récupérer les images depuis Scryfall
      const cardNames = parsedCards.map(c => c.name);
      const searchResults = await searchCards(cardNames);

      // Créer la grille d'images (répéter selon qty)
      const cardImages = [];
      const successCards = [];

      for (let i = 0; i < parsedCards.length; i++) {
        const original = parsedCards[i];
        const result = searchResults[i];

        if (result.success) {
          successCards.push(original);
          for (let j = 0; j < original.qty; j++) {
            cardImages.push(result);
          }
        }
      }

      onStatus(`${successCards.length}/${parsedCards.length} cartes chargées`, 'success');
      onCardsLoaded(successCards, cardImages);
    } catch (error) {
      onStatus(`Erreur: ${error.message}`, 'error');
    } finally {
      onLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!cardImages || cardImages.length === 0) {
      onStatus('Aucune image à télécharger. Cliquez d\'abord sur "Prévisualiser"', 'error');
      return;
    }

    try {
      onLoading(true);
      onStatus('Préparation du PDF...', 'loading');

      const totalCards = cardImages.length;
      onStatus(`Téléchargement de ${totalCards} images depuis Scryfall...`, 'loading');

      // Télécharger les images en base64 via des proxies d'image
      const imageBuffers = [];
      
      for (let i = 0; i < cardImages.length; i++) {
        const imageUrl = cardImages[i].imageUrl;
        
        try {
          // Créer une image invisible pour forcer le téléchargement via le navigateur
          const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`);
          
          if (!response.ok) {
            throw new Error('Échec du téléchargement');
          }
          
          const arrayBuffer = await response.arrayBuffer();
          imageBuffers.push(arrayBuffer);
          
          const percent = Math.round(((i + 1) / cardImages.length) * 100);
          onStatus(`Téléchargement... ${percent}%`, 'loading');
          
          // Petite pause entre les requêtes
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Erreur image ${i}:`, error);
          throw new Error(`Impossible de télécharger l'image ${i + 1}`);
        }
      }

      onStatus('Génération du PDF...', 'loading');
      
      // Générer le PDF
      const pdfBytes = await generatePDF(imageBuffers);
      downloadPDF(pdfBytes, 'mtg-print.pdf');

      onStatus('PDF téléchargé! 🎉', 'success');
    } catch (error) {
      onStatus(`Erreur PDF: ${error.message}`, 'error');
      console.error('Erreur détaillée:', error);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>📋 Decklist</h2>
      <textarea
        value={deckText}
        onChange={(e) => setDeckText(e.target.value)}
        placeholder="Collez votre decklist ici...&#10;Exemple:&#10;4 Lightning Bolt&#10;3 Counterspell&#10;2 Unsummon"
        disabled={isLoading}
      />
      
      <div className="button-group">
        <button 
          onClick={handlePreview}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Chargement...
            </>
          ) : (
            '🔍 Prévisualiser'
          )}
        </button>
        <button 
          onClick={handleDownloadPDF}
          disabled={isLoading || !cardImages || cardImages.length === 0}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Génération...
            </>
          ) : (
            '📥 Télécharger PDF'
          )}
        </button>
      </div>

      {status && (
        <div className={`status-message ${status.type}`}>
          {status.type === 'loading' && <span className="loading-spinner"></span>}
          {status.message}
        </div>
      )}

      <div className="info-text">
        💡 Format: <strong>quantité nom</strong> (ex: "4 Lightning Bolt")
        <br />
        🌐 Utilisez les noms en anglais - l'API Scryfall retourne la version française
        <br />
        📄 PDF généré en grille 3x3 par page
      </div>
    </div>
  );
}

export default DeckInput;
