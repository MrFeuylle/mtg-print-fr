import { PDFDocument, PDFPage } from 'pdf-lib';

const PAGE_WIDTH = 595;  // A4 width in points
const PAGE_HEIGHT = 842; // A4 height in points
const MARGIN = 10;
const CARDS_PER_ROW = 3;
const CARDS_PER_COL = 3;
const CARDS_PER_PAGE = CARDS_PER_ROW * CARDS_PER_COL;

const USABLE_WIDTH = PAGE_WIDTH - (MARGIN * 2);
const USABLE_HEIGHT = PAGE_HEIGHT - (MARGIN * 2);

const CARD_WIDTH = USABLE_WIDTH / CARDS_PER_ROW;
const CARD_HEIGHT = USABLE_HEIGHT / CARDS_PER_COL;

export async function generatePDF(cardImages) {
  const pdfDoc = await PDFDocument.create();

  let cardIndex = 0;

  while (cardIndex < cardImages.length) {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let posX = MARGIN;
    let posY = PAGE_HEIGHT - MARGIN - CARD_HEIGHT;

    for (let row = 0; row < CARDS_PER_COL; row++) {
      posX = MARGIN;

      for (let col = 0; col < CARDS_PER_ROW; col++) {
        if (cardIndex < cardImages.length) {
          const cardImage = cardImages[cardIndex];

          try {
            // Essayer d'abord JPG (car on convertit en JPEG dans DeckInput)
            const image = await pdfDoc.embedJpg(cardImage);
            page.drawImage(image, {
              x: posX,
              y: posY,
              width: CARD_WIDTH,
              height: CARD_HEIGHT
            });
          } catch (error) {
            // Si JPG échoue, essayer PNG
            try {
              const image = await pdfDoc.embedPng(cardImage);
              page.drawImage(image, {
                x: posX,
                y: posY,
                width: CARD_WIDTH,
                height: CARD_HEIGHT
              });
            } catch (pngError) {
              console.error(`Erreur pour l'image ${cardIndex}:`, pngError);
              // Dessiner un rectangle gris pour les images manquantes
              page.drawRectangle({
                x: posX,
                y: posY,
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                color: { r: 0.8, g: 0.8, b: 0.8 }
              });
            }
          }
        }

        posX += CARD_WIDTH;
        cardIndex++;
      }

      posY -= CARD_HEIGHT;
    }
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export function downloadPDF(pdfBytes, filename = 'cards.pdf') {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function convertImageToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject(new Error('Impossible de convertir l\'image'));
            return;
          }
          
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Erreur de lecture'));
          reader.readAsArrayBuffer(blob);
        }, 'image/png');
      } catch (error) {
        reject(new Error(`Erreur canvas: ${error.message}`));
      }
    };
    
    img.onerror = () => reject(new Error('Impossible de charger l\'image'));
    img.src = imageUrl;
  });
}
