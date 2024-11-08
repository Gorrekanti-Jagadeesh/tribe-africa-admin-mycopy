import Button from '../../../atoms/custom-button/button';
import BlogView from '../../../molecules/blogs/blog-view';
import BlogListing from '../../../molecules/blogs/blog-listing';
import UnderlineHeading from '../../../atoms/heading/underline-heading';
import { BlogPageScreenProps } from '../../../types';

const BlogPageScreen: React.FC<BlogPageScreenProps> = ({ blogId, parseImageUrl, banner, blogsList }) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      {blogId ? (
        <BlogView blogId={blogId} parseImageUrl={parseImageUrl} />
      ) : (
        <div className="flex flex-col gap-4">
          <div id="header" className="flex mb-4">
            <UnderlineHeading>Business Articles</UnderlineHeading>
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
          <BlogListing heading={'Recent *Articles*'} blogList={blogsList} />
        </div>
      )}
    </div>
  );
};

export default BlogPageScreen;
