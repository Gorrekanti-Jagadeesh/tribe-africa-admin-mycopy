import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import algeriaMap from '@assets/algeria-map.png';
import serviceUrls from '@service-urls/index';
const geoUrl = serviceUrls.base.geological_data;
// Categories to filter markers
const categories = ['Cities', 'Action Enthusiasts', 'Nature', 'Historical & Cultural', 'Sacred Sites'];
const subCategories = {
  'Action Enthusiasts': ['Conquer the Sahara', 'Climb to New heights', 'Dive into History', 'Surf the waves'],
  Cities: [],
  Nature: ['Nature1', 'Nature2'],
  'Historical & Cultural': [],
  'Sacred Sites': [],
};
const MapChart = ({ country, data }) => {
  const { markers, center, scale } = data;
  const [selectedCategory, setSelectedCategory] = useState('Cities');
  const [selectedSubcategory, setSelectedSubcategory] = useState(subCategories['Cities'][0]);
  const navigate = useNavigate();
  // Filter markers based on selected category
  const filteredCategoryMarkers = markers.filter(
    (marker) => marker.category === selectedCategory && marker.subCategory === undefined
  );
  const filteredSubcategoryMarkers = markers.filter(
    (marker) => marker.subCategory !== undefined && marker.subCategory === selectedSubcategory
  );
  // Handle marker click to navigate to a details page
  const handleMarkerClick = (marker) => {
    navigate(`/details/${marker.name}`);
  };
  const renderCategoryMarkers = (cat) => {
    const entries = markers.filter((each) => each.category === cat);
    return entries.map((_entry, index) =>
      _jsx(
        'p',
        {
          className: 'ml-2',
          style: {
            fontWeight: 300,
            fontSize: 12,
            backgroundColor: '#fff',
            borderRadius: '50%',
            width: 13, // Circle diameter
            height: 13, // Circle diameter
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          children: index + 1,
        },
        index
      )
    );
  };
  const renderSubcategoryMarkers = (subCat) => {
    const entries = markers.filter((each) => each.subCategory === subCat);
    return entries.map((_entry, index) =>
      _jsx(
        'p',
        {
          className: 'ml-2',
          style: {
            fontWeight: 300,
            fontSize: 12,
            backgroundColor: '#fff',
            borderRadius: '50%',
            width: 13, // Circle diameter
            height: 13, // Circle diameter
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          children: index + 1,
        },
        index
      )
    );
  };
  return _jsxs('div', {
    className:
      'flex flex-col md:flex-row justify-center items-start my-12 gap-2 max-w-6xl m-auto p-2 md:p-4 animate-on-scroll',
    style: { backgroundColor: '#b34302' },
    children: [
      _jsx('div', { className: 'w-[2px] bg-white mx-4 hidden md:block', style: { height: 600 } }),
      _jsx('div', {
        className: 'flex flex-row min-w-64',
        children: _jsx('div', {
          className: 'flex flex-col justify-start items-start mt-14',
          children: categories.map((cat, index) =>
            _jsxs(
              'div',
              {
                children: [
                  _jsxs('div', {
                    className: 'flex items-center',
                    children: [
                      _jsx(
                        'p',
                        {
                          onClick: () => {
                            setSelectedCategory(cat);
                            setSelectedSubcategory(subCategories[cat][0]);
                          },
                          style: {
                            fontWeight: selectedCategory === cat ? '600' : '300',
                            color: '#fff',
                          },
                          children: _jsx('i', { children: _jsxs('u', { children: [' ', cat] }) }),
                        },
                        cat
                      ),
                      selectedCategory === cat &&
                        subCategories[cat].length === 0 &&
                        _jsx('div', { className: 'flex', children: renderCategoryMarkers(cat) }),
                    ],
                  }),
                  selectedCategory === cat &&
                    subCategories[selectedCategory].map((each, index) => {
                      return _jsxs(
                        'div',
                        {
                          className: 'flex items-center',
                          children: [
                            _jsx('p', {
                              className: 'ml-3',
                              style: {
                                color: '#fff',
                                fontWeight: 300,
                                fontSize: 15,
                              },
                              onClick: () => {
                                setSelectedSubcategory(each);
                              },
                              children: each,
                            }),
                            selectedSubcategory === each &&
                              subCategories[cat].length > 0 &&
                              _jsx('div', { className: 'flex', children: renderSubcategoryMarkers(each) }),
                          ],
                        },
                        index
                      );
                    }),
                ],
              },
              index
            )
          ),
        }),
      }),
      _jsx('img', { src: algeriaMap, width: 160 }),
      _jsx('div', {
        className: 'md:ml-10 w-full',
        children: _jsxs(ComposableMap, {
          projectionConfig: { scale: scale, center: center },
          style: { width: '100%', aspectRatio: '1/1', overflow: 'hidden' },
          children: [
            _jsx(Geographies, {
              geography: geoUrl,
              children: ({ geographies }) =>
                geographies.map((geo) => {
                  const isSelectedCountry = geo.properties.name.toLowerCase() === country.toLowerCase();
                  // fc813e or ff943f for main country
                  // b34302 or c35300for others
                  return _jsx(
                    Geography,
                    {
                      geography: geo,
                      style: {
                        default: {
                          fill: isSelectedCountry ? '#fc813e' : '#b34302',
                          outline: 'none',
                          stroke: '#fff',
                          strokeWidth: 2,
                        },
                        hover: {
                          fill: isSelectedCountry ? '#fc813e' : '#b34302',
                          outline: 'none',
                          stroke: '#fff',
                          strokeWidth: 2,
                        },
                        pressed: {
                          fill: isSelectedCountry ? '#fc813e' : '#b34302',
                          outline: 'none',
                          stroke: '#fff',
                          strokeWidth: 2,
                        },
                      },
                    },
                    geo.rsmKey
                  );
                }),
            }),
            filteredSubcategoryMarkers.map((marker, index) =>
              _jsx(_Fragment, {
                children: _jsxs(
                  Marker,
                  {
                    coordinates: marker.coordinates,
                    children: [
                      _jsx('circle', {
                        r: 6,
                        fill: '#fff',
                        stroke: '#fff',
                        strokeWidth: 2,
                        onClick: () => handleMarkerClick(marker),
                        style: { cursor: 'pointer' },
                      }),
                      _jsx('text', {
                        textAnchor: 'middle',
                        y: -10,
                        style: {
                          fontFamily: 'system-ui',
                          fill: '#fff',
                          textDecoration: 'underline',
                          fontStyle: 'italic',
                        },
                        children: marker.name,
                      }),
                      _jsx('foreignObject', {
                        x: 10,
                        y: 10,
                        width: 20,
                        height: 20,
                        children: _jsx(
                          'p',
                          {
                            style: {
                              fontWeight: 300,
                              fontSize: 13,
                              backgroundColor: '#fff',
                              borderRadius: '50%',
                              width: 20, // Circle diameter
                              height: 20, // Circle diameter
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                            children: index + 1,
                          },
                          index
                        ),
                      }),
                    ],
                  },
                  marker.name
                ),
              })
            ),
            filteredCategoryMarkers.map((marker, index) =>
              _jsx(_Fragment, {
                children: _jsxs(
                  Marker,
                  {
                    coordinates: marker.coordinates,
                    children: [
                      _jsx('circle', {
                        r: 6,
                        fill: '#fff',
                        stroke: '#fff',
                        strokeWidth: 2,
                        onClick: () => handleMarkerClick(marker),
                        style: { cursor: 'pointer' },
                      }),
                      _jsx('text', {
                        textAnchor: 'middle',
                        y: -10,
                        style: {
                          fontFamily: 'system-ui',
                          fill: '#fff',
                          textDecoration: 'underline',
                          fontStyle: 'italic',
                        },
                        children: marker.name,
                      }),
                      _jsx('foreignObject', {
                        x: 10,
                        y: 10,
                        width: 20,
                        height: 20,
                        children: _jsx(
                          'p',
                          {
                            style: {
                              fontWeight: 300,
                              fontSize: 13,
                              backgroundColor: '#fff',
                              borderRadius: '50%',
                              width: 20, // Circle diameter
                              height: 20, // Circle diameter
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                            children: index + 1,
                          },
                          index
                        ),
                      }),
                    ],
                  },
                  marker.name
                ),
              })
            ),
          ],
        }),
      }),
    ],
  });
};
export default MapChart;
