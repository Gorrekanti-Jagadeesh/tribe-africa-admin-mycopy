import Cookies from 'js-cookie';

export const getFormData = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  let data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
};

export const isLoggedIn = () => {
  return Cookies.get('googleUser') != undefined || Cookies.get('emailUser') != undefined;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

export const toKebabCase = (text: string) => {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/&/g, 'and') // Replace '&' with 'and'
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters except spaces
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
};

export const fromKebabCase = (kebab: string) => {
  return kebab
    .split('-') // Split the string by hyphens
    .map((word) => {
      if (['and'].includes(word)) {
        return word; // Lowercase certain words like "and"
      }
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of other words
    })
    .join(' ') // Join the words with spaces
    .replace(/\band\b/g, '&'); // Replace 'And' with '&'
};
export const fromSnakeCase = (kebab: string) => {
  return kebab
    .split('_') // Split the string by hyphens
    .map((word) => {
      if (['and'].includes(word)) {
        return word; // Lowercase certain words like "and"
      }
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of other words
    })
    .join(' ') // Join the words with spaces
    .replace(/\band\b/g, '&'); // Replace 'And' with '&'
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

export const getAverageOfObjectValues = (obj: object) => {
  let sum = 0;
  Object.values(obj).forEach((val) => (sum += val));
  return sum / Object.values(obj).length;
};

export const appendToAverage = (average: number, count: number, value: number) => {
  return (average * count + value) / (count + 1);
};

export const deepMerge = (...objects) => {
  return objects.reduce((acc, obj) => {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object' && acc[key] && typeof acc[key] === 'object') {
        acc[key] = deepMerge(acc[key], obj[key]);
      } else {
        acc[key] = obj[key];
      }
    }
    return acc;
  }, {});
};
