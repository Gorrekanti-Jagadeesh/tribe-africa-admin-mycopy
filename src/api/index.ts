import axios from 'axios';
import sanityClient from '../sanityClient';

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

const spaceId = '4b35ixzkzcwg';
const accessToken = '0dMnG2k9dSYnFw9bLX52eWPj9opUAyyczsqzY_haxLs';

export const fetchHotelEntries = async (): Promise<ContentfulResponse> => {
  console.log('called');
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

// --------------- Sanity SDK ---------------------
// ------------------ Blogs -----------------------

// ------------------- QNA ------------------------

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
  return sanityClient.fetch(
    `*[_type == "${entryType}" ${key ? '&& ' + key : ''}] ${format ? '{' + format.join(',') + '}' : ''}`
  ); // to filter keys: `*[_type == "${entryType}"]{_id, name, location}`
};

export const getEntryDataById = (id: any) => {
  return sanityClient.fetch(`*[_id == '${id}']`);
};

export const addQuestion = async (data) => {
  let req = {
    ...data,
    _type: 'qna',
    author: JSON.parse(Cookies.get('googleUser')).email,
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
