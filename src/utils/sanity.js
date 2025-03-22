import { uploadImage } from '../api';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import sanityClient from '../sanityClient';
export const query = {
  HOME: {
    EXPLORE: `*[_type == "home-landing-page"][0]`,
    CHARMING_HOTELS: `*[_type == "hotel"]{
            name,
            address,
            email,
            country,
            website,
            phone,
            images[] {
              asset->{
                _id,
                url
              }
            },
            isCharmingHotel
          }`,
    HOLIDAY_DESTINATIONS: `*[_type == "holiday-destinations"]`,
    WORKING_REMOTELY: `*[_type == "blog" && homeBusinessBlog =="Working Remotely" && blogType == "Business"]`,
    BUSINESS_FRIENDLY: `*[_type == "blog"  && homeBusinessBlog == "Business Friendly" && blogType == "Business"]`,
    PREMIER_SERVICES: `*[_type == "home-premier-services"]`,
  },
  BUSINESS: {
    LANDING: `*[_type == "business-landing-page"]`,
    NETWORK: {
      GOVT_OFFICIALS: (country) =>
        `*[_type == "government-officials" && country == "${country}" && _type == "government-officials"]`,
      FIND_A_BUSINESS_DATA: (country, mainCategory, subCategory) => {
        if (subCategory) {
          return `*[_type == "findABusiness" && country == "${country}" && mainCategory == "${mainCategory}" && subCategory == "${subCategory}"]`;
        } else {
          return `*[_type == "findABusiness" && country == "${country}" && mainCategory == "${mainCategory}"]`;
        }
      },
      FIND_A_BUSINESS_DETAILS: (id) => `*[_type == "findABusiness" && _id == "${id}"][0]`,
    },
  },
  COUNTRY: {
    DETAILS: (country, fields) =>
      `*[_type == "countryDetails" && country == "${country}"]{${fields.length ? fields.join(', ') : '*'}}[0]`,
  },
  HOLIDAY: {
    MUST_SEE_AND_DO: {
      CATEGORY: `*[_type == "must-see-category"]`,
      DATA: (country, category) =>
        `*[_type == "must-see-and-do" && country == "${country}" && category._ref == "${category}"]{_id, title, image { asset->{ _id, url } } }`,
      DETAILS: (id) => `*[_type == "must-see-and-do" && _id == "${id}"]`,
    },
  },
  ACCOMMODATION: {
    LIST: `*[_type == "accomodationList"]{
      _id, name, phone_no, website, amount, images[0], reviews
    }`,
    DETAILS: (id) => `*[_type == "accomodationList" && _id == "${id}"][0]`,
  },
  REVIEWS: {
    ACCOMMODATION: (id) => `*[_type == "review" && key == "review:accommodation:${id}"]`,
    PEOPLE: (id) => `*[_type == "review" && key == "review:people:${id}"]`,
    ALL: `*[_type == "review"]`,
  },
};
export const sanity = {
  GET: (query) => sanityClient.fetch(query),
  POST: (type, data) => sanityClient.create({ ...data, _type: type }),
  PUT: (id, data) => sanityClient.patch(id).set(data).commit(),
  DELETE: (id) => sanityClient.delete(id),
};
export const parseImageUrl = (imageStr) => {
  // for reference: https://cdn.sanity.io/images/0oezgboa/production/ac70bcb6e7211fe6f057d4f90a754901a299f5c3-800x488.jpg
  const imageElements = imageStr.split('-');
  const variables = import.meta.env;
  return (
    variables.VITE_SANITY_IMAGE_URL_PREFIX +
    '/' +
    variables.VITE_SANITY_PROJECT_ID +
    '/' +
    variables.VITE_SANITY_DATASET +
    '/' +
    imageElements[1] +
    '-' +
    imageElements[2] +
    '.' +
    imageElements[3]
  );
};
export const getUserEnrollments = async (type, email) => {
  const data = await sanity.GET(`*[_type == "${type}" && email == "${email}"]`);
  return data;
};
const schema = Schema.compile({
  name: 'blogContentSchema',
  types: [
    {
      type: 'object',
      name: 'blogContent',
      fields: [
        {
          name: 'content',
          type: 'array',
          title: 'Content',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});
// Process the split content
export const processContent = async (html) => {
  let richtext = '';
  let richTextBlocks = [];
  for (let i = 0; i < html.length; i++) {
    const part = html[i];
    if (part.startsWith('<img')) {
      const blocks = htmlToBlocks(
        richtext,
        schema.get('blogContent').fields.find((field) => field.name === 'content').type
      );
      richTextBlocks.push(...blocks);
      richtext = '';
      // If it's an image, upload it and add a reference to it
      const srcMatch = part.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        const imageUrl = srcMatch[1];
        const res = await uploadImage(imageUrl);
        richTextBlocks.push({
          _type: 'image',
          asset: { _type: 'reference', _ref: res._id },
        });
      }
    } else {
      richtext += part;
    }
  }
  const blocks = htmlToBlocks(
    richtext,
    schema.get('blogContent').fields.find((field) => field.name === 'content').type
  );
  richTextBlocks.push(...blocks);
  return richTextBlocks;
};
// Function to count images using splitRichText
export function countImagesInRichText(richText) {
  const splitContent = splitRichText(richText);
  return splitContent.filter((part) => part.startsWith('<img')).length;
}
// Split rich text into tags and text
export function splitRichText(richText) {
  const regex = /(<[^>]+>|[^<]+)/g;
  return richText.match(regex) || [];
}
