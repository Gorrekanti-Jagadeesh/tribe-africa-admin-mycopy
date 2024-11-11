// Convert base64 image to Blob for upload
export const base64ToBlob = (base64: string, mimeType = 'image/jpeg'): Blob => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = Array.from({ length: byteCharacters.length }, (_, i) => byteCharacters.charCodeAt(i));
  return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
};
