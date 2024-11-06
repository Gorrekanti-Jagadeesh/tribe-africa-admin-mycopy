import Button from '../../../atoms/custom-button/button';
import BlogView from '../../../molecules/blogs/blog-view';
import BlogListing from '../../../molecules/blogs/blog-listing';
import BlogCompose from '../../../molecules/blogs/blog-compose';

interface BlogPageScreenProps {
  blogId: string | undefined;
  banner: string;
  blogData: {
    _id: string;
    title: string;
    image: string;
    content: string;
  };
  blogsList: {
    _id: string;
    image: string;
    title?: string;
    redirectUrl: string;
  }[];
}

const BlogPageScreen: React.FC<BlogPageScreenProps> = ({ blogId, banner, blogData, blogsList }) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      {blogId ? (
        <BlogView title={blogData.title} image={blogData.image} content={blogData.content} />
      ) : (
        <div className="">
          <div id="header" className="flex mb-4">
            <h1 className="flex-grow border-b-2 border-orange-500 text-4xl max-w-md">Business Articles</h1>
            <Button className="ms-auto">Get Featured</Button>
          </div>
          <div id="banner" className="bg-gray-100 flex justify-center p-12">
            <img className="aspect-square max-w-80" src={banner} />
            <div className="flex flex-col gap-4 bg-white p-4 max-h-48 my-auto relative right-4">
              <h4 className="text-lg font-semibold">Top Businesses in 2024</h4>
              <div className="overflow-auto flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
          <BlogListing heading={'Recent Articles'} data={blogsList} />
          <BlogCompose className="mt-6" />
        </div>
      )}
    </div>
  );
};

export default BlogPageScreen;
