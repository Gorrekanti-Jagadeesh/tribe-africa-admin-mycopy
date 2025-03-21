import React, { useState } from 'react';
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
  CreditCard,
} from 'lucide-react';
import { Controller, useForm, FieldValues } from 'react-hook-form';
import { priceRangeOptions } from '@/data/amanitieConfig';
import SectionTitle from './SectionTitle';
import { sanityImageUrlBuilder } from '@api/index';
import { getAmenitiesConfig, getAccommodationLabel, getAccommodationRoomType } from '@/data/amanitieConfig';

// Define missing types
interface ReviewProps {
  // Add necessary properties
  id: string;
  // Add other properties as needed
}

interface accomodationProps {
  // Add necessary properties
  _id: string;
  images: any;
  title: string;
  amount: string;
  reviews: any;
  businessDetails?: {
    businessName: string;
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
    name: string;
    role?: string;
    email?: string;
    phoneNumber?: string;
    emergencyContact?: string;
    ownerIdPhoto?: any;
  };
}

interface AfterWorkDetailsScreenProps {
  reviews: ReviewProps[];
  data: accomodationProps;
  hostel: accomodationProps;
  onSubmit: (values: FieldValues) => void;
  control: any;
  isSubmitting: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AfterWorkDetailsScreen: React.FC<AfterWorkDetailsScreenProps> = ({
  reviews,
  hostel,
  onSubmit,
  control,
  isSubmitting,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { getValues } = useForm();

  if (!hostel) return <>Data not received yet</>;
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [allImage, setAllImage] = useState<string[]>([]);

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

  const openImageModal = (image: string, index: number, allImages: string[]) => {
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
  console.log('---- final data', hostel);

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
              {hostel?.keyFeatures && <CollapsibleSection title="Key Features" items={hostel?.keyFeatures} />}
            </div>
            <div className="divide-y mt-5">
              {hostel?.cuisineType && <CollapsibleSection title="Cuisine Type" items={hostel?.cuisineType} />}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                {/* Title Section */}
                <SectionTitle className="sm:flex-1 w-full">
                  <div className="inline-flex items-center gap-1">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg block truncate">
                      {hostel?.businessDetails?.businessName}
                    </span>{' '}
                  </div>
                </SectionTitle>
              </div>

              <div className="mt-1 flex items-center">
                <MapPin size={28} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-base font-medium text-gray-800">
                  {formatAddress(hostel?.businessDetails?.address)}
                </span>
              </div>

              <div className="mt-4 ml-1 flex flex-wrap items-center gap-4">
                {hostel?.businessContact?.website && (
                  <a
                    href={hostel?.businessContact?.website}
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
                  <span className="text-base font-medium text-gray-800">{hostel?.businessContact?.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={24} className="text-gray-500 mr-2" />
                  <span className="text-base font-medium text-gray-800">{hostel?.businessContact?.email}</span>
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

            <PhotoGallery uploadedPhotoshotel={hostel?.businessPhotos} openImageModal={openImageModal} />

            <HotelDescription title={'Full Description'} description={hostel?.fullDescription} />
            <HotelDescription
              title={'Menu Services and Atmosphere Highlights'}
              description={hostel?.menuServicesAtmosphereHighlights}
            />

            <SeatingInfo
              indoorSeatingCapacity={hostel?.indoorSeatingCapacity}
              outdoorSeatingCapacity={hostel?.outdoorSeatingCapacity}
            />
            <OperatingHours operatingHours={hostel?.operatingHours} />
            <OwnerContactDetails ownerContactDetails={hostel?.ownerContactDetails} />

            {/* 

            <OtherPolicyDetails
              accomodationLabel={accomodationLabel}
              nearbyAttractions={hostel?.nearbyAttraction}
              operatingSeason={hostel?.operatingSeason}
              policy={hostel?.policy}
              paymentMethods={hostel?.paymentMethods}
            />
            <LocationDetails distanceToKeyLocations={hostel?.distanceToKeyLocations} location={hostel?.location} />
            <RoomBathroomDetails accomodationLabel={accomodationLabel} data={roomBathRoomData} /> */}
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

export default AfterWorkDetailsScreen;

const LocationDetails = ({
  distanceToKeyLocations,
  location,
}: {
  distanceToKeyLocations?: {
    nearestAirport?: string;
    taxiStands?: string;
    cityCenter?: string;
    localMarkets?: string;
    popularRestaurants?: string;
    trainBusStation?: string;
  };
  location?: {
    latitude?: string;
    longitude?: string;
  };
}) => {
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

const RoomBathroomDetails = ({ accomodationLabel, data }: { accomodationLabel: string; data: any }) => {
  const toTitleCase = (str: string) => {
    return str
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Convert first letter to uppercase
  };

  const formatBooleanFields = (fields: Record<string, boolean>) => {
    return Object.entries(fields)
      .filter(([_, value]) => value === true)
      .map(([key]) => toTitleCase(key))
      .join(', ');
  };

  const formatTextFields = (fields: Record<string, any>, excludedKeys: string[] = []) => {
    return Object.entries(fields)
      .filter(([key, value]) => value && typeof value !== 'object' && !excludedKeys.includes(key))
      .map(([key, value]) => ({
        key: toTitleCase(key),
        value: value,
      }));
  };

  const formatObjectFields = (fields: Record<string, any>) => {
    return Object.entries(fields)
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

const OwnerContactDetails = ({
  ownerContactDetails,
}: {
  ownerContactDetails: {
    name: string;
    role?: string;
    email?: string;
    phoneNumber?: string;
    emergencyContact?: string;
    ownerIdPhoto?: any;
  };
}) => {
  return (
    <div className="p-4 mt-0 bg-white shadow rounded-lg w-96">
      <h2 className="text-lg font-bold text-gray-900 border-b-4 border-orange-400 pb-1">Owner Contact Details</h2>
      <div className="mt-3">
        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {ownerContactDetails.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Role:</span> {ownerContactDetails.role}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {ownerContactDetails.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {ownerContactDetails.phoneNumber}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Emergency Contact:</span> {ownerContactDetails.emergencyContact}
        </p>
        {ownerContactDetails.ownerIdPhoto && (
          <div className="mt-3">
            <span className="font-semibold text-gray-700">Owner ID Photo:</span>
            <img
              src={`https://cdn.sanity.io/images/yourProjectId/yourDataset/${ownerContactDetails.ownerIdPhoto.asset._ref.split('-')[1]}.${ownerContactDetails.ownerIdPhoto.asset._ref.split('-')[3]}`}
              alt="Owner ID"
              className="mt-2 w-full h-32 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const OperatingHours = ({ operatingHours }: { operatingHours: Record<string, { start: string; end: string }> }) => {
  return (
    <div className="p-4 mt-0 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-gray-900 border-b-4 border-orange-400 pb-1">Operating Hours</h2>
      <ul className="mt-2">
        {Object.entries(operatingHours || {}).map(([day, hours]) => (
          <li key={day} className="text-gray-700 capitalize">
            <span className="font-semibold mr-5">{day}: </span>
            {hours.start} - {hours.end}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SeatingInfo = ({
  indoorSeatingCapacity,
  outdoorSeatingCapacity,
}: {
  indoorSeatingCapacity?: string;
  outdoorSeatingCapacity?: string;
}) => {
  return (
    <div className="p-4 mt-0 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-gray-900 border-b-4 border-orange-400 pb-1">Seating Capacity</h2>
      <p className="text-gray-800 mt-2 font-semibold">Indoor: {'   ' + indoorSeatingCapacity}</p>
      <p className="text-gray-800 font-semibold">Outdoor : {'    ' + outdoorSeatingCapacity}</p>
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
const badgeStyle = 'bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1';
const HotelDescription = ({ title, description }: { title: string; description?: string }) => {
  return (
    <div className="mx-auto p-4 m-10">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <div className="border-t-4 border-orange-400 mb-6" />
      {/* Description */}
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mt-4">{description}</p>
    </div>
  );
};

const PhotoGallery = ({
  uploadedPhotoshotel,
  openImageModal,
}: {
  uploadedPhotoshotel: any;
  openImageModal: (image: string, index: number, allImages: string[]) => void;
}) => {
  // Gather all images dynamically
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
          onClick={() => openImageModal(allImages[0], 0, allImages)}
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
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, items }) => {
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

      {isOpen && (
        <div className="bg-gray-50 px-3 py-2">
          {Object.entries(items)
            .filter(([_, value]) => value === true) // Only include `true` values
            .map(([key]) => (
              <div key={key} className="py-1.5 px-2 text-sm text-gray-600">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
