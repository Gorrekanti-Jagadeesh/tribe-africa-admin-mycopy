import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useNavigate } from 'react-router';
import { sanityImageUrlBuilder } from '@api/index';
const BlogCard = ({ data }) => {
  const navigate = useNavigate();
  const backgroundImageUrl =
    typeof data?.image === 'string' ? data?.image : sanityImageUrlBuilder(data?.image?.asset?._ref)?.url();
  return _jsxs('div', {
    className: 'w-full relative grid gap-2',
    children: [
      _jsx('div', {
        className: 'aspect-square bg-cover bg-center rounded-md relative',
        style: {
          backgroundImage: `url(${backgroundImageUrl})`,
        },
      }),
      _jsx('p', { className: 'text-nowrap truncate', children: data.title }),
      _jsx('button', {
        className: 'bg-gray-300 p-2 px-6 rounded-lg text-sm m-auto',
        onClick: () => navigate(data._id),
        children: 'Know more',
      }),
    ],
  });
};
export default BlogCard;
