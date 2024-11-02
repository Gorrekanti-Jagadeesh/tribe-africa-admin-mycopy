// containers/BlogPageContainer.tsx

import { useParams } from 'react-router';
import BlogPageScreen from './blogs-screen';

const BlogPage = () => {
  const { blogId } = useParams();

  const blogData = {
    title: 'title1',
    image: '',
    content: '<p>HTML content goes here</p>',
  };

  return <BlogPageScreen blogId={blogId} blogData={blogData} />;
};

export default BlogPage;
