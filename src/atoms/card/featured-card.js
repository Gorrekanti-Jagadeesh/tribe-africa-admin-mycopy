import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const FeaturedCard = ({ title, redirectUrl, UrlPlaceholder }) => {
  return _jsx('div', {
    className: 'w-full inline-block',
    children: _jsx('div', {
      className: 'w-full aspect-square flex rounded-lg bg-black border-2 border-orange-500',
      children: _jsxs('div', {
        className: 'text-white text-left m-auto p-4',
        children: [
          _jsx('p', { className: 'text-3xl m-4', children: title }),
          _jsx('a', {
            className: 'underline p-4 font-light text-slate-200 cursor-pointer',
            href: redirectUrl,
            children: UrlPlaceholder,
          }),
        ],
      }),
    }),
  });
};
export default FeaturedCard;
