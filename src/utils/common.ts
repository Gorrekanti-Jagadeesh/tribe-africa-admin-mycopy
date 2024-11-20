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

export const generateId = () => `${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
