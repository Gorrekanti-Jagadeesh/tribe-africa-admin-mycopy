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
    console.log(error);
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
