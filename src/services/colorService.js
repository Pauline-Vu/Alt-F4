/**
 * Service pour la conversion des couleurs en images
 */

// Fonction pour générer une image à partir d'une couleur hexadécimale
export const createColorImage = (hexColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = hexColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas.toDataURL('image/png');
};

// Fonction pour convertir un tableau de palettes avec des couleurs hex en images
export const convertPaletteColorsToImages = (palettes) => {
  return palettes.map(palette => ({
    ...palette,
    colors: palette.colors.map(color => ({
      hex: color,
      imageUrl: createColorImage(color)
    }))
  }));
};
