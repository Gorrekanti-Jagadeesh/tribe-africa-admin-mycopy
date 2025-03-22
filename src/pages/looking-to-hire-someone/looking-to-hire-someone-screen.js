import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from '@atoms/dropdown/dropdown-search';
import Button from '@atoms/custom-button/button';
import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import IconsCard from '@atoms/card/icons-card';
import locationPin from '@assets/icons/location.svg';
import search from '@assets/icons/search.svg';
import { useState } from 'react';
import { toKebabCase, truncateText } from '@utils/common';
import { sanityImageUrlBuilder } from '@api/index';
const LookingToHireSomeoneScreen = ({ proffesionalData, proffesionalOptions, professions }) => {
  const [data, setData] = useState(proffesionalData);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const { country } = useParams();
  function filterByDepartment(department) {
    if (active != department) {
      setActive(department);
      setData(proffesionalData.filter((p) => p.proffession.toLowerCase() == department));
    }
  }
  return _jsxs('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: [
      _jsx('h1', { className: 'text-2xl font-bold', children: 'Looking to Hire Someone In Algeria' }),
      _jsxs('div', {
        className: 'flex m-auto w-2/3 border rounded-lg my-6',
        children: [
          _jsxs('div', {
            className: 'flex flex-grow',
            children: [
              _jsx(Dropdown, {
                icon: _jsx('img', { src: locationPin }),
                placeholderText: `State Name`,
                options: proffesionalOptions,
                searchable: true,
                action: () => {},
                buttonStyles: 'border-r-2 rounded-none p-2 text-left md:p-4',
              }),
              _jsx(Dropdown, {
                icon: _jsx('img', { src: search }),
                placeholderText: 'Actor',
                options: data.map((person) => {
                  return {
                    label: person.name,
                    value: person.name.toLowerCase(),
                  };
                }),
                searchable: true,
                action: () => {},
                buttonStyles: 'p-2 md:p-4',
              }),
            ],
          }),
          _jsx(Button, {
            className: `border rounded-r-md rounded-l-none px-4 text-white bg-orange-500 disabled:bg-slate-400`,
            children: 'Find',
          }),
        ],
      }),
      _jsx('div', {
        className: 'flex flex-wrap justify-center items-center',
        children: professions.map((item) =>
          _jsx('div', {
            className: `m-2 rounded-md p-2 ${active == item.value ? 'bg-blue-100' : ''}`,
            children: _jsx(IconsCard, { data: item, onClick: () => filterByDepartment(item.value) }),
          })
        ),
      }),
      _jsxs('div', {
        className: 'flex justify-between',
        children: [
          _jsx('p', { children: 'All' }),
          _jsx(Button, { className: '', children: 'Get Listed on Tribe Africa Pages' }),
        ],
      }),
      data.map((proffesional) =>
        _jsx(
          TribeAfricaPagesCard,
          {
            onClick: () =>
              navigate(`/${toKebabCase(country)}/business/details/looking-to-hire-someone/${proffesional._id}`, {
                state: proffesional,
              }),
            image: sanityImageUrlBuilder(proffesional.proffessionalImage).url(),
            content: _jsxs('div', {
              className: 'text-sm m-4',
              children: [
                _jsxs('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    _jsx('h1', { className: 'text-lg', children: _jsx('strong', { children: proffesional.name }) }),
                    _jsxs('p', { children: [' ', proffesional.role] }),
                  ],
                }),
                _jsx('p', { children: proffesional.experience }),
                _jsx('p', { children: truncateText(proffesional.description, 100) }),
                _jsx(Button, { className: 'bg-orange-500 text-white mt-4', children: 'View Reviews' }),
              ],
            }),
            footer: _jsxs('div', {
              className: 'text-sm',
              children: [
                _jsx('p', { children: _jsxs('strong', { children: ['+ ', proffesional.phoneNumber] }) }),
                _jsxs('p', { children: [' ', proffesional.region] }),
              ],
            }),
          },
          proffesional._id
        )
      ),
    ],
  });
};
export default LookingToHireSomeoneScreen;
