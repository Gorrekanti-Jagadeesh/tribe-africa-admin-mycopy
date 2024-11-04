import { useParams } from 'react-router';
import BlogPageScreen from './blogs-screen';

import demo from '../../../assets/homepage-welcome-image.png';

const BlogPage = () => {
  const { blogId } = useParams();

  const blogData = {
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
          image: demo,
          title: 'card1',
          redirectUrl: '/blogs/1',
        },
        {
          image: demo,
          title: 'card1',
          redirectUrl: '/blogs/1',
        },
        {
          image: demo,
          title: 'card1',
          redirectUrl: '/blogs/1',
        },
      ]}
    />
  );
};

export default BlogPage;
