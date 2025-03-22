import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import {
  MapPin,
  Globe,
  Phone,
  Mail,
  Star,
  Facebook,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Edit,
  Search,
  MoreVertical,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import SectionTitle from './SectionTitle';
import { sanityImageUrlBuilder } from '@api/index';
const AfterWorkDetailsScreen = ({ reviews, hostel, onSubmit, control, isSubmitting, isModalOpen, setIsModalOpen }) => {
  const { getValues } = useForm();
  if (!hostel) return _jsx(_Fragment, { children: 'Data not received yet' });
  const [openSections, setOpenSections] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [allImage, setAllImage] = useState([]);
  // const toggleExpanded = () => setExpanded(!expanded);
  // const selectedPriceRange =
  //   Object.keys(hostel.priceRange)
  //     .filter((key) => hostel.priceRange[key]) // Get selected price range keys
  //     .map((key) => {
  //       const options = priceRangeOptions[hostel.accommodation_type] || [];
  //       const selectedOption = options.find((option) => option.key === key);
  //       return selectedOption ? selectedOption.label : null;
  //     })
  //     .filter(Boolean)
  //     .join(', ') || 'N/A';
  // const toggleSection = (section: string) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }));
  // };
  const openImageModal = (image, index, allImages) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setModalOpen(true);
    setAllImage(allImages);
    document.body.style.overflow = 'hidden';
  };
  const closeImageModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % allImage.length;
    setSelectedImage(allImage[newIndex]);
    setCurrentImageIndex(newIndex);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + allImage.length) % allImage.length;
    setSelectedImage(allImage[newIndex]);
    setCurrentImageIndex(newIndex);
  };
  const formatAddress = (address) => {
    if (!address) return 'Address not available';
    return [address.street, address.city, address.region, address.postalCode, address.country]
      .filter(Boolean) // Removes empty values
      .join(', ');
  };
  console.log('---- final data', hostel);
  return _jsxs('div', {
    className: 'min-h-screen',
    children: [
      _jsx('header', {
        className: 'bg-white shadow-sm',
        children: _jsxs('div', {
          className: 'flex items-center p-4',
          children: [
            _jsx('button', { className: 'mr-4', children: _jsx(ChevronLeft, { size: 24 }) }),
            _jsx('h1', { className: 'text-lg font-medium truncate flex-1', children: hostel._id }),
            _jsxs('div', {
              className: 'flex space-x-4',
              children: [
                _jsx('button', { children: _jsx(Edit, { size: 20 }) }),
                _jsx('button', { children: _jsx(Search, { size: 20 }) }),
                _jsx('button', { children: _jsx(MoreVertical, { size: 20 }) }),
              ],
            }),
          ],
        }),
      }),
      _jsx('main', {
        className: 'flex-1',
        children: _jsxs('div', {
          className: 'flex border-t border-gray-300 w-full',
          children: [
            _jsxs('div', {
              className: 'w-64 bg-white border-r-4 border-orange-400 min-h-screen',
              children: [
                _jsx('div', {
                  className: 'divide-y mt-5',
                  children:
                    hostel?.keyFeatures &&
                    _jsx(CollapsibleSection, { title: 'Key Features', items: hostel?.keyFeatures }),
                }),
                _jsx('div', {
                  className: 'divide-y mt-5',
                  children:
                    hostel?.cuisineType &&
                    _jsx(CollapsibleSection, { title: 'Cuisine Type', items: hostel?.cuisineType }),
                }),
              ],
            }),
            _jsxs('div', {
              className: 'flex-1 overflow-y-auto',
              children: [
                _jsxs('div', {
                  className: 'p-6 bg-white',
                  children: [
                    _jsx('div', {
                      className: 'flex flex-col sm:flex-row justify-between items-start gap-2',
                      children: _jsx(SectionTitle, {
                        className: 'sm:flex-1 w-full',
                        children: _jsxs('div', {
                          className: 'inline-flex items-center gap-1',
                          children: [
                            _jsx('span', {
                              className:
                                'text-lg sm:text-xl md:text-2xl font-bold max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg block truncate',
                              children: hostel?.businessDetails?.businessName,
                            }),
                            ' ',
                          ],
                        }),
                      }),
                    }),
                    _jsxs('div', {
                      className: 'mt-1 flex items-center',
                      children: [
                        _jsx(MapPin, { size: 28, className: 'text-gray-500 mr-2 flex-shrink-0 mt-0.5' }),
                        _jsx('span', {
                          className: 'text-base font-medium text-gray-800',
                          children: formatAddress(hostel?.businessDetails?.address),
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'mt-4 ml-1 flex flex-wrap items-center gap-4',
                      children: [
                        hostel?.businessContact?.website &&
                          _jsxs('a', {
                            href: hostel?.businessContact?.website,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'flex items-center text-blue-600 font-semibold',
                            children: [_jsx(Globe, { size: 24, className: 'mr-2' }), 'Visit Website'],
                          }),
                        _jsxs('div', {
                          className: 'flex items-center',
                          children: [
                            _jsx(Phone, { size: 24, className: 'text-gray-500 mr-2' }),
                            _jsx('span', {
                              className: 'text-base font-medium text-gray-800',
                              children: hostel?.businessContact?.phoneNumber,
                            }),
                          ],
                        }),
                        _jsxs('div', {
                          className: 'flex items-center',
                          children: [
                            _jsx(Mail, { size: 24, className: 'text-gray-500 mr-2' }),
                            _jsx('span', {
                              className: 'text-base font-medium text-gray-800',
                              children: hostel?.businessContact?.email,
                            }),
                          ],
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'mt-3 flex flex-wrap justify-between items-center gap-3',
                      children: [
                        _jsxs('div', {
                          className: 'flex items-center',
                          children: [
                            _jsx('div', {
                              className: 'flex',
                              children: [...Array(5)].map((_, i) =>
                                _jsx(
                                  Star,
                                  {
                                    size: 28,
                                    className: i < Math.floor(3) ? 'text-orange-400 fill-orange-400' : 'text-gray-300',
                                  },
                                  i
                                )
                              ),
                            }),
                            _jsxs('span', {
                              className: 'ml-2 text-base font-medium text-gray-800',
                              children: [hostel.reviews, ' 120 Reviews'],
                            }),
                            _jsxs('button', {
                              className: 'ml-4 text-sm font-medium text-gray-600 flex items-center',
                              children: [
                                _jsx(MessageCircle, { size: 22, className: 'mr-1' }),
                                _jsx('span', {
                                  className: 'ml-0 text-base font-medium text-gray-800',
                                  children: ' Write a review ',
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsxs('div', {
                          className: 'flex space-x-2',
                          children: [
                            _jsx('button', {
                              className: 'p-2 bg-blue-600 rounded-full text-white',
                              children: _jsx(Facebook, { size: 20 }),
                            }),
                            _jsx('button', {
                              className: 'p-2 bg-green-500 rounded-full text-white',
                              children: _jsx(MessageCircle, { size: 20 }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                _jsx(PhotoGallery, { uploadedPhotoshotel: hostel?.businessPhotos, openImageModal: openImageModal }),
                _jsx(HotelDescription, { title: 'Full Description', description: hostel?.fullDescription }),
                _jsx(HotelDescription, {
                  title: 'Menu Services and Atmosphere Highlights',
                  description: hostel?.menuServicesAtmosphereHighlights,
                }),
                _jsx(SeatingInfo, {
                  indoorSeatingCapacity: hostel?.indoorSeatingCapacity,
                  outdoorSeatingCapacity: hostel?.outdoorSeatingCapacity,
                }),
                _jsx(OperatingHours, { operatingHours: hostel?.operatingHours }),
                _jsx(OwnerContactDetails, { ownerContactDetails: hostel?.ownerContactDetails }),
              ],
            }),
          ],
        }),
      }),
      modalOpen &&
        _jsxs('div', {
          className: 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center',
          onClick: closeImageModal,
          children: [
            _jsx('button', {
              className: 'absolute top-4 right-4 text-white p-2',
              onClick: closeImageModal,
              children: _jsx(X, { size: 24 }),
            }),
            _jsx('button', {
              className: 'absolute left-4 text-white p-2',
              onClick: prevImage,
              children: _jsx(ChevronLeft, { size: 24 }),
            }),
            _jsx('img', {
              src: selectedImage,
              alt: 'Hostel',
              className: 'max-h-[80vh] max-w-[90vw] object-contain',
              onClick: (e) => e.stopPropagation(),
            }),
            _jsx('button', {
              className: 'absolute right-4 text-white p-2',
              onClick: nextImage,
              children: _jsx(ChevronRight, { size: 24 }),
            }),
            _jsx('div', {
              className: 'absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white',
              children: currentImageIndex + 1,
            }),
          ],
        }),
    ],
  });
};
export default AfterWorkDetailsScreen;
const LocationDetails = ({ distanceToKeyLocations, location }) => {
  const mapUrl = `https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&output=embed`;
  return _jsx('div', {
    className: 'mt-6 p-4 bg-white',
    children: _jsxs('div', {
      className: 'grid grid-cols-1 md:grid-cols-2 gap-40',
      children: [
        _jsxs('div', {
          children: [
            _jsx('h2', {
              className: 'text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1',
              children: 'Distance to Key Locations',
            }),
            _jsxs('div', {
              className: 'mt-3',
              children: [
                _jsxs('p', {
                  className: 'text-base text-gray-800',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Nearest Airport:' }),
                    ' ',
                    distanceToKeyLocations?.nearestAirport,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-2',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Taxi Stands:' }),
                    ' ',
                    distanceToKeyLocations?.taxiStands,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-2',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'City/Town Center:' }),
                    ' ',
                    distanceToKeyLocations?.cityCenter,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-2',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Local Markets/Shopping Areas:' }),
                    ' ',
                    distanceToKeyLocations?.localMarkets,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-2',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Popular Restaurants/Bars:' }),
                    ' ',
                    distanceToKeyLocations?.popularRestaurants,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-2',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Train/Bus Station:' }),
                    ' ',
                    distanceToKeyLocations?.trainBusStation,
                  ],
                }),
              ],
            }),
          ],
        }),
        _jsxs('div', {
          children: [
            _jsx('h2', {
              className: 'text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1',
              children: 'Map Location',
            }),
            _jsx('div', {
              className: 'mt-3',
              children: _jsx('iframe', {
                src: mapUrl,
                className: 'w-full h-60 rounded-lg shadow-md',
                allowFullScreen: true,
                loading: 'lazy',
              }),
            }),
          ],
        }),
      ],
    }),
  });
};
const RoomBathroomDetails = ({ accomodationLabel, data }) => {
  const toTitleCase = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Convert first letter to uppercase
  };
  const formatBooleanFields = (fields) => {
    return Object.entries(fields || {})
      .filter(([_, value]) => value === true)
      .map(([key]) => toTitleCase(key))
      .join(', ');
  };
  const formatTextFields = (fields, excludedKeys = []) => {
    return Object.entries(fields || {})
      .filter(([key, value]) => value && typeof value !== 'object' && !excludedKeys.includes(key))
      .map(([key, value]) => ({
        key: toTitleCase(key),
        value: value,
      }));
  };
  const formatObjectFields = (fields) => {
    return Object.entries(fields || {})
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          const booleanFields = formatBooleanFields(value);
          if (booleanFields) {
            return {
              key: toTitleCase(key),
              value: booleanFields,
            };
          }
        }
        return null;
      })
      .filter(Boolean);
  };
  // Combine text and object fields into one array
  const allFields = [...formatTextFields(data), ...formatObjectFields(data)];
  return _jsxs('div', {
    className: 'p-4 mt-4 bg-white shadow rounded-lg',
    children: [
      _jsxs('h2', {
        className: 'text-2xl font-bold flex items-center border-b-4 border-orange-400 pb-2',
        children: [accomodationLabel, ' Room & Bathroom Details'],
      }),
      _jsx('div', {
        className: 'grid grid-cols-2 gap-0 mt-4',
        children: allFields.map(({ key, value }) =>
          _jsxs(
            'div',
            {
              className: 'flex-start',
              children: [
                _jsxs('span', { className: 'font-bold', children: [key + '  ', ':'] }),
                _jsx('span', { className: 'font-normal', children: '  ' + value }),
              ],
            },
            key
          )
        ),
      }),
    ],
  });
};
const OwnerContactDetails = ({ ownerContactDetails }) => {
  return _jsxs('div', {
    className: 'p-4 mt-0 bg-white shadow rounded-lg w-96',
    children: [
      _jsx('h2', {
        className: 'text-lg font-bold text-gray-900 border-b-4 border-orange-400 pb-1',
        children: 'Owner Contact Details',
      }),
      _jsxs('div', {
        className: 'mt-3',
        children: [
          _jsxs('p', {
            className: 'text-gray-700',
            children: [_jsx('span', { className: 'font-semibold', children: 'Name:' }), ' ', ownerContactDetails.name],
          }),
          _jsxs('p', {
            className: 'text-gray-700',
            children: [_jsx('span', { className: 'font-semibold', children: 'Role:' }), ' ', ownerContactDetails.role],
          }),
          _jsxs('p', {
            className: 'text-gray-700',
            children: [
              _jsx('span', { className: 'font-semibold', children: 'Email:' }),
              ' ',
              ownerContactDetails.email,
            ],
          }),
          _jsxs('p', {
            className: 'text-gray-700',
            children: [
              _jsx('span', { className: 'font-semibold', children: 'Phone:' }),
              ' ',
              ownerContactDetails.phoneNumber,
            ],
          }),
          _jsxs('p', {
            className: 'text-gray-700',
            children: [
              _jsx('span', { className: 'font-semibold', children: 'Emergency Contact:' }),
              ' ',
              ownerContactDetails.emergencyContact,
            ],
          }),
          ownerContactDetails.ownerIdPhoto &&
            _jsxs('div', {
              className: 'mt-3',
              children: [
                _jsx('span', { className: 'font-semibold text-gray-700', children: 'Owner ID Photo:' }),
                _jsx('img', {
                  src: `https://cdn.sanity.io/images/yourProjectId/yourDataset/${ownerContactDetails.ownerIdPhoto.asset._ref.split('-')[1]}.${ownerContactDetails.ownerIdPhoto.asset._ref.split('-')[3]}`,
                  alt: 'Owner ID',
                  className: 'mt-2 w-full h-32 object-cover rounded-lg border',
                }),
              ],
            }),
        ],
      }),
    ],
  });
};
const OperatingHours = ({ operatingHours }) => {
  return _jsxs('div', {
    className: 'p-4 mt-0 bg-white shadow rounded-lg',
    children: [
      _jsx('h2', {
        className: 'text-lg font-bold text-gray-900 border-b-4 border-orange-400 pb-1',
        children: 'Operating Hours',
      }),
      _jsx('ul', {
        className: 'mt-2',
        children: Object.entries(operatingHours).map(([day, hours]) =>
          _jsxs(
            'li',
            {
              className: 'text-gray-700 capitalize',
              children: [
                _jsxs('span', { className: 'font-semibold mr-5', children: [day, ': '] }),
                hours.start,
                ' - ',
                hours.end,
              ],
            },
            day
          )
        ),
      }),
    ],
  });
};
const SeatingInfo = ({ indoorSeatingCapacity, outdoorSeatingCapacity }) => {
  return _jsxs('div', {
    className: 'p-4 mt-0 bg-white shadow rounded-lg',
    children: [
      _jsx('h2', {
        className: 'text-lg font-bold text-gray-900 border-b-4 border-orange-400 pb-1',
        children: 'Seating Capacity',
      }),
      _jsxs('p', {
        className: 'text-gray-800 mt-2 font-semibold',
        children: ['Indoor: ', '   ' + indoorSeatingCapacity],
      }),
      _jsxs('p', {
        className: 'text-gray-800 font-semibold',
        children: ['Outdoor : ', '    ' + outdoorSeatingCapacity],
      }),
    ],
  });
};
const formatLanguages = (languages) => {
  return Object.entries(languages)
    .filter(([key, value]) => value === true || (key === 'other' && value))
    .map(([key, value]) => (key === 'other' ? value : key.charAt(0).toUpperCase() + key.slice(1)))
    .join(', ');
};
// Tailwind Badge Style
// Tailwind Badge Style
const badgeStyle = 'bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1';
const HotelDescription = ({ title, description }) => {
  return _jsxs('div', {
    className: 'mx-auto p-4 m-10',
    children: [
      _jsx('h2', { className: 'text-xl sm:text-2xl font-bold text-gray-900 mb-2', children: title }),
      _jsx('div', { className: 'border-t-4 border-orange-400 mb-6' }),
      _jsx('p', { className: 'text-gray-700 text-xs sm:text-sm leading-relaxed mt-4', children: description }),
    ],
  });
};
const PhotoGallery = ({ uploadedPhotoshotel, openImageModal }) => {
  // Gather all images dynamically
  // console.log('uploadedPhotoshotel:', uploadedPhotoshotel);
  const allImages = Object.values(uploadedPhotoshotel || {})
    .flat() // Flatten arrays
    .map((photo) => {
      return sanityImageUrlBuilder(photo).url();
    }) // Convert Sanity ref to URL
    .filter(Boolean); // Remove undefined/null values
  // If no images, return null
  if (!allImages.length) return null;
  return _jsxs('div', {
    className: 'relative mx-4 md:mx-6',
    children: [
      _jsxs('div', {
        className: 'grid grid-cols-2 gap-1',
        children: [
          _jsx('div', {
            className: 'cursor-pointer',
            onClick: () => openImageModal(allImages[0], 0, allImages),
            children: _jsx('img', {
              src: allImages[0],
              alt: 'Hostel',
              className: 'w-full h-[500px] object-cover rounded-md',
            }),
          }),
          _jsx('div', {
            className: 'grid grid-rows-2 gap-1',
            children: allImages
              .slice(1, 3)
              .map((image, index) =>
                _jsx(
                  'div',
                  {
                    className: 'cursor-pointer',
                    children: _jsx('img', {
                      src: image,
                      alt: 'Hostel',
                      className: 'w-full h-[250px] object-cover rounded-md',
                    }),
                  },
                  index
                )
              ),
          }),
        ],
      }),
      allImages.length > 3 &&
        _jsxs('div', {
          className:
            'absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded cursor-pointer',
          onClick: () => openImageModal(allImages[0], 0),
          children: ['+', allImages.length - 3, ' photos'],
        }),
      _jsxs('div', {
        className: 'absolute bottom-2 left-2 bg-white bg-opacity-70 text-black text-xs px-2 py-1 rounded',
        children: ['1/', allImages.length],
      }),
    ],
  });
};
const CollapsibleSection = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return _jsxs('div', {
    children: [
      _jsxs('button', {
        className: 'w-full p-3 flex justify-between items-center hover:bg-gray-50',
        onClick: () => setIsOpen(!isOpen),
        children: [
          _jsx('span', { className: 'text-sm font-medium text-orange-400', children: title }),
          _jsx(ChevronDown, {
            size: 16,
            className: `text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`,
          }),
        ],
      }),
      isOpen &&
        _jsx('div', {
          className: 'bg-gray-50 px-3 py-2',
          children: Object.entries(items)
            .filter(([_, value]) => value === true) // Only include `true` values
            .map(([key]) =>
              _jsx(
                'div',
                {
                  className: 'py-1.5 px-2 text-sm text-gray-600',
                  children: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
                },
                key
              )
            ),
        }),
    ],
  });
};
