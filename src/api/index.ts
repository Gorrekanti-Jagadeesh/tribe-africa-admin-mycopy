import axios from 'axios';

interface ContentfulSys {
  id: string;
}

interface CustomContentfulAsset {
  sys: ContentfulSys;
}

interface HotelFields {
  hotelName: string;
  country: string;
  address: string;
  phone: string;
  hotelImages: CustomContentfulAsset[];
}

interface ContentfulEntry {
  sys: ContentfulSys;
  fields: HotelFields;
}

interface ContentfulResponse {
  items: ContentfulEntry[];
}

const spaceId = '4b35ixzkzcwg';
const accessToken = '0dMnG2k9dSYnFw9bLX52eWPj9opUAyyczsqzY_haxLs';

export const fetchHotelEntries = async (): Promise<ContentfulResponse> => {
  try {
    const response = await axios.get(`https://cdn.contentful.com/spaces/${spaceId}/entries`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        content_type: 'hotels',
        'fields.isCharming': true,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from Contentful');
  }
};

export const fetchImageByEntryId = async (entryId: string): Promise<string> => {
  console.log('called');
  const response = await axios.get(
    `https://cdn.contentful.com/spaces/${spaceId}/assets/${entryId}?access_token=${accessToken}`
  );

  return 'https:' + response.data.fields.file.url;
};

// ------------- Currency Converter --------------------

const API_KEY = 'be8ebd0ca41d4b904111474d';

export const fetchCurrencies = async () => {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
    const data = await res.json();
    return data.supported_codes.map((code: string[]) => {
      return {
        currencyCode: code[0],
        currencyName: code[1],
      };
    });
  } catch (error) {
    console.error('Error Fetching', error);
  }
};

export const convertCurrency = async (fromCurrency: string, toCurrency: string, amount: number) => {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Error Fetching ${error}`);
  }
};

export const fetchWeatherData = async () => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const city = 'hyderabad';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await axios.get(apiUrl);
    const { temp } = response.data.main;
    const description = response.data.weather[0].description;
    return { temperature: temp, description };
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};
