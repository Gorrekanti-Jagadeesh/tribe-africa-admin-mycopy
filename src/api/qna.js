import sanityClient from '../sanityClient';
import Cookies from 'js-cookie';
export const addQuestion = async (data) => {
  let req = {
    ...data,
    _type: 'qna',
    author: JSON.parse(Cookies.get('googleUser') || '{}').email,
    date: new Date(),
    replies_count: 0,
  };
  if (req.level != 'primary') {
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
