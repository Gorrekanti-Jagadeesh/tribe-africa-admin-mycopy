import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FileUploadWithPreview from '@atoms/input-elements/file-upload-with-preview';
import Dropdown from '@atoms/dropdown/dropdown-search';
import Input from '@atoms/input-elements/input';
import DynamicFields from '@atoms/input-elements/dynamic-fields';
import Checkbox from '@/atoms/input-elements/checkbox';
import DateInput from '@/atoms/input-elements/date-input';
import Button from '@/atoms/custom-button/button';
import { Option } from '@/types';
import { RichTextEditor } from '@/atoms/input-elements/rich-text-editor';
import { Select } from '@/atoms/input-elements/select';

export interface AccommodationFormInputs {
  accommodation_type: string;
  name: string;
  brand?: string;
  star_rating?: string;
  property_type?: string;
  priceRange: {
    budget: boolean;
    midRange: boolean;
    upScale: boolean;
    luxury: boolean;
  };
  address: {
    street: string;
    city: string;
    region: string;
    postalCode?: string;
    country: string;
  };
  contact: {
    website: string;
    phoneNumber: string;
    email: string;
  };
  description: {
    tagline: string;
    description: string;
    highlights: string[];
  };
  languages: {
    english: boolean;
    french: boolean;
    spanish: boolean;
    portuguese: boolean;
    german: boolean;
    other?: string;
  };
  establishedIn: string;
  policy: {
    cancellation: {
      freeCancellation: boolean;
      nonRefundable: boolean;
      description?: string;
    };
    rules?: string;
    checkInTime?: string;
    checkOutTime?: string;
  };
  paymentMethods: {
    card: boolean;
    cash: boolean;
    online: boolean;
  };
  acceptedCards: {
    masterCard: boolean;
    visaCard: boolean;
    americanExpress: boolean;
    discover: boolean;
    jcb: boolean;
    other: string;
  };
  operatingSeasons: {
    title: string;
    description: string;
  }[];
  keyLocations: { title: string; distance: string }[];
  attractions: { title: string; distance: string }[];
  location: {
    latitude: string;
    longitude: string;
  };
  amenities: {
    general: {
      security24h: boolean;
      cctvCameras: boolean;
      freeParking: boolean;
      paidParking: boolean;
      electricVehicleChargingStation: boolean;
      freeWiFi: boolean;
      wheelchairAccessibleFacilities: boolean;
      restrooms: boolean;
      showers: boolean;
      laundryFacilities: boolean;
      sharedKitchenFacilities: boolean;
      smokingAllowed: boolean;
      alcoholAllowed: boolean;
      playground: boolean;
      petFriendlySpaces: boolean;
      breakfastAvailableForPurchase: boolean;
      salahRoom: boolean;
      chapel: boolean;
      otherSpecify: boolean;
    };
    utilities: {
      electricity: boolean;
      water: boolean;
      sewer: boolean;
      dumpStation: boolean;
      wifi: boolean;
    };
    recreationalFacilities: {
      onSiteCafe: boolean;
      onSiteBar: boolean;
      sharedLounge: boolean;
      poolTable: boolean;
      tableTennis: boolean;
      library: boolean;
      bbqGrill: boolean;
      firePit: boolean;
      picnicTables: boolean;
      swimmingPool: boolean;
      gymFitnessArea: boolean;
      massageWellnessServices: boolean;
      basketball: boolean;
      volleyball: boolean;
      weeklyEvents: boolean;
      culturalEvents: boolean;
      otherSpecify: boolean;
    };
    workConnectivity: {
      coWorkingSpaces: boolean;
      networkingOpportunities: boolean;
      powerOutletsUsbPorts: boolean;
      printingScanningServices: boolean;
      highSpeedWifi: boolean;
      otherSpecify: boolean;
    };
    specialMenus: {
      dairyFree: boolean;
      glutenFree: boolean;
      vegetarian: boolean;
      vegan: boolean;
      halal: boolean;
      kosher: boolean;
      otherSpecify: boolean;
    };
    travelSupport: {
      tourDesk: boolean;
      transportServices: boolean;
      travelGuides: boolean;
      storageForOutdoorGear: boolean;
      bicyclesForRent: boolean;
      otherSpecify: boolean;
    };
    ecoFriendlyPractices: {
      greenCertification: boolean;
      energyUsageTransparency: boolean;
      natureInspiredDesign: boolean;
      greenSpacesForRelaxation: boolean;
      energyConservation: boolean;
      waterConservationMeasures: boolean;
      recyclingBinsWasteManagement: boolean;
      ecoFriendlyToiletries: boolean;
      ecoFriendlyLaundryOptions: boolean;
      carbonOffsetPrograms: boolean;
      veganVegetarianOptions: boolean;
      ecoConsciousTransportation: boolean;
      plasticFreePractices: boolean;
      waterBottleRefillStations: boolean;
      useOfLocalProducts: boolean;
      useOfOrganicProducts: boolean;
      communityInitiatives: boolean;
    };
  };
  images: FileList;
  manager: {
    name: string;
    role: string;
    phoneNumber: string;
    email: string;
    emergencyContact?: string;
    idPhoto?: File;
  };
}

