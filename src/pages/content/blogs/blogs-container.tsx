import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BlogPageScreen from './blogs-screen';

import { getDataByEntryType } from '../../../api';

import { BlogContentProps } from '../../../types';
import demo from '../../../assets/homepage-welcome-image.png';

const BlogPage = () => {
  const { blogId } = useParams();

  const [blogList, setBlogList] = useState<BlogContentProps[]>([]);
  console.log(blogList);

  const parseImageUrl = (imageStr: string) => {
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

  useEffect(() => {
    getDataByEntryType('blog')
      .then((res: any[]) => {
        setBlogList(
          res.map((item: { _id: any; title: any; image: { asset: { _ref: string } }; content: any }) => {
            return {
              _id: item._id,
              title: item.title,
              image: parseImageUrl(item.image.asset._ref),
              content: item.content,
            };
          })
        );
      })
      .catch((err: any) => console.error(err));
  }, []);

  return <BlogPageScreen blogId={blogId} parseImageUrl={parseImageUrl} banner={demo} blogsList={blogList} />;
};

export default BlogPage;
