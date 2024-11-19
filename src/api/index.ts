import axios from 'axios';
import sanityClient from '../sanityClient';
import { UploadBody } from '@sanity/client';
import { base64ToBlob } from '../utils/common';
import imageUrlBuilder from '@sanity/image-url';
import Cookies from 'js-cookie';

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

const spaceId = import.meta.env.VITE_SPACE_ID;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

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

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

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

// --------------- Sanity SDK ---------------------
// ------------------ Blogs -----------------------

export const addNewEntry = (countryId: string) => {
  const newHotel = {
    _type: 'Blog',
    name: 'Sunrise Hotel',
    location: {
      _type: 'reference',
      _ref: countryId,
    },
    hotelCategory: 'Luxury',
  };

  return sanityClient.create(newHotel).then((res: { _id: string }) => {
    return console.log(`Hotel was created with ID: ${res._id}`);
  });
};

export const handleUpdate = async (hotelId: string) => {
  try {
    const updatedHotel = await sanityClient
      .patch(hotelId) // ID of the document to update
      .set({
        name: 'Updated Sunrise Hotel', // New hotel name
        hotelCategory: 'Updated Luxury', // Updated hotel category
      })
      .commit(); // Commit the changes

    console.log(`Hotel was updated:`, updatedHotel);
  } catch (err) {
    console.error('Error updating hotel:', err);
  }
};

export const getAllEntryTypes = () => {
  sanityClient
    .fetch('*[defined(_type)]._type')
    .then((types: Iterable<unknown> | null | undefined) => {
      const uniqueTypes = [...new Set(types)];
      console.log('All entry types:', uniqueTypes);
    })
    .catch((error: string) => {
      console.error('Error fetching entry types:', error);
    });
};

export const getDataByEntryType = async (entryType: string, key?: string, format?: string[]) => {
  console.log(
    `*[_type == "${entryType}" ${key ? '&& ' + key : ''} && !(_id in path("drafts.*"))] ${format ? '{' + format.join(',') + '}' : ''}`
  );
  return sanityClient.fetch(
    `*[_type == "${entryType}" ${key ? '&& ' + key : ''} && !(_id in path("drafts.*"))] ${format ? '{' + format.join(',') + '}' : ''}`
  ); // to filter keys: `*[_type == "${entryType}"]{_id, name, location}`
};

export const getDataByDocumentType = (entryType: string, fields?: string[]) => {
  const fieldsQuery = fields ? fields.join(', ') : '*';
  return sanityClient.fetch(`*[_type == "${entryType}"]{${fieldsQuery}}`);
};

export const getDataByDocumentTypeWithId = (entryType: string, fieldType: string, id?: string, fields?: string[]) => {
  const fieldsQuery = fields ? fields.join(', ') : '*';
  const query = `*[_type == "${entryType}" && ${fieldType} == "${id}"]{
    ${fieldsQuery}
  }`;
  return sanityClient.fetch(query);
};

export const getEntryDataById = (id: any) => {
  return sanityClient.fetch(`*[_id == '${id}']`);
};

export const getHotelsInLocationWithLimit = (countryId: any) => {
  sanityClient
    .fetch(`*[_type == "Hotels" && location._ref == '${countryId}'] [0...4]`) // Replace with your document type
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => console.error(err));
};

// Upload image to Sanity
export const uploadImage = async (file: UploadBody | string): Promise<any> => {
  try {
    const imageAsset = await sanityClient.assets.upload('image', typeof file === 'string' ? base64ToBlob(file) : file);
    return imageAsset;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const sanityImageUrlBuilder = (image: string) => {
  const builder = imageUrlBuilder(sanityClient);
  return builder.image(image);
};

export const addQuestion = async (data: { title: string; level: string }) => {
  let req = {
    ...data,
    _type: 'qna',
    author: JSON.parse(Cookies.get('googleUser') || '{}').email,
    date: new Date(),
    replies_count: 0,
  };

  if (req.level != 'primary') {
    console.log(req.title.slice(6));
    const result = await sanityClient.patch(req.title.slice(6)).inc({ replies_count: 1 }).commit();
    console.log('Multiple fields updated:', result);
  }

  try {
    const res = await sanityClient.create(req);
    return res;
  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
};
