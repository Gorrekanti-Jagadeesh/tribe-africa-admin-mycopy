import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { PortableText } from '@portabletext/react';
import { getEntryDataById, sanityImageUrlBuilder } from '../../api';
import { parseImageUrl } from '../../utils/sanity';
import { useParams } from 'react-router';
import { Loading } from '@atoms/common/loading';
import { useQuery } from '@tanstack/react-query';
const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const {
    data: data,
    error: eventDetailsError,
    isLoading: eventDetailsLoading,
  } = useQuery({
    queryKey: ['events-details-page'],
    queryFn: () => getEntryDataById(blogId), // Handle undefined 'country'
  });
  if (eventDetailsLoading) {
    return _jsx(Loading, {});
  }
  if (eventDetailsError) {
    return 'Error Occured';
  }
  return _jsxs('div', {
    className: 'flex flex-col gap-6 m-auto max-w-4xl px-10 md:px-0',
    children: [
      _jsx('h1', { className: 'text-4xl my-4 font-semibold capitalize', children: data.title }),
      _jsx('img', {
        className: 'h-[50vh] w-full object-contain rounded-md',
        src: sanityImageUrlBuilder(data.image).url(),
      }),
      _jsx(PortableText, {
        value: data.content,
        components: {
          types: {
            image: ({ value }) => _jsx('img', { src: parseImageUrl(value.asset._ref), alt: value.alt || 'Blog Image' }),
          },
          marks: {
            link: ({ children, value }) =>
              _jsx('a', { href: value.href, target: '_blank', rel: 'noopener noreferrer', children: children }),
          },
        },
      }),
    ],
  });
};
export default BlogDetailsPage;
