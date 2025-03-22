import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import TribeAfricaPagesCard from '@/atoms/card/tribe-africa-pages-card';
import DualHeading from '@/atoms/heading/dual-heading';
import { useNavigate, useParams } from 'react-router';
import { fromKebabCase, toKebabCase } from '@/utils/common';
import { sanityImageUrlBuilder } from '@/api';
const FindABusinessScreen = ({ data, mainCategory, subCategory }) => {
  const { country } = useParams();
  const navigation = useNavigate();
  return _jsxs('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: [
      _jsx(DualHeading, {
        children: `${fromKebabCase(mainCategory)}${subCategory ? ` - ${fromKebabCase(subCategory)}` : ''}`,
      }),
      data?.map((eachBusinessType) => {
        const imageUrl = sanityImageUrlBuilder(eachBusinessType.image).url();
        return _jsx(
          TribeAfricaPagesCard,
          {
            onClick: () => {
              if (subCategory) {
                navigation(
                  `/${country}/business/find-a-business/details/${toKebabCase(mainCategory)}/${toKebabCase(subCategory)}/${eachBusinessType._id}`
                );
              } else {
                navigation(`/${country}/business/find-a-business/details/${toKebabCase(mainCategory)}/1`);
              }
            },
            image: imageUrl,
            content: _jsxs('div', {
              children: [
                _jsxs('p', {
                  className: 'm-4',
                  children: [_jsx('strong', { children: 'Business Name : ' }), ' ', eachBusinessType.businessName],
                }),
                _jsxs('p', {
                  className: 'm-4',
                  children: [
                    _jsx('strong', { children: 'Location : ' }),
                    ' ',
                    `${eachBusinessType.address.town}, ${eachBusinessType.address.state}, ${eachBusinessType.address.country}`,
                  ],
                }),
              ],
            }),
            footer: _jsxs('div', {
              children: [
                _jsxs('p', { children: ['+', eachBusinessType.businessContactInformation.phoneNumber] }),
                _jsx('p', { children: eachBusinessType.businessContactInformation.email }),
                _jsx('p', { children: eachBusinessType.businessContactInformation.website }),
              ],
            }),
          },
          eachBusinessType._id
        );
      }),
    ],
  });
};
export default FindABusinessScreen;
