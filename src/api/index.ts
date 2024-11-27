import axios from 'axios';
import sanityClient from '../sanityClient';
import { UploadBody } from '@sanity/client';
import { base64ToBlob } from '../utils/common';
import imageUrlBuilder from '@sanity/image-url';
import serviceUrls from '../service-urls';
export * as qna from './qna';

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

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const fetchHotelEntries = async (): Promise<ContentfulResponse> => {
  try {
    const response = await axios.get(`${serviceUrls.home.contentful_base}/entries`, {
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
  const response = await axios.get(`${serviceUrls.home.contentful_base}/assets/${entryId}?access_token=${accessToken}`);

  return 'https:' + response.data.fields.file.url;
};

// ------------- Currency Converter --------------------

export const fetchCurrencies = async () => {
  const url = serviceUrls.currency.fetchCurrencies;
  try {
    const res = await axios.get(`${url}/codes`);
    if (res?.data) {
      return res?.data.supported_codes.map((code: string[]) => {
        return {
          currencyCode: code[0],
          currencyName: code[1],
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error Fetching', error);
  }
};

export const convertCurrency = async (fromCurrency: string, toCurrency: string, amount: number) => {
  const url = serviceUrls.currency.fetchCurrencies;
  try {
    const res = await fetch(`${url}/pair/${fromCurrency}/${toCurrency}/${amount}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Error Fetching ${error}`);
  }
};

export const fetchWeatherData = async (country: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?q=${country}&key=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);

    const temperature = response.data.current.temp_f;
    const condition = response.data.current.condition.text;
    const time = response.data.location.localtime;

    console.log(temperature, 'rtvfcd');
    return { temperature, condition, time };
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

export const updateByDocumentById = async (id: string, updatedDocument) => {
  try {
    const update = await sanityClient.patch(id).set(updatedDocument).commit();

    console.log(`Data is updated:`, update);
  } catch (err) {
    console.error('Error updating the document:', err);
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

// export const getDataByDocumentType = (entryType: string, fields?: string[]) => {
//   const fieldsQuery = fields ? fields.join(', ') : '*';
//   return sanityClient.fetch(`*[_type == "${entryType}"]{${fieldsQuery}}`);
// };

export const getDataByDocumentType = (entryType: string, fields?: string[], language = 'en') => {
  const fieldsQuery = fields ? fields.join(', ') : '*';
  return sanityClient.fetch(`*[_type == "${entryType}" && language == "${language}"]{${fieldsQuery}}`);
};

export const getDataByDocumentTypeWithId = (entryType: string, fieldType: string, id?: string, fields?: string[]) => {
  const fieldsQuery = fields ? fields.join(', ') : '*';
  const query = `*[_type == "${entryType}" && ${fieldType} == "${id}"]{
    ${fieldsQuery}
  }`;
  return sanityClient.fetch(query);
};

export const getEntryDataById = (id: string) => {
  return sanityClient.fetch(`*[_id == '${id}']`);
};

export const getHotelsInLocationWithLimit = (countryId: string) => {
  sanityClient
    .fetch(`*[_type == "Hotels" && location._ref == '${countryId}'] [0...4]`) // Replace with your document type
    .then((res) => {
      return res;
    })
    .catch((err: Error) => console.error(err));
};

// Upload image to Sanity
export const uploadImage = async (file: UploadBody | string) => {
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