const FormContext = createContext(null);

const AccommodationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccommodationFormInputs>({
    defaultValues: {},
  });

  const { control } = useForm();
  const [landmarks, setLandmarks] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [formType, setFormType] = useState(null);

  useEffect(() => {}, [landmarks, attractions]);

  // Property types
  const propertyTypes = {
    hotel: {
      options: [
        { label: 'Budget', value: 'budget', checked: false },
        { label: 'Luxury', value: 'luxury', checked: false },
        { label: 'Boutique', value: 'boutique', checked: false },
        { label: 'Family Friendly', value: 'familyFriendly', checked: false },
        { label: 'Business Friendly', value: 'businessFriendly', checked: false },
      ],
    },
    hostel: {
      options: [
        { label: 'Backpacker', value: 'backpacker', checked: false },
        { label: 'Party', value: 'party', checked: false },
        { label: 'Eco Friendly', value: 'ecoFriendly', checked: false },
        { label: 'Boutique', value: 'boutique', checked: false },
        { label: 'LGBTQ', value: 'lgbtq', checked: false },
        { label: 'Family Friendly', value: 'familyFriendly', checked: false },
        { label: 'Other (specify)', value: 'other', checked: false },
      ],
    },
    campground: {
      options: [
        { label: 'Tent Sites', value: 'tentSites', checked: false },
        { label: 'RV Sites', value: 'rvSites', checked: false },
        { label: 'Eco Friendly', value: 'ecoFriendly', checked: false },
        { label: 'Family Friendly', value: 'familyFriendly', checked: false },
        { label: 'Other (specify)', value: 'other', checked: false },
      ],
    },
    coLiving: {
      options: [
        { label: 'Urban Co-Living', value: 'urbanCoLiving', checked: false },
        { label: 'Rural Co-Living', value: 'ruralCoLiving', checked: false },
        { label: 'Surf/Seaside Co-Living', value: 'surfSeasideCoLiving', checked: false },
        { label: 'Co-Living with Workspaces', value: 'coLivingWithWorkspaces', checked: false },
        { label: 'Apartment', value: 'apartment', checked: false },
        { label: 'House', value: 'house', checked: false },
        { label: 'Other (specify)', value: 'other', checked: false },
      ],
    },
  };

  // Data for all accordions (dynamic data for each accordion)
  const generalAmenities = [
    { label: '24/7 Security', value: 'security24h' },
    { label: 'CCTV Cameras', value: 'cctvCameras' },
    { label: 'Free Parking', value: 'freeParking' },
    { label: 'Paid Parking', value: 'paidParking' },
    { label: 'Electric Vehicle Charging Station', value: 'electricVehicleChargingStation' },
    { label: 'Free Wi-Fi', value: 'freeWiFi' },
    { label: 'Wheelchair-Accessible Facilities', value: 'wheelchairAccessibleFacilities' },
    { label: 'Restrooms', value: 'restrooms' },
    { label: 'Showers', value: 'showers' },
    { label: 'Laundry facilities', value: 'laundryFacilities' },
    { label: 'Shared Kitchen Facilities', value: 'sharedKitchenFacilities' },
    { label: 'Smoking Allowed', value: 'smokingAllowed' },
    { label: 'Alcohol Allowed', value: 'alcoholAllowed' },
    { label: 'Playground', value: 'playground' },
    { label: 'Pet- Friendly Spaces', value: 'petFriendlySpaces' },
    { label: 'Breakfast Available for Purchase', value: 'breakfastAvailableForPurchase' },
    { label: 'Salah Room (Muslim Prayer Room)', value: 'salahRoom' },
    { label: 'Chapel', value: 'chapel' },
    { label: 'Other (Specify)', value: 'otherSpecify' },
  ];

  const utilitiesHookups = [
    { label: 'Electricity', value: 'electricity' },
    { label: 'Water', value: 'water' },
    { label: 'Sewer', value: 'sewer' },
    { label: 'Dump Station', value: 'dumpStation' },
    { label: 'Wi-fi', value: 'wifi' },
  ];

  const recreationalFacilities = [
    { label: 'On-Site Café', value: 'onSiteCafe' },
    { label: 'On-Site Bar', value: 'onSiteBar' },
    { label: 'Shared Lounge/TV Area', value: 'sharedLounge' },
    { label: 'Pool Table', value: 'poolTable' },
    { label: 'Table Tennis', value: 'tableTennis' },
    { label: 'Library', value: 'library' },
    { label: 'BBQ Grill', value: 'bbqGrill' },
    { label: 'Fire Pit', value: 'firePit' },
    { label: 'Picnic Tables', value: 'picnicTables' },
    { label: 'Swimming Pool', value: 'swimmingPool' },
    { label: 'Gym / Fitness Area', value: 'gymFitnessArea' },
    { label: 'Massage / Wellness Services', value: 'massageWellnessServices' },
    { label: 'Basketball', value: 'basketball' },
    { label: 'Volleyball', value: 'volleyball' },
    { label: 'Weekly Events', value: 'weeklyEvents' },
    { label: 'Cultural Events', value: 'culturalEvents' },
    { label: 'Other (Specify)', value: 'otherSpecify' },
  ];

  const workConnectivity = [
    { label: 'Co-Working Spaces', value: 'coWorkingSpaces' },
    { label: 'Networking Opportunities', value: 'networkingOpportunities' },
    { label: 'Power Outlets & USB Ports', value: 'powerOutletsUsbPorts' },
    { label: 'Printing & Scanning Services', value: 'printingScanningServices' },
    { label: 'High-Speed Wi-Fi', value: 'highSpeedWifi' },
    { label: 'Other (Specify)', value: 'otherSpecify' },
  ];

  const specialMenus = [
    { label: 'Dairy-Free', value: 'dairyFree' },
    { label: 'Gluten-Free', value: 'glutenFree' },
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Halal', value: 'halal' },
    { label: 'Kosher', value: 'kosher' },
    { label: 'Other (Specify)', value: 'otherSpecify' },
  ];

  const travelSupport = [
    { label: 'Tour Desk', value: 'tourDesk' },
    { label: 'Transport Services', value: 'transportServices' },
    { label: 'Travel Guides', value: 'travelGuides' },
    { label: 'Storage for Outdoor Gear (e.g., Surfboards, Bicycles etc)', value: 'storageForOutdoorGear' },
    { label: 'Bicycles for rent', value: 'bicyclesForRent' },
    { label: 'Other (Specify)', value: 'otherSpecify' },
  ];

  const ecoFriendlyPractices = [
    { label: 'Green Certification', value: 'greenCertification' },
    { label: 'Energy Usage Transparency', value: 'energyUsageTransparency' },
    { label: 'Nature Inspired Design', value: 'natureInspiredDesign' },
    { label: 'Green Spaces for Relaxation', value: 'greenSpacesForRelaxation' },
    {
      label: 'Energy Conservation (e.g., Solar Panels, LED Lighting, Energy Saving Appliances etc.)',
      value: 'energyConservation',
    },
    {
      label: 'Water Conservation Measures (e.g., Low-flow showerheads, dual-flush toilets, etc.)',
      value: 'waterConservationMeasures',
    },
    { label: 'Recycling Bins & Waste Management', value: 'recyclingBinsWasteManagement' },
    { label: 'Eco-Friendly Toiletries', value: 'ecoFriendlyToiletries' },
    { label: 'Eco-Friendly Laundry Options', value: 'ecoFriendlyLaundryOptions' },
    { label: 'Carbon Offset Programs', value: 'carbonOffsetPrograms' },
    { label: 'Vegan & Vegetarian Options', value: 'veganVegetarianOptions' },
    { label: 'Eco-Conscious Transportation', value: 'ecoConsciousTransportation' },
    { label: 'Plastic-Free Practices', value: 'plasticFreePractices' },
    { label: 'Water Bottle Refill Stations', value: 'waterBottleRefillStations' },
    { label: 'Use of Local Products', value: 'useOfLocalProducts' },
    { label: 'Use of Organic Products', value: 'useOfOrganicProducts' },
    { label: 'Community Initiatives', value: 'communityInitiatives' },
  ];

  const onSubmit: SubmitHandler<AccommodationFormInputs> = (data) => {
    console.log(data);
  };

  const atmCards = [
    { value: 'mastercard', label: 'MasterCard' },
    { value: 'visa', label: 'Visa' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' },
    { value: 'jcb', label: 'JCB' },
    { value: 'unionpay', label: 'UnionPay' },
    { value: 'rupay', label: 'RuPay' },
    { value: 'interac', label: 'Interac' },
    { value: 'eftpos', label: 'EFTPOS' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Accommodation Registration Form</h2>
      <FormContext.Provider value={register}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Accommodation type */}
          <Select
            name="accommodation_type"
            placeholder="Accommodation type"
            options={[
              {
                label: 'Hotel',
                value: 'hotel',
              },
              {
                label: 'Hostel',
                value: 'hostel',
              },
              {
                label: 'Bed & Breakfast',
                value: 'bed-and-breakfast',
              },
              {
                label: 'Co-Living',
                value: 'co-living',
              },
              {
                label: 'Resort',
                value: 'resort',
              },
              {
                label: 'Campground',
                value: 'campground',
              },
              {
                label: 'Vacation Rental',
                value: 'vacation-rental',
              },
            ]}
            onChange={setFormType}
          />

          {/* Name */}
          <Input type="text" {...register('name')} placeholder="Name" />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          {/* Brand */}
          {formType == 'hotel' ||
            formType == 'resort' ||
            (formType == 'bed-and-breakfast' && <Input type="text" {...register('brand')} placeholder="Brand name" />)}

          {/* Star Rating */}
          {formType == 'hotel' ||
            formType == 'resort' ||
            (formType == 'bed-and-breakfast' && (
              <Select
                name="star_rating"
                placeholder="Star Rating"
                options={[
                  {
                    label: '1 Star',
                    value: '1',
                  },
                  {
                    label: '1.5 Star',
                    value: '1.5',
                  },
                  {
                    label: '2 Star',
                    value: '2',
                  },
                  {
                    label: '2.5 Star',
                    value: '2.5',
                  },
                  // TODO: Extend list of stars until 7 Star
                ]}
              />
            ))}

          {/* Property type/category */}
          {formType && propertyTypes[formType] && (
            <div>
              <label className="font-semibold">Property Type</label>
              {propertyTypes[formType].options.map((type) => (
                <Checkbox
                  key={type.value}
                  label={type.label}
                  {...register(`property_type`)}
                  onChange={(checked) => (type.checked = checked)}
                />
              ))}
            </div>
            // TODO: Change property type in schema for multiple select
          )}

          {/* Price Range / Amount */}
          <div>
            <label className="font-semibold">Price Range</label>
            <Checkbox
              {...register(`priceRange.budget`)}
              label={'Budget (e.g.: $10 - $25 per night)'}
              onChange={() => {}}
            />
            <Checkbox
              {...register(`priceRange.midRange`)}
              label={'Mid-range (e.g.: $25 - $50 per night)'}
              onChange={() => {}}
            />
            <Checkbox
              {...register(`priceRange.upScale`)}
              label={'Upscale (e.g.: $50 - $100 per night)'}
              onChange={() => {}}
            />
            <Checkbox {...register(`priceRange.luxury`)} label={'Luxury (e.g.: $100+ per night)'} onChange={() => {}} />
          </div>

          {/* Address */}
          <div>
            Address
            {/* Street address */}
            <Input type="text" {...register('address.street')} placeholder="Street address" />
            <Input type="text" {...register('address.city')} placeholder="Town / City" />
            <Input type="text" {...register('address.region')} placeholder="State / Region" />
            <Input type="text" {...register('address.postalCode')} placeholder="Postal Code" />
            <Input type="text" {...register('address.country')} placeholder="Country" />
          </div>

          {/* Contact Information */}
          <div>
            Contact Information
            <Input type="text" {...register('contact.website')} placeholder="Website" />
            <Input type="number" {...register('contact.phoneNumber')} placeholder="Phone Number" />
            <Input type="email" {...register('contact.email')} placeholder="Enter email" />
          </div>

          {/* Description */}
          <div>
            Description
            <Input
              type="text"
              {...register('description.tagline')}
              name="tagline"
              maxLength={50}
              placeholder="Tagline: Short & catchy"
            />
            <label>Describe about the accommodation</label>
            <RichTextEditor onContentChange={() => {}} />
            <label className="font-semibold">Highlights(upto 6)</label>
            <DynamicFields
              fields={[
                {
                  type: 'text',
                  name: 'highlight',
                  placeholder: 'Highlight',
                },
              ]}
              setValue={() => {}}
              max={6}
            />
          </div>

          {/* Languages spoken */}
          <div>
            <label className="font-semibold">Languages Spoken by staff</label>
            <Checkbox {...register(`languages.english`)} label={'English'} onChange={() => {}} />
            <Checkbox {...register(`languages.french`)} label={'French'} onChange={() => {}} />
            <Checkbox {...register(`languages.spanish`)} label={'Spanish'} onChange={() => {}} />
            <Checkbox {...register(`languages.portuguese`)} label={'Portuguese'} onChange={() => {}} />
            <Checkbox {...register(`languages.german`)} label={'German'} onChange={() => {}} />
            <Input type="text" {...register('languages.other')} placeholder="Others(specify)" required={false} />
          </div>

          {/* Business establishment */}
          <DateInput onChange={() => {}} />

          {/* Accommodation Policies */}
          <div>
            <label className="font-semibold">Policies</label>
            <RichTextEditor onContentChange={() => {}} />
          </div>

          {/* Dynamic Key-Value Pair Creation Operation seasons */}
          <div>
            <label className="font-semibold">Operating Seasons</label>
            <DynamicFields
              fields={[
                {
                  type: 'text',
                  name: 'title',
                  placeholder: 'Title',
                },
                {
                  type: 'text',
                  name: 'distance',
                  placeholder: 'Distance',
                },
              ]}
              setValue={setLandmarks}
            />
          </div>

          {/* Dynamic Key-Value Pair Creation Near by Attractions */}
          <div>
            <label className="font-semibold">Nearby Attractions</label>
            <DynamicFields
              fields={[
                {
                  type: 'text',
                  name: 'title',
                  placeholder: 'Title',
                },
                {
                  type: 'select',
                  name: 'distance',
                  placeholder: 'Distance',
                  options: [
                    {
                      value: 'voh',
                      label: 'Voh..',
                    },
                  ],
                },
              ]}
              setValue={setAttractions}
            />
          </div>

          {/* Payment Methods */}
          <div>
            <label className="block text-sm font-medium mb-1">Payment Accepted</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="checkbox" {...register('paymentMethods.card')} className="mr-2" />
                Card
              </label>
              <label className="flex items-center">
                <input type="checkbox" {...register('paymentMethods.cash')} className="mr-2" />
                Cash
              </label>
              <label className="flex items-center">
                <input type="checkbox" {...register('paymentMethods.online')} className="mr-2" />
                Online
              </label>
            </div>
          </div>

          {/* Accepted Cards Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Accepted Cards</label>
            <Dropdown
              iconVisible={true}
              placeholderText="Master Card"
              searchable={false}
              options={atmCards}
              action={() => {}}
              buttonStyles={'md:w-24 py-1 px-2 border'}
            />
          </div>

          {/* General Amenities */}
          <div>
            <AccordionSection
              pre={'generalAmenities'}
              title="General Amenities & Facilities"
              options={generalAmenities}
            />
            <AccordionSection pre={'utilitiesHookups'} title="Utilities & Hookups" options={utilitiesHookups} />
            <AccordionSection
              pre={'recreationalFacilities'}
              title="Recreational Facilities"
              options={recreationalFacilities}
            />
            <AccordionSection
              pre={'workConnectivity'}
              title="Work & Connectivity Features"
              options={workConnectivity}
            />
            <AccordionSection pre={'specialMenus'} title="Special Menus Available" options={specialMenus} />
            <AccordionSection pre={'travelSupport'} title="Travel & Adventure Support" options={travelSupport} />
            <AccordionSection
              pre={'ecoFriendlyPractices'}
              title="Eco-Friendly Practices"
              options={ecoFriendlyPractices}
            />
          </div>

          {/* Accommodation Images */}
          <div>
            <p className="block text-sm font-medium mb-1">Add some Photos</p>
            <FileUploadWithPreview control={control} />
          </div>

          {/* Amenities details */}
          {/* {(formType == 'hotel' || formType == 'resort' || formType == 'bed-and-breakfast') && <RoomsSection />}
        {formType == 'hostel' && <HostelsDormSection />}
        {formType == 'co-living' && <CoLivingRoomsSection />}
        {formType == 'vacation-rental' && <VacationRentalsSection />} */}

          {/* owner / manager Details */}
          <div>
            <label className="font-semibold">Owner / manager Details</label>
            <Input type="text" {...register('manager.name')} name="manager.name" placeholder="Full Name" />
            <Input type="text" {...register('manager.role')} name="manager.role" placeholder="Role(Owner / manager)" />
            <Input
              type="number"
              {...register('manager.phoneNumber')}
              name="manager.phoneNumber"
              placeholder="Phone Number"
            />
            <Input type="email" {...register('manager.email')} name="manager.email" placeholder="Email Address" />
            <Input
              type="text"
              name="manager.emergencyContact"
              {...register('manager.emergencyContact')}
              placeholder="Emergency Contact(optional)"
              required={false}
            />
            {/* TODO: Add field to upload passport / ID */}
          </div>

          {/* TODO: Add Consent and verification section */}

          {/* Submit Button */}
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormContext.Provider>
    </div>
  );
};

