import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import DualHeading from '@atoms/heading/dual-heading';
import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import { sanityImageUrlBuilder } from '@api/index';
const TribeAfricaPagesScreen = ({ data, category }) => {
  return _jsxs('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: [
      _jsx(DualHeading, { children: category }),
      data?.map((eachItem) => {
        const imageUrl = sanityImageUrlBuilder(eachItem.image);
        return _jsx(
          TribeAfricaPagesCard,
          // onClick={() => navigate(`/tribe-africa-pages/${category}/${eachItem.id}`, { state: eachItem })}
          {
            // image={ministerImage}
            image: `${imageUrl}`,
            content: _jsxs('div', {
              children: [
                _jsxs('p', {
                  className: 'm-4',
                  children: [
                    _jsxs('strong', { children: [eachItem.department.departmentType, ' : '] }),
                    ' ',
                    eachItem.department.department,
                  ],
                }),
                _jsxs('p', {
                  className: 'm-4',
                  children: [_jsx('strong', { children: 'Location : ' }), ' ', eachItem.location],
                }),
              ],
            }),
            footer: _jsxs('div', {
              children: [
                _jsxs('p', { children: ['+ ', eachItem.phone] }),
                _jsx('p', { children: 'Website: www.el-mouridia.dz' }),
                _jsx('p', { children: 'info@el-mouridia.dz' }),
              ],
            }),
          },
          eachItem.id
        );
      }),
    ],
  });
};
export default TribeAfricaPagesScreen;
