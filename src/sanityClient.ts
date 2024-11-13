import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Replace with your project ID
  dataset: import.meta.env.VITE_SANITY_DATASET, // Replace with your dataset name
  apiVersion: '2023-10-05', // Use the current date for the latest API version
  token: import.meta.env.VITE_SANITY_TOKEN, // Replace with your new token that has write permissions
  useCdn: false, // `false` if you want fresh data
});