const AccordionSection: React.FC<{ title: string; options: Option[]; pre: string }> = ({ title, options, pre }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(new Array(options.length).fill(false));

  const register = useContext(FormContext);

  const handleChange = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = !updatedOptions[index];
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="border-b">
      <div className="cursor-pointer p-4 bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
        <h2>{title}</h2>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-100">
          {options.map((option, index) => (
            <Checkbox
              {...register(`amenities.${pre}.${option.value}`)}
              key={option.value}
              label={option.label}
              onChange={() => handleChange(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RoomsSection: React.FC = () => {
  // State for room and bathroom amenities
  const [roomAmenities, setRoomAmenities] = useState<{ [key: string]: boolean }>({
    tv: false,
    kitchen: false,
    coffeeTeaMaker: false,
    coffeeMachine: false,
    electricKettle: false,
    miniBar: false,
    hairdryer: false,
    safe: false,
    balcony: false,
    familyRooms: false,
    other: false,
  });

  const [bathroomAmenities, setBathroomAmenities] = useState<{ [key: string]: boolean }>({
    privateBathroom: false,
    sharedBathroom: false,
    bathtub: false,
    shower: false,
    walkInShower: false,
    showerChair: false,
    showerWithGrabRail: false,
    toiletWithGrabRail: false,
    towelsProvided: false,
    toiletriesProvided: false,
  });

  // Array of amenities with label and value for room amenities
  const roomAmenitiesList = [
    { label: 'TV', value: 'tv' },
    { label: 'Kitchen/Kitchenette', value: 'kitchen' },
    { label: 'Coffee/Tea Maker', value: 'coffeeTeaMaker' },
    { label: 'Coffee Machine', value: 'coffeeMachine' },
    { label: 'Electric Kettle', value: 'electricKettle' },
    { label: 'Mini Bar', value: 'miniBar' },
    { label: 'Hairdryer', value: 'hairdryer' },
    { label: 'Safe', value: 'safe' },
    { label: 'Balcony', value: 'balcony' },
    { label: 'Family Rooms', value: 'familyRooms' },
  ];

  // Array of amenities with label and value for bathroom amenities
  const bathroomAmenitiesList = [
    { label: 'Private Bathroom', value: 'privateBathroom' },
    { label: 'Shared Bathroom', value: 'sharedBathroom' },
    { label: 'Bathtub', value: 'bathtub' },
    { label: 'Shower', value: 'shower' },
    { label: 'Walk-in Shower', value: 'walkInShower' },
    { label: 'Shower Chair', value: 'showerChair' },
    { label: 'Shower with Grab Rail', value: 'showerWithGrabRail' },
    { label: 'Toilet with Grab Rail', value: 'toiletWithGrabRail' },
    { label: 'Towels Provided', value: 'towelsProvided' },
    { label: 'Toiletries Provided', value: 'toiletriesProvided' },
  ];

  // Generalized function to handle amenity change for both room and bathroom
  const handleAmenityChange = (type: 'room' | 'bathroom', value: string, checked: boolean) => {
    if (type === 'room') {
      setRoomAmenities((prev) => ({
        ...prev,
        [value]: checked,
      }));
    } else if (type === 'bathroom') {
      setBathroomAmenities((prev) => ({
        ...prev,
        [value]: checked,
      }));
    }
  };

  const { register } = useContext(FormContext);

  console.log(roomAmenities, bathroomAmenities);

  return (
    <div>
      <h2 className="font-semibold my-4">Room & Bathroom Details</h2>

      {/* Input fields */}
      <Input
        type="number"
        placeholder="Total Number of Beds"
        name="totalBeds"
        action={(value) => console.log('Total Beds:', value)}
      />
      <Input
        type="number"
        placeholder="Number of Rooms"
        name="numberOfRooms"
        action={(value) => console.log('Number of Rooms:', value)}
      />
      <Input
        type="number"
        placeholder="Number of Suites"
        name="numberOfSuites"
        action={(value) => console.log('Number of Suites:', value)}
      />

      {/* Room Amenities */}
      <div className="my-4">
        <h3 className="font-semibold">Room Amenities</h3>
        <div>
          {roomAmenitiesList.map((amenity) => (
            <Checkbox
              key={amenity.value}
              {...register(amenity.value)}
              label={amenity.label}
              onChange={(checked) => handleAmenityChange('room', amenity.value, checked)}
            />
          ))}
        </div>
      </div>

      {/* Bathroom Amenities */}
      <div className="my-4">
        <h3 className="font-semibold">Bathroom Amenities</h3>
        <div>
          {bathroomAmenitiesList.map((amenity) => (
            <Checkbox
              key={amenity.value}
              {...register(amenity.value)}
              label={amenity.label}
              onChange={(checked) => handleAmenityChange('bathroom', amenity.value, checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const HostelsDormSection: React.FC = () => {
  // State for dorm room type, dorm features, and private room features
  const [dormRoomType, setDormRoomType] = useState<{ [key: string]: boolean }>({
    mixedDorm: false,
    femaleDorm: false,
    maleDorm: false,
    other: false,
  });

  const [dormRoomFeatures, setDormRoomFeatures] = useState<{ [key: string]: boolean }>({
    lockers: false,
    readingLights: false,
    chargingPorts: false,
    curtainsForPrivacy: false,
    other: false,
  });

  const [privateRoomFeatures, setPrivateRoomFeatures] = useState<{ [key: string]: boolean }>({
    enSuiteBathroom: false,
    balcony: false,
    closetStorageSpace: false,
    tv: false,
    other: false,
  });

  // Arrays of objects for dorm room types, dorm features, and private room features
  const dormRoomTypeList = [
    { label: 'Mixed Dorm', value: 'mixedDorm' },
    { label: 'Female Dorm', value: 'femaleDorm' },
    { label: 'Male Dorm', value: 'maleDorm' },
  ];

  const dormRoomFeaturesList = [
    { label: 'Lockers', value: 'lockers' },
    { label: 'Reading Lights', value: 'readingLights' },
    { label: 'Charging Ports', value: 'chargingPorts' },
    { label: 'Curtains for Privacy', value: 'curtainsForPrivacy' },
  ];

  const privateRoomFeaturesList = [
    { label: 'En-Suite Bathroom', value: 'enSuiteBathroom' },
    { label: 'Balcony/Terrace', value: 'balcony' },
    { label: 'Closet/Storage Space', value: 'closetStorageSpace' },
    { label: 'TV', value: 'tv' },
  ];

  // Generalized change handler for dorm room type
  const handleDormRoomTypeChange = (value: string, checked: boolean) => {
    setDormRoomType((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // Generalized change handler for dorm room features
  const handleDormRoomFeaturesChange = (value: string, checked: boolean) => {
    setDormRoomFeatures((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // Generalized change handler for private room features
  const handlePrivateRoomFeaturesChange = (value: string, checked: boolean) => {
    setPrivateRoomFeatures((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const { register } = useContext(FormContext);

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Hostel Room & Bathroom Details</h2>

      {/* Input fields */}
      <Input
        type="number"
        placeholder="Total Number of Beds"
        name="totalBeds"
        action={(value) => console.log('Total Beds:', value)}
      />
      <Input
        type="number"
        placeholder="Number of Dormitory Rooms"
        name="numberOfDormRooms"
        action={(value) => console.log('Number of Dormitory Rooms:', value)}
      />

      {/* Dorm Room Type */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Dorm Room Type</h3>
        <div>
          {dormRoomTypeList.map((roomType) => (
            <Checkbox
              key={roomType.value}
              {...register(roomType.value)}
              label={roomType.label}
              onChange={(checked) => handleDormRoomTypeChange(roomType.value, checked)}
            />
          ))}
        </div>
      </div>

      {/* Dorm Room Features */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Dorm Room Features</h3>
        <div>
          {dormRoomFeaturesList.map((feature) => (
            <Checkbox
              key={feature.value}
              {...register(feature.value)}
              label={feature.label}
              onChange={(checked) => handleDormRoomFeaturesChange(feature.value, checked)}
            />
          ))}
        </div>
      </div>

      {/* Number of Shared Bathrooms */}
      <Input
        type="number"
        placeholder="Number of Shared Bathrooms"
        name="numberOfSharedBathrooms"
        action={(value) => console.log('Number of Shared Bathrooms:', value)}
      />

      {/* Number of Private Rooms */}
      <Input
        type="number"
        placeholder="Number of Private Rooms"
        name="numberOfPrivateRooms"
        action={(value) => console.log('Number of Private Rooms:', value)}
      />

      {/* Number of en-Suite Private Rooms */}
      <Input
        type="number"
        placeholder="Number of en-Suite Private Rooms"
        name="numberOfEnSuitePrivateRooms"
        action={(value) => console.log('Number of en-Suite Private Rooms:', value)}
      />

      {/* Private Room Features */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Private Room Features</h3>
        <div>
          {privateRoomFeaturesList.map((feature) => (
            <Checkbox
              key={feature.value}
              {...register(feature.value)}
              label={feature.label}
              onChange={(checked) => handlePrivateRoomFeaturesChange(feature.value, checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CoLivingRoomsSection: React.FC = () => {
  // State for bedroom features
  const [sharedBedroomFeatures, setSharedBedroomFeatures] = useState<{ [key: string]: boolean }>({
    balcony: false,
    closetStorageSpace: false,
    readingLights: false,
    chargingPorts: false,
    tv: false,
    wifi: false,
    airConditioning: false,
    workspace: false,
    other: false,
  });

  const [ensuiteBedroomFeatures, setEnsuiteBedroomFeatures] = useState<{ [key: string]: boolean }>({
    balcony: false,
    closetStorageSpace: false,
    readingLights: false,
    chargingPorts: false,
    tv: false,
    wifi: false,
    airConditioning: false,
    workspace: false,
    other: false,
  });

  console.log(ensuiteBedroomFeatures, sharedBedroomFeatures);
  const [commonAreasDescription, setCommonAreasDescription] = useState('');

  // Arrays for shared bedroom and ensuite bedroom features
  const sharedBedroomFeaturesList = [
    { label: 'Balcony/Terrace', value: 'balcony' },
    { label: 'Closet/Storage Space', value: 'closetStorageSpace' },
    { label: 'Reading Lights', value: 'readingLights' },
    { label: 'Charging Ports', value: 'chargingPorts' },
    { label: 'TV', value: 'tv' },
    { label: 'Wi-Fi', value: 'wifi' },
    { label: 'Air Conditioning/Heating', value: 'airConditioning' },
    { label: 'Workspace', value: 'workspace' },
  ];

  const ensuiteBedroomFeaturesList = [
    { label: 'Balcony/Terrace', value: 'balcony' },
    { label: 'Closet/Storage Space', value: 'closetStorageSpace' },
    { label: 'Reading Lights', value: 'readingLights' },
    { label: 'Charging Ports', value: 'chargingPorts' },
    { label: 'TV', value: 'tv' },
    { label: 'Wi-Fi', value: 'wifi' },
    { label: 'Air Conditioning/Heating', value: 'airConditioning' },
    { label: 'Workspace', value: 'workspace' },
  ];

  // Generalized change handlers for features
  const handleSharedBedroomFeaturesChange = (value: string, checked: boolean) => {
    setSharedBedroomFeatures((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleEnsuiteBedroomFeaturesChange = (value: string, checked: boolean) => {
    setEnsuiteBedroomFeatures((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const { register } = useContext(FormContext);

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Co-Living Room & Accommodation Details</h2>

      {/* Number of Bedrooms Available with Shared Bathrooms */}
      <Input
        type="number"
        placeholder="Number of Bedrooms Available with Shared Bathrooms"
        name="numberOfBedroomsWithSharedBathrooms"
        action={(value) => console.log('Number of Bedrooms with Shared Bathrooms:', value)}
      />

      {/* Bedroom Features with Shared Bathrooms */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Bedroom Features with Shared Bathrooms</h3>
        <div>
          {sharedBedroomFeaturesList.map((feature) => (
            <Checkbox
              key={feature.value}
              {...register(feature.value)}
              label={feature.label}
              onChange={(checked) => handleSharedBedroomFeaturesChange(feature.value, checked)}
            />
          ))}
        </div>
      </div>

      {/* Number of Shared Bathrooms */}
      <Input
        type="number"
        placeholder="Number of Shared Bathrooms"
        name="numberOfSharedBathrooms"
        action={(value) => console.log('Number of Shared Bathrooms:', value)}
      />

      {/* Number of En-Suite Bedrooms */}
      <Input
        type="number"
        placeholder="Number of En-Suite Bedrooms"
        name="numberOfEnsuiteBedrooms"
        action={(value) => console.log('Number of En-Suite Bedrooms:', value)}
      />

      {/* En-Suite Bedroom Features */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">En-Suite Bedroom Features</h3>
        <div>
          {ensuiteBedroomFeaturesList.map((feature) => (
            <Checkbox
              key={feature.value}
              {...register(feature.value)}
              label={feature.label}
              onChange={(checked) => handleEnsuiteBedroomFeaturesChange(feature.value, checked)}
            />
          ))}
        </div>
      </div>

      {/* Common Areas */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Common Areas</h3>
        <textarea
          placeholder="Describe the shared spaces (e.g., kitchen, lounge, gym)"
          value={commonAreasDescription}
          onChange={(e) => setCommonAreasDescription(e.target.value)}
          className="p-2 block flex-grow bg-transparent w-full border outline-none rounded-md focus:border-orange-500"
        />
      </div>
    </div>
  );
};

const VacationRentalsSection: React.FC = () => {
  // State for bedroom and bathroom features
  const [bedroomFeatures, setBedroomFeatures] = useState<{ [key: string]: boolean }>({
    enSuiteBathroom: false,
    balcony: false,
    closetStorageSpace: false,
    airConditioning: false,
  });

  const [bathroomFeatures, setBathroomFeatures] = useState<{ [key: string]: boolean }>({
    bathtub: false,
    shower: false,
    doubleSink: false,
    towelsAndToiletries: false,
  });

  // Arrays for bedroom and bathroom features
  const bedroomFeaturesList = [
    { label: 'En-Suite Bathroom', value: 'enSuiteBathroom' },
    { label: 'Balcony', value: 'balcony' },
    { label: 'Closet/Storage Space', value: 'closetStorageSpace' },
    { label: 'Air Conditioning', value: 'airConditioning' },
  ];

  const bathroomFeaturesList = [
    { label: 'Bathtub', value: 'bathtub' },
    { label: 'Shower', value: 'shower' },
    { label: 'Double Sink', value: 'doubleSink' },
    { label: 'Towels and Toiletries', value: 'towelsAndToiletries' },
  ];

  // Generalized change handlers for bedroom and bathroom features
  const handleBedroomFeaturesChange = (value: string, checked: boolean) => {
    setBedroomFeatures((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleBathroomFeaturesChange = (value: string, checked: boolean) => {
    setBathroomFeatures((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const { register } = useContext(FormContext);

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Vacation Rental Details</h2>

      {/* Max Occupancy */}
      <Input
        type="number"
        placeholder="Max Occupancy"
        name="maxOccupancy"
        action={(value) => console.log('Max Occupancy:', value)}
      />

      {/* Number of Bedrooms (with Bed Type) */}
      <Input
        type="text"
        placeholder="Number of Bedrooms"
        name="numberOfBedrooms"
        action={(value) => console.log('Number of Bedrooms:', value)}
      />

      {/* Number of En-suite Bedrooms (with Bed Type) */}
      <Input
        type="text"
        placeholder="Number of En-Suite Bedrooms"
        name="numberOfEnsuiteBedrooms"
        action={(value) => console.log('Number of En-Suite Bedrooms:', value)}
      />

      {/* Number of Separate Bathrooms */}
      <Input
        type="number"
        placeholder="Number of Separate Bathrooms"
        name="numberOfSeparateBathrooms"
        action={(value) => console.log('Number of Separate Bathrooms:', value)}
      />

      {/* Property Size */}
      <Input
        type="text"
        placeholder="Property Size (In sq. meters or feet)"
        className="text-sm"
        name="propertySize"
        action={(value) => console.log('Property Size:', value)}
      />

      {/* Outdoor Terrace Size */}
      <Input
        type="text"
        placeholder="Outdoor Terrace Size (In sq. meters or feet)"
        className="text-sm overflow-hidden"
        name="outdoorTerraceSize"
        action={(value) => console.log('Outdoor Terrace Size:', value)}
      />

      {/* Garden Size */}
      <Input
        type="text"
        placeholder="Garden Size (In sq. meters or feet)"
        name="gardenSize"
        action={(value) => console.log('Garden Size:', value)}
      />

      {/* Bedroom Features */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Bedroom Features</h3>
        <div>
          {bedroomFeaturesList.map((feature) => (
            <Checkbox
              key={feature.value}
              {...register(feature.value)}
              label={feature.label}
              onChange={(checked) => handleBedroomFeaturesChange(feature.value, checked)}
            />
          ))}
        </div>
      </div>

      {/* Bathroom Features */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Bathroom Features</h3>
        <div>
          {bathroomFeaturesList.map((feature) => (
            <Checkbox
              key={feature.value}
              {...register(feature.value)}
              label={feature.label}
              onChange={(checked) => handleBathroomFeaturesChange(feature.value, checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccommodationForm;
