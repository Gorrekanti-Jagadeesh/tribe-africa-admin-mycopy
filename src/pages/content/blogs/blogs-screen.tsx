// screens/BlogPageScreen.tsx

import BlogView from '../../../molecules/blogs/blog-view';
import BlogListing from '../../../molecules/blogs/blog-listing';

interface BlogPageScreenProps {
  blogId: string | undefined;
  blogData: {
    title: string;
    image: string;
    content: string;
  };
}

const BlogPageScreen: React.FC<BlogPageScreenProps> = ({ blogId, blogData }) => {
  return (
    <div>
      {blogId ? (
        <BlogView title={blogData.title} image={blogData.image} content={blogData.content} />
      ) : (
        <BlogListing
          heading={'Recent Articles'}
          data={[]} // Here you could pass real data for recent articles
        />
      )}
    </div>
  );
};

export default BlogPageScreen;
