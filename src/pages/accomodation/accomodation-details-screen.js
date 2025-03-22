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
import { priceRangeOptions } from '@/data/amanitieConfig';
import SectionTitle from './SectionTitle';
import { sanityImageUrlBuilder } from '@api/index';
import { getAmenitiesConfig, getAccommodationLabel, getAccommodationRoomType } from '@/data/amanitieConfig';
const AccomodationDetailsScreen = ({
  reviews,
  hostel,
  onSubmit,
  control,
  isSubmitting,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { getValues } = useForm();
  if (!hostel) return _jsx(_Fragment, { children: 'Data not received yet' });
  const [openSections, setOpenSections] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [allImage, setAllImage] = useState([]);
  const keyType = getAmenitiesConfig(hostel?.accommodation_type);
  const accomodationLabel = getAccommodationLabel(hostel?.accommodation_type);
  const accomodationRoomKey = getAccommodationRoomType(hostel?.accommodation_type);
  const amenitiesData = hostel?.[keyType];
  const roomBathRoomData = hostel?.[accomodationRoomKey];
  const toggleExpanded = () => setExpanded(!expanded);
  const selectedPriceRange =
    Object.keys(hostel.priceRange)
      .filter((key) => hostel.priceRange[key]) // Get selected price range keys
      .map((key) => {
        const options = priceRangeOptions[hostel.accommodation_type] || [];
        const selectedOption = options.find((option) => option.key === key);
        return selectedOption ? selectedOption.label : null;
      })
      .filter(Boolean)
      .join(', ') || 'N/A';
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
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
  console.log('---- final data', accomodationRoomKey, accomodationLabel, keyType, amenitiesData, hostel);
  // const hostel = {
  //   id: '17347128981391246',
  //   name: 'Seaside Hostel',
  //   type: 'Boutique - LGBTQ',
  //   priceRange: 'Mid-Range – Between $20 - $50 Per Night',
  //   address: '16 Lumley Road, Aberdeen, Sierra Leone',
  //   phone: '+223 777 7777',
  //   rating: 3.5,
  //   reviews: 120,
  //   description: {
  //     tagline: 'The place where a better world Begins!',
  //     description:
  //       "Located 7 minutes' walk from Central Park, this Manhattan hotel features an on-site fitness centre and rooms with city views. Times Square is just 1 km away.",
  //     highlights: [
  //       'Best Co-working Space in Sierra Leone',
  //       'Fastest Internet Speed',
  //       'Multi-lingual staff',
  //       'Near to the best surf beach',
  //       'Family owned',
  //     ],
  //   },
  //   amenities: {
  //     generalAmenities: {
  //       frontDesk24h: true,
  //       cctvCameras: true,
  //       security24h: true,
  //       freeWiFi: true,
  //       freeParking: true,
  //       paidParking: true,
  //       valetParking: true,
  //       luggageStorage: true,
  //       laundryService: true,
  //       airportShuttleService: true,
  //       airConditioning: true,
  //       roomService: true,
  //       breakfastIncluded: true,
  //       breakfastAvailableForPurchase: true,
  //       salahRoom: true,
  //       wheelchairAccessibleFacilities: true,
  //     },
  //     recreational: {
  //       outdoorSwimmingPool: true,
  //       indoorSwimmingPool: true,
  //       fitnessCenterGym: true,
  //       spaServices: true,
  //       kidsClub: true,
  //       kidsPlayArea: true,
  //       tennisCourt: true,
  //       golfCourse: true,
  //       culturalEvents: true,
  //     },
  //     workConnectivity: {
  //       highSpeedWiFi: true,
  //       businessCenter: true,
  //       coWorkingSpaces: true,
  //       printingScanningServices: true,
  //       powerOutletsUSBPorts: true,
  //       networkingOpportunities: true,
  //       translators: true,
  //     },
  //   },
  //   images: [
  //     'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  //     'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  //     'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
  //   ],
  //   languages: {
  //     english: true,
  //     french: true,
  //     arabic: true,
  //     portuguese: true,
  //     german: true,
  //   },
  //   policy: {
  //     checkInTime: '2 pm',
  //     checkOutTime: '12 noon',
  //     cancellation: {
  //       freeCancellation: true,
  //       nonRefundable: true,
  //     },
  //     rules: 'Visitors are not allowed in rooms, Quiet hours between midnight – 7 am',
  //   },
  //   distanceToKeyLocations: {
  //     nearestAirport: 'Freetown International Airport, 70 km away',
  //     taxiStands: '2 minutes walk away',
  //     cityCenter: 'Freetown, 12 km away',
  //     localMarkets: 'Wilkinson Road, 5 km away',
  //     popularRestaurants: 'Lumley Road, 10 mins walking distance',
  //   },
  //   operatingSeason: {
  //     isYearRound: true,
  //     lowSeason: 'June - October',
  //     highSeason: 'November - May',
  //   },
  //   paymentMethods: {
  //     acceptedCards: {
  //       visa: true,
  //       mastercard: true,
  //       amex: true,
  //       discover: false,
  //       jcb: false,
  //     },
  //     cash: true,
  //     onlinePayment: true,
  //   },
  //   nearbyAttractions: [
  //     {
  //       name: 'Tacugama Chimpanzee Rehabilitation center',
  //       distance: '7 km away',
  //       type: 'Nature Reserve',
  //     },
  //     {
  //       name: 'Beach',
  //       description: 'Across the road',
  //       type: 'Beach',
  //     },
  //     {
  //       name: 'Trekking Trail - Guma Valley',
  //       distance: '15 km',
  //       type: 'Outdoor Activity',
  //     },
  //   ],
  //   rooms: {
  //     totalBeds: 40,
  //     dormitoryRooms: 20,
  //     sharedBathrooms: 4,
  //     privateRooms: 6,
  //     amenities: {
  //       airConditioning: true,
  //       privateBalcony: true,
  //       ensuiteBathroom: true,
  //       minibar: true,
  //       tv: true,
  //       wifi: true,
  //       workDesk: true,
  //     },
  //   },
  // };
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
            _jsx('div', {
              className: 'w-64 bg-white border-r-4 border-orange-400 min-h-screen',
              children: _jsxs('div', {
                className: 'divide-y mt-5',
                children: [
                  amenitiesData?.generalAmenities &&
                    _jsx(CollapsibleSection, {
                      area: 'generalAmenities',
                      title: 'General Amenities & Facilities',
                      items: amenitiesData?.generalAmenities,
                    }),
                  amenitiesData?.recreational &&
                    _jsx(CollapsibleSection, {
                      area: 'recreational',
                      title: 'Recreational Facilities',
                      items: amenitiesData?.recreational,
                    }),
                  amenitiesData?.workConnectivity &&
                    _jsx(CollapsibleSection, {
                      area: 'workConnectivity',
                      title: 'Work & Connectivity Features',
                      items: amenitiesData?.workConnectivity,
                    }),
                  amenitiesData?.barDining &&
                    _jsx(CollapsibleSection, {
                      area: 'barDining',
                      title: 'Bar & Dining Options',
                      items: amenitiesData?.barDining,
                    }),
                  amenitiesData?.ecoFriendlyPractices &&
                    _jsx(CollapsibleSection, {
                      area: 'ecoFriendlyPractices',
                      title: 'Eco-Friendly Practices',
                      items: amenitiesData?.ecoFriendlyPractices,
                    }),
                  amenitiesData?.eventServices &&
                    _jsx(CollapsibleSection, {
                      area: 'eventServices',
                      title: 'Event Services Offered',
                      items: amenitiesData?.eventServices,
                    }),
                  amenitiesData?.meetingRooms &&
                    _jsx(CollapsibleSection, {
                      area: 'meetingRooms',
                      title: 'Meeting Conference Hall',
                      items: amenitiesData?.meetingRooms,
                    }),
                  amenitiesData?.specialMenus &&
                    _jsx(CollapsibleSection, {
                      area: 'specialMenus',
                      title: 'Special Menus Available',
                      items: amenitiesData?.specialMenus,
                    }),
                  amenitiesData?.travelAdventureSupport &&
                    _jsx(CollapsibleSection, {
                      area: 'travelAdventureSupport',
                      title: 'Travel & Adventure Support',
                      items: amenitiesData?.travelAdventureSupport,
                    }),
                  amenitiesData?.wellness &&
                    _jsx(CollapsibleSection, {
                      area: 'wellness',
                      title: 'Wellness Amenities',
                      items: amenitiesData?.wellness,
                    }),
                ],
              }),
            }),
            _jsxs('div', {
              className: 'flex-1 overflow-y-auto',
              children: [
                _jsxs('div', {
                  className: 'p-6 bg-white',
                  children: [
                    _jsxs('div', {
                      className: 'flex flex-col sm:flex-row justify-between items-start gap-2',
                      children: [
                        _jsx(SectionTitle, {
                          className: 'sm:flex-1 w-full',
                          children: _jsxs('div', {
                            className: 'inline-flex items-center gap-1',
                            children: [
                              _jsx('span', {
                                className:
                                  'text-lg sm:text-xl md:text-2xl font-bold max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg block truncate',
                                children: hostel.name,
                              }),
                              ' ',
                            ],
                          }),
                        }),
                        _jsxs('div', {
                          className: 'w-full sm:w-55 text-left sm:text-right',
                          children: [
                            _jsx('div', {
                              className: 'text-base font-medium text-gray-800 mt-1 space-y-1',
                              children: selectedPriceRange
                                .split(', ')
                                .slice(0, expanded ? selectedPriceRange.length : 1) // Show first 2 items if collapsed
                                .map((item, index) => _jsx('div', { children: item }, index)),
                            }),
                            selectedPriceRange.split(', ').length > 2 &&
                              _jsx('button', {
                                onClick: toggleExpanded,
                                className: 'text-blue-500 text-sm mt-1 hover:underline',
                                children: expanded ? 'View Less' : 'View More',
                              }),
                          ],
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'mt-1 flex items-center',
                      children: [
                        _jsx(MapPin, { size: 28, className: 'text-gray-500 mr-2 flex-shrink-0 mt-0.5' }),
                        _jsx('span', {
                          className: 'text-base font-medium text-gray-800',
                          children: formatAddress(hostel?.address),
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'mt-4 ml-1 flex flex-wrap items-center gap-4',
                      children: [
                        hostel?.contact?.website &&
                          _jsxs('a', {
                            href: hostel.contact.website,
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
                              children: hostel?.contact.phoneNumber,
                            }),
                          ],
                        }),
                        _jsxs('div', {
                          className: 'flex items-center',
                          children: [
                            _jsx(Mail, { size: 24, className: 'text-gray-500 mr-2' }),
                            _jsx('span', {
                              className: 'text-base font-medium text-gray-800',
                              children: hostel?.contact.email,
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
                _jsx(PhotoGallery, {
                  uploadedPhotoshotel: hostel?.uploadedPhotoshotel,
                  openImageModal: openImageModal,
                }),
                _jsx(HotelDescription, {
                  title: hostel?.description?.tagline,
                  description: hostel?.description?.description,
                  highlights: hostel?.description?.highlights,
                  languages: hostel?.languages,
                }),
                _jsx(OtherPolicyDetails, {
                  accomodationLabel: accomodationLabel,
                  nearbyAttractions: hostel?.nearbyAttraction,
                  operatingSeason: hostel?.operatingSeason,
                  policy: hostel?.policy,
                  paymentMethods: hostel?.paymentMethods,
                }),
                _jsx(LocationDetails, {
                  distanceToKeyLocations: hostel?.distanceToKeyLocations,
                  location: hostel?.location,
                }),
                _jsx(RoomBathroomDetails, { accomodationLabel: accomodationLabel, data: roomBathRoomData }),
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
export default AccomodationDetailsScreen;
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
const OtherPolicyDetails = ({ accomodationLabel, nearbyAttractions, operatingSeason, policy, paymentMethods }) => {
  return _jsx('div', {
    className: 'mt-6 p-4 bg-white',
    children: _jsxs('div', {
      className: 'grid grid-cols-2 gap-40',
      children: [
        _jsxs('div', {
          children: [
            _jsxs('h2', {
              className: 'text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1',
              children: [accomodationLabel, ' Policies'],
            }),
            _jsxs('div', {
              className: 'mt-3',
              children: [
                _jsxs('p', {
                  className: 'text-base font-semibold text-gray-800',
                  children: [
                    'Cancellation Policy:',
                    ' ',
                    _jsx('span', {
                      className: 'text-gray-600',
                      children: policy?.cancellation?.freeCancellation ? 'Free Cancellation' : 'Non-Refundable',
                    }),
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-4',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'House Rules:' }),
                    ' ',
                    policy?.rules,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-4',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Check-In Time:' }),
                    ' ',
                    policy?.checkInTime,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Check-Out Time:' }),
                    ' ',
                    policy?.checkOutTime,
                  ],
                }),
                _jsxs('div', {
                  className: 'mt-4',
                  children: [
                    _jsx('p', {
                      className: 'text-base font-semibold text-gray-800',
                      children: 'Payment Methods Accepted:',
                    }),
                    _jsx('div', {
                      className: 'mt-1 text-gray-800',
                      children: [
                        paymentMethods?.card && 'Credit/Debit Card',
                        paymentMethods?.cash && 'Cash on Arrival',
                        paymentMethods?.online && 'Online Payment',
                      ]
                        .filter(Boolean) // Removes undefined values
                        .join(', '),
                    }),
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
              children: 'Operating Season',
            }),
            _jsxs('div', {
              className: 'mt-3',
              children: [
                _jsxs('p', {
                  className: 'text-base font-semibold text-gray-800',
                  children: [
                    'Open Year-Round:',
                    ' ',
                    _jsx('span', {
                      className: operatingSeason?.isYearRound ? 'text-green-600' : 'text-red-500',
                      children: operatingSeason?.isYearRound ? 'Yes' : 'No',
                    }),
                  ],
                }),
                !operatingSeason?.isYearRound &&
                  _jsxs('p', {
                    className: 'text-base text-gray-800',
                    children: ['Seasonal Months: ', operatingSeason?.seasonalMonths],
                  }),
                _jsxs('p', {
                  className: 'text-base text-gray-800 mt-1',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'High Season Months:' }),
                    ' ',
                    operatingSeason?.highSeason,
                  ],
                }),
                _jsxs('p', {
                  className: 'text-base text-gray-800',
                  children: [
                    _jsx('span', { className: 'font-semibold', children: 'Low Season Months:' }),
                    ' ',
                    operatingSeason?.lowSeason,
                  ],
                }),
              ],
            }),
            _jsxs('div', {
              className: 'mt-6',
              children: [
                _jsx('h2', {
                  className: 'text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1',
                  children: 'Nearby Attractions',
                }),
                _jsx('div', {
                  className: 'mt-3',
                  children: nearbyAttractions?.map((attraction) =>
                    _jsxs(
                      'div',
                      {
                        className: 'mb-3',
                        children: [
                          _jsx('p', { className: 'text-sm font-semibold text-gray-800', children: attraction.name }),
                          _jsxs('p', {
                            className: 'text-sm text-gray-600',
                            children: ['Distance: ', attraction.distance, ' km away'],
                          }),
                          _jsxs('div', {
                            className: 'flex flex-wrap mt-1',
                            children: [
                              attraction.beach && _jsx('span', { className: 'badge', children: 'Beach' }),
                              attraction.bikingTrails &&
                                _jsx('span', { className: 'badge', children: 'Biking Trails' }),
                              attraction.desert && _jsx('span', { className: 'badge', children: 'Desert' }),
                              attraction.hikingTrails &&
                                _jsx('span', { className: 'badge', children: 'Hiking Trails' }),
                              attraction.kayakingCanoeing &&
                                _jsx('span', { className: 'badge', children: 'Kayaking & Canoeing' }),
                              attraction.lake && _jsx('span', { className: 'badge', children: 'Lake' }),
                              attraction.parkReserve && _jsx('span', { className: 'badge', children: 'Park/Reserve' }),
                              attraction.river && _jsx('span', { className: 'badge', children: 'River' }),
                            ],
                          }),
                        ],
                      },
                      attraction._key
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
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
const HotelDescription = ({ title, description, highlights, languages }) => {
  return _jsxs('div', {
    className: 'mx-auto p-4 m-20',
    children: [
      _jsx('h2', { className: 'text-xl sm:text-2xl font-bold text-gray-900 mb-2', children: title }),
      _jsx('div', { className: 'border-t-4 border-orange-400 mb-6' }),
      _jsx('p', { className: 'text-gray-700 text-xs sm:text-sm leading-relaxed mt-4', children: description }),
      _jsx('div', {
        className: 'mt-4',
        children: highlights?.map((highlight, index) =>
          _jsxs('p', { className: 'text-black font-semibold text-base sm:text-lg', children: ['* ', highlight] }, index)
        ),
      }),
      _jsxs('p', {
        className: 'mt-4 text-gray-700 text-base sm:text-lg',
        children: [
          _jsx('span', { className: 'font-semibold', children: 'Languages Spoken by Staff \u2013' }),
          ' ',
          formatLanguages(languages),
          ' ',
        ],
      }),
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
const CollapsibleSection = ({ area, title, items }) => {
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
        items &&
        _jsx('div', {
          className: 'bg-gray-50 px-3 py-2',
          children: Object.entries(items).map(([key, value]) =>
            _jsxs(
              'div',
              {
                className: 'py-1.5 px-2 text-sm text-gray-600',
                children: [
                  _jsx('span', {
                    className: 'font-medium',
                    children: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
                  }),
                  area === 'meetingRooms' &&
                    value &&
                    _jsxs(_Fragment, {
                      children: [': ', _jsx('span', { className: 'text-gray-700', children: value })],
                    }),
                ],
              },
              key
            )
          ),
        }),
    ],
  });
};
