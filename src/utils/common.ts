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
