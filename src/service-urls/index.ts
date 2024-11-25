const serviceUrls = {
  currency: {
    fetchCurrencies: `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_CURRENCY_API_KEY}`,
  },
  home: {
    contentful_base: `https://cdn.contentful.com/spaces/${import.meta.env.VITE_SPACE_ID}`,
  },
  base: {
    weather: `https://api.openweathermap.org/data/2.5/weather`,
  },
};
export default serviceUrls;
