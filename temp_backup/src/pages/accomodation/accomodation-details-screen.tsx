import React, { FC, useState } from 'react';
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
import { Control, FieldValues } from 'react-hook-form';
import { priceRangeOptions } from '@/data/amanitieConfig';
import SectionTitle from './SectionTitle';
import { sanityImageUrlBuilder } from '@api/index';
import { getAmenitiesConfig, getAccommodationLabel, getAccommodationRoomType } from '@/data/amanitieConfig';

// Define missing types
interface ReviewProps {
  id: string;
  // Add other properties as needed
}

interface accomodationProps {
  _id: string;
  name: string;
  images: any;
  title?: string;
  amount?: string;
  reviews?: any;
  priceRange?: Record<string, boolean>;
  accommodation_type?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  };
  contact?: {
    phoneNumber?: string;
    email?: string;
    website?: string;
  };
  description?: {
    tagline?: string;
    description?: string;
    highlights?: string[];
  };
  languages?: Record<string, boolean>;
  businessDetails?: {
    businessName?: string;
    address?: {
      street?: string;
      city?: string;
      region?: string;
      country?: string;
      postalCode?: string;
    };
  };
  businessContact?: {
    phoneNumber?: string;
    email?: string;
    website?: string;
  };
  keyFeatures?: Record<string, boolean>;
  cuisineType?: Record<string, boolean>;
  indoorSeatingCapacity?: string;
  outdoorSeatingCapacity?: string;
  fullDescription?: string;
  menuServicesAtmosphereHighlights?: string;
  businessPhotos?: any;
  operatingHours?: Record<string, { start: string; end: string }>;
  ownerContactDetails?: {
    name?: string;
    role?: string;
    email?: string;
    phoneNumber?: string;
    emergencyContact?: string;
    ownerIdPhoto?: any;
  };
  distanceToKeyLocations?: any;
  location?: any;
  nearbyAttraction?: any[];
  operatingSeason?: any;
  policy?: any;
  paymentMethods?: any;
  rooms?: any;
  uploadedPhotoshotel?: any;
}

