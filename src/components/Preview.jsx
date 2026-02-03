import React from 'react';

function Preview({ cards, cardImages, status, isLoading }) {
  const totalCards = cardImages.length;
  const totalPages = Math.ceil(totalCards / 9);

  if (!cards || cards.length === 0) {
    return (
      <div className="section">
        <h2>👁️ Prévisualisation</h2>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px', 
          color: '#888',
          fontSize: '1.1em'
        }}>
          Cochez "Prévisualiser" pour voir vos cartes ici
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>👁️ Prévisualisation</h2>

      <div className="stats">
        <div className="stat-box">
          <div className="stat-label">Cartes uniques</div>
          <div className="stat-value">{cards.length}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Total cartes</div>
          <div className="stat-value">{totalCards}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Pages A4</div>
          <div className="stat-value">{totalPages}</div>
        </div>
      </div>

      {status && (
        <div className={`status-message ${status.type}`} style={{ marginTop: '15px' }}>
          {status.type === 'loading' && <span className="loading-spinner"></span>}
          {status.message}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <p style={{ 
          fontSize: '0.9em', 
          color: '#b0b0b0', 
          marginBottom: '15px' 
        }}>
          <strong>Grille (3×3 cartes par page)</strong>
        </p>
        
        <div className="preview-grid">
          {cardImages.map((card, index) => (
            <div key={index} className="card-wrapper">
              <img
                src={card.imageUrl}
                alt={`Card ${index}`}
                className="card-image"
                loading="lazy"
              />
              <div className="card-qty">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-text" style={{ marginTop: '20px' }}>
        ℹ️ Les numéros indiquent l'ordre d'impression. Chaque image sera imprimée individuellement sur le PDF.
      </div>
    </div>
  );
}

export default Preview;
