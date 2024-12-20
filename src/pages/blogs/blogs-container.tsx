import { useParams } from 'react-router';
import BlogPageScreen from './blogs-screen';
import demo from '@assets/homepage-welcome-image.png';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';

const BlogPage = () => {
  const { country, blogCategory } = useParams();

  const customBlogCategory = fromKebabCase(blogCategory);
  const customCountry = country ? fromKebabCase(country) : '';

  const {
    data: homeBlogData,
    error: homeBlogError,
    isLoading: homeBlogLoading,
  } = useQuery({
    queryKey: ['home-blogs-data', blogCategory],
    queryFn: () => sanity.GET(`*[_type == "blog" && homeBlog == true && blogType == "${customBlogCategory}"]`), // Handle undefined 'country'
    enabled: !country,
  });

  const {
    data: countryBlogData,
    error: countryBlogError,
    isLoading: countryBlogLoading,
  } = useQuery({
    queryKey: ['country-blogs-data', blogCategory],
    queryFn: () =>
      sanity.GET(`*[_type == "blog" && country == "${customCountry}" && blogType == "${customBlogCategory}"]`), // Handle undefined 'country'
    enabled: Boolean(country),
  });

  if (homeBlogLoading || countryBlogLoading) {
    return 'loading';
  }
  if (homeBlogError || countryBlogError) {
    return 'Error';
  }

  const data = homeBlogData || countryBlogData;

  return <BlogPageScreen banner={demo} data={data} blogCategory={customBlogCategory} country={customCountry} />;
};

export default BlogPage;