interface AccomodationDetailsScreenProps {
  reviews: ReviewProps[];
  data: accomodationProps;
  hostel: accomodationProps;
  onSubmit: (values: FieldValues) => void;
  control: Control;
  isSubmitting: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AccomodationDetailsScreen: FC<AccomodationDetailsScreenProps> = ({
  // reviews,
  hostel,
  // onSubmit,
  // control,
  // isSubmitting,
  // isModalOpen,
  // setIsModalOpen,
}) => {
  // const { getValues } = useForm();

  if (!hostel) return <>Data not received yet</>;
  // const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
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

  // const toggleSection = (section: string) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }));
  // };

  const openImageModal = (image: string, index: number, allImages: []) => {
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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % allImage.length;
    setSelectedImage(allImage[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + allImage.length) % allImage.length;
    setSelectedImage(allImage[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const formatAddress = (address: {
    street?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  }) => {
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

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="flex items-center p-4">
          <button className="mr-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-medium truncate flex-1">{hostel._id}</h1>
          <div className="flex space-x-4">
            <button>
              <Edit size={20} />
            </button>
            <button>
              <Search size={20} />
            </button>
            <button>
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="flex border-t border-gray-300 w-full">
          <div className="w-64 bg-white border-r-4 border-orange-400 min-h-screen">
            <div className="divide-y mt-5">
              {amenitiesData?.generalAmenities && (
                <CollapsibleSection
                  area={'generalAmenities'}
                  title="General Amenities & Facilities"
                  items={amenitiesData?.generalAmenities}
                />
              )}
              {amenitiesData?.recreational && (
                <CollapsibleSection
                  area={'recreational'}
                  title="Recreational Facilities"
                  items={amenitiesData?.recreational}
                />
              )}

              {amenitiesData?.workConnectivity && (
                <CollapsibleSection
                  area={'workConnectivity'}
                  title="Work & Connectivity Features"
                  items={amenitiesData?.workConnectivity}
                />
              )}
              {amenitiesData?.barDining && (
                <CollapsibleSection area={'barDining'} title="Bar & Dining Options" items={amenitiesData?.barDining} />
              )}
              {amenitiesData?.ecoFriendlyPractices && (
                <CollapsibleSection
                  area={'ecoFriendlyPractices'}
                  title="Eco-Friendly Practices"
                  items={amenitiesData?.ecoFriendlyPractices}
                />
              )}
              {amenitiesData?.eventServices && (
                <CollapsibleSection
                  area={'eventServices'}
                  title="Event Services Offered"
                  items={amenitiesData?.eventServices}
                />
              )}
              {amenitiesData?.meetingRooms && (
                <CollapsibleSection
                  area={'meetingRooms'}
                  title="Meeting Conference Hall"
                  items={amenitiesData?.meetingRooms}
                />
              )}
              {amenitiesData?.specialMenus && (
                <CollapsibleSection
                  area={'specialMenus'}
                  title="Special Menus Available"
                  items={amenitiesData?.specialMenus}
                />
              )}
              {amenitiesData?.travelAdventureSupport && (
                <CollapsibleSection
                  area={'travelAdventureSupport'}
                  title="Travel & Adventure Support"
                  items={amenitiesData?.travelAdventureSupport}
                />
              )}
              {amenitiesData?.wellness && (
                <CollapsibleSection area={'wellness'} title="Wellness Amenities" items={amenitiesData?.wellness} />
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                {/* Title Section */}
                <SectionTitle className="sm:flex-1 w-full">
                  <div className="inline-flex items-center gap-1">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg block truncate">
                      {hostel.name}
                    </span>{' '}
                  </div>
                </SectionTitle>

                {/* Price Range Section */}
                <div className="w-full sm:w-55 text-left sm:text-right">
                  <div className="text-base font-medium text-gray-800 mt-1 space-y-1">
                    {selectedPriceRange
                      .split(', ')
                      .slice(0, expanded ? selectedPriceRange.length : 1) // Show first 2 items if collapsed
                      .map((item, index) => (
                        <div key={index}>{item}</div>
                      ))}
                  </div>

                  {selectedPriceRange.split(', ').length > 2 && (
                    <button onClick={toggleExpanded} className="text-blue-500 text-sm mt-1 hover:underline">
                      {expanded ? 'View Less' : 'View More'}
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-1 flex items-center">
                <MapPin size={28} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-base font-medium text-gray-800">{formatAddress(hostel?.address)}</span>
              </div>

              <div className="mt-4 ml-1 flex flex-wrap items-center gap-4">
                {hostel?.contact?.website && (
                  <a
                    href={hostel.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 font-semibold"
                  >
                    <Globe size={24} className="mr-2" />
                    Visit Website
                  </a>
                )}
                <div className="flex items-center">
                  <Phone size={24} className="text-gray-500 mr-2" />
                  <span className="text-base font-medium text-gray-800">{hostel?.contact.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={24} className="text-gray-500 mr-2" />
                  <span className="text-base font-medium text-gray-800">{hostel?.contact.email}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap justify-between items-center gap-3">
                {/* Star Ratings & Reviews */}
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={28}
                        className={i < Math.floor(3) ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-base font-medium text-gray-800">{hostel.reviews} 120 Reviews</span>
                  <button className="ml-4 text-sm font-medium text-gray-600 flex items-center">
                    <MessageCircle size={22} className="mr-1" />
                    <span className="ml-0 text-base font-medium text-gray-800"> Write a review </span>
                  </button>
                </div>

                {/* Social Media Buttons */}
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-600 rounded-full text-white">
                    <Facebook size={20} />
                  </button>
                  <button className="p-2 bg-green-500 rounded-full text-white">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>

            <PhotoGallery uploadedPhotoshotel={hostel?.uploadedPhotoshotel} openImageModal={openImageModal} />

            <HotelDescription
              title={hostel?.description?.tagline}
              description={hostel?.description?.description}
              highlights={hostel?.description?.highlights}
              languages={hostel?.languages}
            />

            <OtherPolicyDetails
              accomodationLabel={accomodationLabel}
              nearbyAttractions={hostel?.nearbyAttraction}
              operatingSeason={hostel?.operatingSeason}
              policy={hostel?.policy}
              paymentMethods={hostel?.paymentMethods}
            />
            <LocationDetails distanceToKeyLocations={hostel?.distanceToKeyLocations} location={hostel?.location} />
            <RoomBathroomDetails accomodationLabel={accomodationLabel} data={roomBathRoomData} />
            {/* <div className="p-6 border-t bg-white">
              <SectionTitle>
                Distance to Key Locations
                <span className="text-xs text-gray-500 ml-1">(11)</span>
              </SectionTitle>
              <div className="space-y-3">
                {Object.entries(hostel.distanceToKeyLocations).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </h4>
                      <p className="text-gray-600">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t bg-white">
              <SectionTitle>
                Operating Season
                <span className="text-xs text-gray-500 ml-1">(8)</span>
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-gray-900">Year-Round Operation</p>
                  <p className="text-gray-600">{hostel.operatingSeason.isYearRound ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Seasonal Information</p>
                  <p className="text-gray-600">Low Season: {hostel.operatingSeason.lowSeason}</p>
                  <p className="text-gray-600">High Season: {hostel.operatingSeason.highSeason}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-white">
              <SectionTitle>
                Payment Methods Accepted
                <span className="text-xs text-gray-500 ml-1">(9)</span>
              </SectionTitle>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-2">Credit/Debit Cards</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(hostel.paymentMethods.acceptedCards).map(
                      ([card, accepted]) =>
                        accepted && (
                          <span key={card} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                            {card.toUpperCase()}
                          </span>
                        )
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  {hostel.paymentMethods.cash && (
                    <div className="flex items-center text-gray-600">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Cash accepted
                    </div>
                  )}
                  {hostel.paymentMethods.onlinePayment && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      Online payment available
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-white">
              <SectionTitle>
                Nearby Attractions
                <span className="text-xs text-gray-500 ml-1">(10)</span>
              </SectionTitle>
              <div className="grid gap-4">
                {hostel.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">{attraction.name}</p>
                      <p className="text-gray-600">{attraction.distance || attraction.description}</p>
                      <p className="text-sm text-gray-500">{attraction.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t bg-white">
              <SectionTitle>
                Room & Bathroom Details
                <span className="text-xs text-gray-500 ml-1">(12)</span>
              </SectionTitle>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-medium text-gray-900">Total Beds</p>
                    <p className="text-gray-600">{hostel.rooms.totalBeds}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dormitory Rooms</p>
                    <p className="text-gray-600">{hostel.rooms.dormitoryRooms}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Private Rooms</p>
                    <p className="text-gray-600">{hostel.rooms.privateRooms}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shared Bathrooms</p>
                    <p className="text-gray-600">{hostel.rooms.sharedBathrooms}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-2">Room Amenities</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(hostel.rooms.amenities).map(
                      ([amenity, available]) =>
                        available && (
                          <div key={amenity} className="flex items-center text-gray-600">
                            <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                            {amenity.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeImageModal}
        >
          <button className="absolute top-4 right-4 text-white p-2" onClick={closeImageModal}>
            <X size={24} />
          </button>

          <button className="absolute left-4 text-white p-2" onClick={prevImage}>
            <ChevronLeft size={24} />
          </button>

          <img
            src={selectedImage}
            alt="Hostel"
            className="max-h-[80vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="absolute right-4 text-white p-2" onClick={nextImage}>
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccomodationDetailsScreen;

const LocationDetails = ({ distanceToKeyLocations, location }) => {
  const mapUrl = `https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&output=embed`;

  return (
    <div className="mt-6 p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
        {/* Distance to Key Locations */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1">
            Distance to Key Locations
          </h2>
          <div className="mt-3">
            <p className="text-base text-gray-800">
              <span className="font-semibold">Nearest Airport:</span> {distanceToKeyLocations?.nearestAirport}
            </p>
            <p className="text-base text-gray-800 mt-2">
              <span className="font-semibold">Taxi Stands:</span> {distanceToKeyLocations?.taxiStands}
            </p>
            <p className="text-base text-gray-800 mt-2">
              <span className="font-semibold">City/Town Center:</span> {distanceToKeyLocations?.cityCenter}
            </p>
            <p className="text-base text-gray-800 mt-2">
              <span className="font-semibold">Local Markets/Shopping Areas:</span>{' '}
              {distanceToKeyLocations?.localMarkets}
            </p>
            <p className="text-base text-gray-800 mt-2">
              <span className="font-semibold">Popular Restaurants/Bars:</span>{' '}
              {distanceToKeyLocations?.popularRestaurants}
            </p>
            <p className="text-base text-gray-800 mt-2">
              <span className="font-semibold">Train/Bus Station:</span> {distanceToKeyLocations?.trainBusStation}
            </p>
          </div>
        </div>

        {/* Map Location */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1">
            Map Location
          </h2>
          <div className="mt-3">
            <iframe src={mapUrl} className="w-full h-60 rounded-lg shadow-md" allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
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
      .filter(([, value]) => value === true)
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

  return (
    <div className="p-4 mt-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold flex items-center border-b-4 border-orange-400 pb-2">
        {accomodationLabel} Room & Bathroom Details
      </h2>
      <div className="grid grid-cols-2 gap-0 mt-4">
        {allFields.map(({ key, value }) => (
          <div key={key} className="flex-start">
            <span className="font-bold">{key + '  '}:</span>
            <span className="font-normal">{'  ' + value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OtherPolicyDetails = ({ accomodationLabel, nearbyAttractions, operatingSeason, policy, paymentMethods }) => {
  return (
    <div className="mt-6 p-4 bg-white">
      {/* Grid Layout for Side-by-Side Sections */}
      <div className="grid grid-cols-2 gap-40">
        {/* Hostel Policies */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1">
            {accomodationLabel} Policies
          </h2>
          <div className="mt-3">
            <p className="text-base font-semibold text-gray-800">
              Cancellation Policy:{' '}
              <span className="text-gray-600">
                {policy?.cancellation?.freeCancellation ? 'Free Cancellation' : 'Non-Refundable'}
              </span>
            </p>

            <p className="text-base text-gray-800 mt-4">
              <span className="font-semibold">House Rules:</span> {policy?.rules}
            </p>

            <p className="text-base text-gray-800 mt-4">
              <span className="font-semibold">Check-In Time:</span> {policy?.checkInTime}
            </p>
            <p className="text-base text-gray-800">
              <span className="font-semibold">Check-Out Time:</span> {policy?.checkOutTime}
            </p>

            {/* Payment Methods */}
            <div className="mt-4">
              <p className="text-base font-semibold text-gray-800">Payment Methods Accepted:</p>
              <div className="mt-1 text-gray-800">
                {[
                  paymentMethods?.card && 'Credit/Debit Card',
                  paymentMethods?.cash && 'Cash on Arrival',
                  paymentMethods?.online && 'Online Payment',
                ]
                  .filter(Boolean) // Removes undefined values
                  .join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Operating Season */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1">
            Operating Season
          </h2>
          <div className="mt-3">
            <p className="text-base font-semibold text-gray-800">
              Open Year-Round:{' '}
              <span className={operatingSeason?.isYearRound ? 'text-green-600' : 'text-red-500'}>
                {operatingSeason?.isYearRound ? 'Yes' : 'No'}
              </span>
            </p>

            {!operatingSeason?.isYearRound && (
              <p className="text-base text-gray-800">Seasonal Months: {operatingSeason?.seasonalMonths}</p>
            )}

            <p className="text-base text-gray-800 mt-1">
              <span className="font-semibold">High Season Months:</span> {operatingSeason?.highSeason}
            </p>

            <p className="text-base text-gray-800">
              <span className="font-semibold">Low Season Months:</span> {operatingSeason?.lowSeason}
            </p>
          </div>
          {/* Nearby Attractions */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-400 pb-1">
              Nearby Attractions
            </h2>
            <div className="mt-3">
              {nearbyAttractions?.map((attraction) => (
                <div key={attraction._key} className="mb-3">
                  <p className="text-sm font-semibold text-gray-800">{attraction.name}</p>
                  <p className="text-sm text-gray-600">Distance: {attraction.distance} km away</p>

                  <div className="flex flex-wrap mt-1">
                    {attraction.beach && <span className="badge">Beach</span>}
                    {attraction.bikingTrails && <span className="badge">Biking Trails</span>}
                    {attraction.desert && <span className="badge">Desert</span>}
                    {attraction.hikingTrails && <span className="badge">Hiking Trails</span>}
                    {attraction.kayakingCanoeing && <span className="badge">Kayaking & Canoeing</span>}
                    {attraction.lake && <span className="badge">Lake</span>}
                    {attraction.parkReserve && <span className="badge">Park/Reserve</span>}
                    {attraction.river && <span className="badge">River</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatLanguages = (languages: Record<string, boolean | string>) => {
  return Object.entries(languages)
    .filter(([key, value]) => value === true || (key === 'other' && value))
    .map(([key, value]) => (key === 'other' ? value : key.charAt(0).toUpperCase() + key.slice(1)))
    .join(', ');
};

// Tailwind Badge Style

// Tailwind Badge Style
// const badgeStyle = 'bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1';
const HotelDescription = ({ title, description, highlights, languages }) => {
  return (
    <div className="mx-auto p-4 m-20">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <div className="border-t-4 border-orange-400 mb-6" />
      {/* Description */}
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mt-4">{description}</p>
      {/* Highlights */}
      <div className="mt-4">
        {highlights?.map((highlight, index) => (
          <p key={index} className="text-black font-semibold text-base sm:text-lg">
            * {highlight}
          </p>
        ))}
      </div>

      {/* Languages */}
      <p className="mt-4 text-gray-700 text-base sm:text-lg">
        <span className="font-semibold">Languages Spoken by Staff –</span> {formatLanguages(languages)}{' '}
      </p>
    </div>
  );
};

const PhotoGallery = ({ uploadedPhotoshotel, openImageModal }) => {
  // Gather all images dynamically
  // console.log('uploadedPhotoshotel:', uploadedPhotoshotel);
  const allImages = Object.values(uploadedPhotoshotel || {})
    .flat() // Flatten arrays
    .map((photo) => {
      return sanityImageUrlBuilder(photo as any).url();
    }) // Convert Sanity ref to URL
    .filter(Boolean) as string[]; // Remove undefined/null values

  // If no images, return null
  if (!allImages.length) return null;

  return (
    <div className="relative mx-4 md:mx-6">
      <div className="grid grid-cols-2 gap-1">
        {/* Main Image with Maximum Height */}
        <div className="cursor-pointer" onClick={() => openImageModal(allImages[0], 0, allImages)}>
          <img src={allImages[0]} alt="Hostel" className="w-full h-[500px] object-cover rounded-md" />
        </div>

        {/* Smaller Images with More Height */}
        <div className="grid grid-rows-2 gap-1">
          {allImages.slice(1, 3).map((image, index) => (
            <div key={index} className="cursor-pointer">
              <img src={image} alt="Hostel" className="w-full h-[250px] object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Buttons */}
      {allImages.length > 3 && (
        <div
          className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded cursor-pointer"
          onClick={() => openImageModal(allImages[0], 0)}
        >
          +{allImages.length - 3} photos
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-70 text-black text-xs px-2 py-1 rounded">
        1/{allImages.length}
      </div>
    </div>
  );
};

interface CollapsibleSectionProps {
  title: string;
  items: Record<string, boolean>;
  area: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ area, title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full p-3 flex justify-between items-center hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-orange-400">{title}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && items && (
        <div className="bg-gray-50 px-3 py-2">
          {Object.entries(items).map(([key, value]) => (
            <div key={key} className="py-1.5 px-2 text-sm text-gray-600">
              <span className="font-medium">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </span>
              {area === 'meetingRooms' && value && (
                <>
                  : <span className="text-gray-700">{value}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
