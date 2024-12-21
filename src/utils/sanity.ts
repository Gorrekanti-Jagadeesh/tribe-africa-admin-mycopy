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
    WORKING_REMOTELY: `*[_type == "blog" && homeBusinessBlogs =="Working Remotely" && blogType == "Business"]`,
    BUSINESS_FRIENDLY: `*[_type == "blog"  && homeBusinessBlogs == "Business Friendly" && blogType == "Business"]`,
    PREMIER_SERVICES: `*[_type == "home-premier-services"]`,
  },
  BUSINESS: {
    LANDING: `*[_type == "business-landing-page"]`,
  },
};

export const sanity = {
  GET: (query) => sanityClient.fetch(query),
  POST: (data) => sanityClient.create(data),
  PUT: (id, data) => sanityClient.patch(id).set(data).commit(),
};

export const parseImageUrl = (imageStr: string) => {
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
export const processContent = async (html: string[]) => {
  let richtext = '';
  let richTextBlocks = [];
  for (let i = 0; i < html.length; i++) {
    const part = html[i];

    if (part.startsWith('<img')) {
      const blocks = htmlToBlocks(
        richtext,
        schema.get('blogContent').fields.find((field: { name: string }) => field.name === 'content').type
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
    schema.get('blogContent').fields.find((field: { name: string }) => field.name === 'content').type
  );
  richTextBlocks.push(...blocks);
  return richTextBlocks;
};
