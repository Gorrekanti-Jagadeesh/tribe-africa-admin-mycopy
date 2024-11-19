import Cookies from 'js-cookie';

export const getFormData = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  let data: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
};

export const isLoggedIn = () => {
  return Cookies.get('googleUser') != undefined || Cookies.get('emailUser') != undefined;
};

// Convert base64 image to Blob for upload
export const base64ToBlob = (base64: string, mimeType = 'image/jpeg'): Blob => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = Array.from({ length: byteCharacters.length }, (_, i) => byteCharacters.charCodeAt(i));
  return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
};
