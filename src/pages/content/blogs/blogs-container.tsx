import { useParams } from 'react-router';
import BlogPageScreen from './blogs-screen';

import demo from '../../../assets/homepage-welcome-image.png';

const BlogPage = () => {
  const { blogId } = useParams();

  const blogData = {
    _id: 'randomstringofnumbers',
    title: 'title1',
    image: demo,
    content: '<p>HTML content goes here</p>',
  };

  return (
    <BlogPageScreen
      blogId={blogId}
      banner={demo}
      blogData={blogData}
      blogsList={[
        {
          _id: '1',
          image: demo,
          title: 'card1',
          redirectUrl: '/blogs/',
        },
        {
          _id: '2',
          image: demo,
          title: 'card1',
          redirectUrl: '/blogs/',
        },
        {
          _id: '3',
          image: demo,
          title: 'card1',
          redirectUrl: '/blogs/',
        },
      ]}
    />
  );
};

export default BlogPage;
