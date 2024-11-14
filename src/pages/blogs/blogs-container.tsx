import { useParams } from 'react-router';

import BlogPageScreen from './blogs-screen';
import demo from '@assets/homepage-welcome-image.png';

const BlogPage = () => {
  const { blogId } = useParams();

  return <BlogPageScreen blogId={blogId} banner={demo} />;
};

export default BlogPage;
