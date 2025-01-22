import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FileUploadWithPreview from '@atoms/input-elements/file-upload-with-preview';
import Dropdown from '@atoms/dropdown/dropdown-search';
import Input from '@atoms/input-elements/input';
import DynamicFields from '@atoms/input-elements/dynamic-fields';
import Checkbox from '@/atoms/input-elements/checkbox';
import DateInput from '@/atoms/input-elements/date-input';
import Button from '@/atoms/custom-button/button';

export interface AccommodationFormInputs {
  name: string;
  address: string;
  website: string;
  phone_no: string;
  email: string;
  amount: string;
  images: FileList;
  about: {
    title: string;
    description: string;
  };
  policy: string[];
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
  };
  landmarks: { title: string; distance: string }[];
  attractions: { title: string; distance: string }[];
  location: {
    latitude: string;
    longitude: string;
  };
  amenities: {
    title: string;
    list: { title: string; description: string }[];
  };
  dynamicFields: { key: string; value: string }[]; // Dynamic Fields for Key-Value pairs
}

const AccommodationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccommodationFormInputs>({
    defaultValues: {
      dynamicFields: [{ key: '', value: '' }],
    },
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
    '24/7 Security',
    'CCTV Cameras',
    'Free Parking',
    'Paid Parking',
    'Electric Vehicle Charging Station',
    'Free Wi-Fi',
    'Wheelchair-Accessible Facilities',
    'Restrooms',
    'Showers',
    'Laundry facilities',
    'Shared Kitchen Facilities',
    'Smoking Allowed',
    'Alcohol Allowed',
    'Playground',
    'Pet- Friendly Spaces',
    'Breakfast Available for Purchase',
    'Salah Room (Muslim Prayer Room)',
    'Chapel',
    'Other (Specify)',
  ];

  const utilitiesHookups = ['Electricity', 'Water', 'Sewer', 'DumpStation', 'Wi-fi'];

  const recreationalFacilities = [
    'On-Site Café',
    'On-Site Bar',
    'Shared Lounge/TV Area',
    'Pool Table',
    'Table Tennis',
    'Library',
    'BBQ Grill',
    'Fire Pit',
    'Picnic Tables',
    'Swimming Pool',
    'Gym / Fitness Area',
    'Massage / Wellness Services',
    'Basketball',
    'Volleyball',
    'Weekly Events',
    'Cultural Events',
    'Other (Specify)',
  ];

  const workConnectivity = [
    'Co-Working Spaces',
    'Networking Opportunities',
    'Power Outlets & USB Ports',
    'Printing & Scanning Services',
    'High-Speed Wi-Fi',
    'Other (Specify)',
  ];

  const specialMenus = ['Dairy-Free', 'Gluten-Free', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Other (Specify)'];

  const travelSupport = [
    'Tour Desk',
    'Transport Services',
    'Travel Guides',
    'Storage for Outdoor Gear (e.g., Surfboards, Bicycles etc)',
    'Bicycles for rent',
    'Other (Specify)',
  ];

  const ecoFriendlyPractices = [
    'Green Certification',
    'Energy Usage Transparency',
    'Nature Inspired Design',
    'Green Spaces for Relaxation',
    'Energy Conservation (e.g., Solar Panels, LED Lighting, Energy Saving Appliances etc.)',
    'Water Conservation Measures (e.g., Low-flow showerheads, dual-flush toilets, etc.)',
    'Recycling Bins & Waste Management',
    'Eco-Friendly Toiletries',
    'Eco-Friendly Laundry Options',
    'Carbon Offset Programs',
    'Vegan & Vegetarian Options',
    'Eco- Conscious Transportation',
    'Plastic-Free Practices',
    'Water Bottle Refill Stations',
    'Use of Local Products',
    'Use of Organic Products',
    'Community Initiatives',
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Accommodation type */}
        <Input
          type="dropdown"
          name="accommodation_type"
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
          action={setFormType}
        />

        {/* Name */}
        <Input type="text" name="name" placeholder="Name" />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        {/* Brand */}
        {formType == 'hotel' ||
          formType == 'resort' ||
          (formType == 'bed-and-breakfast' && <Input type="text" name="brand" placeholder="Brand name" />)}

        {/* Star Rating */}
        {formType == 'hotel' ||
          formType == 'resort' ||
          (formType == 'bed-and-breakfast' && (
            <Input
              type="dropdown"
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
              required={false}
            />
          ))}

        {/* Property type/category */}
        {formType && propertyTypes[formType] && (
          <div>
            <label className="font-semibold">Property Type</label>
            {propertyTypes[formType].options.map((type) => (
              <Checkbox key={type.value} label={type.label} onChange={(checked) => (type.checked = checked)} />
            ))}
          </div>
        )}

        {/* Price Range / Amount */}
        <div>
          <label className="font-semibold">Price Range</label>
          <Checkbox label={'Budget (e.g.: $10 - $25 per night)'} onChange={() => {}} />
          <Checkbox label={'Mid-range (e.g.: $25 - $50 per night)'} onChange={() => {}} />
          <Checkbox label={'Upscale (e.g.: $50 - $100 per night)'} onChange={() => {}} />
          <Checkbox label={'Luxury (e.g.: $100+ per night)'} onChange={() => {}} />
        </div>

        {/* Address */}
        <div>
          Address
          {/* Street address */}
          <Input type="text" name="street" placeholder="Street address" />
          {/* Town / City */}
          <Input type="text" name="city" placeholder="Town / City" />
          {/* State / Region */}
          <Input type="text" name="region" placeholder="State / Region" />
          {/* Postal Code */}
          <Input type="text" name="postal_code" placeholder="Postal Code" />
          {/* Country */}
          <Input type="text" name="country" placeholder="Country" />
        </div>

        {/* Contact Information */}
        <div>
          Contact Information
          {/* Website */}
          <Input type="text" name="website" placeholder="Website" />
          {/* Phone Number */}
          <Input type="text" name="phone_no" placeholder="Phone Number" />
          {/* Email */}
          <Input type="email" name="email" placeholder="Enter email" />
        </div>

        {/* Description */}
        <div>
          Description
          <Input type="text" name="tagline" maxLength={50} placeholder="Tagline: Short & catchy" />
          <Input type="rich-text" name="description" placeholder="Description" />
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
          <Checkbox label={'English'} onChange={() => {}} />
          <Checkbox label={'French'} onChange={() => {}} />
          <Checkbox label={'Spanish'} onChange={() => {}} />
          <Checkbox label={'Portuguese'} onChange={() => {}} />
          <Checkbox label={'Arabic'} onChange={() => {}} />
          <Input type="text" name={'language'} placeholder="Others(specify)" required={false} />
        </div>

        {/* Business establishment */}
        <DateInput onChange={() => {}} />

        {/* Accommodation Policies */}
        <div>
          <label className="font-semibold">Policies</label>
          <Input type="rich-text" name="policy" placeholder="Accommodation Policies" />
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
          <AccordionSection title="General Amenities & Facilities" options={generalAmenities} />
          <AccordionSection title="Utilities & Hookups" options={utilitiesHookups} />
          <AccordionSection title="Recreational Facilities" options={recreationalFacilities} />
          <AccordionSection title="Work & Connectivity Features" options={workConnectivity} />
          <AccordionSection title="Special Menus Available" options={specialMenus} />
          <AccordionSection title="Travel & Adventure Support" options={travelSupport} />
          <AccordionSection title="Eco-Friendly Practices" options={ecoFriendlyPractices} />
        </div>

        {/* Accommodation Images */}
        <div>
          <p className="block text-sm font-medium mb-1">Add some Photos</p>
          <FileUploadWithPreview control={control} />
        </div>

        {/* Amenities details */}
        {(formType == 'hotel' || formType == 'resort' || formType == 'bed-and-breakfast') && <RoomsSection />}
        {formType == 'hostel' && <HostelsDormSection />}
        {formType == 'co-living' && <CoLivingRoomsSection />}
        {formType == 'vacation-rental' && <VacationRentalsSection />}

        {/* Owner / Manager Details */}
        <div>
          <label className="font-semibold">Owner / Manager Details</label>
          <Input type="text" name="manager.fullName" placeholder="Full Name" />
          <Input type="text" name="manager.role" placeholder="Role(Owner / Manager)" />
          <Input type="text" name="manager.phone_number" placeholder="Phone Number" />
          <Input type="text" name="manager.email" placeholder="Email Address" />
          <Input
            type="text"
            name="manager.emergency_contact"
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
    </div>
  );
};

const AccordionSection: React.FC<{ title: string; options: string[] }> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(new Array(options.length).fill(false));

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
            <Checkbox key={index} label={option} onChange={() => handleChange(index)} />
          ))}
        </div>
      )}
    </div>
  );
};

const RoomsSection: React.FC = () => {
  const [roomAmenities, setRoomAmenities] = useState<{
    tv: boolean;
    kitchen: boolean;
    coffeeTeaMaker: boolean;
    coffeeMachine: boolean;
    electricKettle: boolean;
    miniBar: boolean;
    hairdryer: boolean;
    safe: boolean;
    balcony: boolean;
    familyRooms: boolean;
    other: string;
  }>({
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
    other: '',
  });
  const [bathroomAmenities, setBathroomAmenities] = useState<{
    privateBathroom: boolean;
    sharedBathroom: boolean;
    bathtub: boolean;
    shower: boolean;
    walkInShower: boolean;
    showerChair: boolean;
    showerWithGrabRail: boolean;
    toiletWithGrabRail: boolean;
    towelsProvided: boolean;
    toiletriesProvided: boolean;
  }>({
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

  const handleRoomAmenityChange = (amenity: string, checked: boolean) => {
    setRoomAmenities((prev) => ({
      ...prev,
      [amenity]: checked,
    }));
  };

  const handleBathroomAmenityChange = (amenity: string, checked: boolean) => {
    setBathroomAmenities((prev) => ({
      ...prev,
      [amenity]: checked,
    }));
  };

  console.log(roomAmenities, bathroomAmenities);

  return (
    <div>
      <h2 className="font-semibold my-4">Room & Bathroom Details</h2>

      {/* Total Number of Beds */}
      <Input
        type="number"
        placeholder="Total Number of Beds"
        name="totalBeds"
        action={(value) => console.log('Total Beds:', value)}
      />

      {/* Number of Rooms */}
      <Input
        type="number"
        placeholder="Number of Rooms"
        name="numberOfRooms"
        action={(value) => console.log('Number of Rooms:', value)}
      />

      {/* Number of Suites */}
      <Input
        type="number"
        placeholder="Number of Suites"
        name="numberOfSuites"
        action={(value) => console.log('Number of Suites:', value)}
      />

      <div className="my-4">
        <h3 className="font-semibold">Room Amenities</h3>
        <div>
          <Checkbox label="TV" onChange={(checked) => handleRoomAmenityChange('tv', checked)} />
          <Checkbox label="Kitchen/Kitchenette" onChange={(checked) => handleRoomAmenityChange('kitchen', checked)} />
          <Checkbox
            label="Coffee/Tea Maker"
            onChange={(checked) => handleRoomAmenityChange('coffeeTeaMaker', checked)}
          />
          <Checkbox label="Coffee Machine" onChange={(checked) => handleRoomAmenityChange('coffeeMachine', checked)} />
          <Checkbox
            label="Electric Kettle"
            onChange={(checked) => handleRoomAmenityChange('electricKettle', checked)}
          />
          <Checkbox label="Mini Bar" onChange={(checked) => handleRoomAmenityChange('miniBar', checked)} />
          <Checkbox label="Hairdryer" onChange={(checked) => handleRoomAmenityChange('hairdryer', checked)} />
          <Checkbox label="Safe" onChange={(checked) => handleRoomAmenityChange('safe', checked)} />
          <Checkbox label="Balcony" onChange={(checked) => handleRoomAmenityChange('balcony', checked)} />
          <Checkbox label="Family Rooms" onChange={(checked) => handleRoomAmenityChange('familyRooms', checked)} />
        </div>
      </div>

      <div className="my-4">
        <h3 className="font-semibold">Bathroom Amenities</h3>
        <div>
          <Checkbox
            label="Private Bathroom"
            onChange={(checked) => handleBathroomAmenityChange('privateBathroom', checked)}
          />
          <Checkbox
            label="Shared Bathroom"
            onChange={(checked) => handleBathroomAmenityChange('sharedBathroom', checked)}
          />
          <Checkbox label="Bathtub" onChange={(checked) => handleBathroomAmenityChange('bathtub', checked)} />
          <Checkbox label="Shower" onChange={(checked) => handleBathroomAmenityChange('shower', checked)} />
          <Checkbox
            label="Walk-in Shower"
            onChange={(checked) => handleBathroomAmenityChange('walkInShower', checked)}
          />
          <Checkbox label="Shower Chair" onChange={(checked) => handleBathroomAmenityChange('showerChair', checked)} />
          <Checkbox
            label="Shower with Grab Rail"
            onChange={(checked) => handleBathroomAmenityChange('showerWithGrabRail', checked)}
          />
          <Checkbox
            label="Toilet with Grab Rail"
            onChange={(checked) => handleBathroomAmenityChange('toiletWithGrabRail', checked)}
          />
          <Checkbox
            label="Towels Provided"
            onChange={(checked) => handleBathroomAmenityChange('towelsProvided', checked)}
          />
          <Checkbox
            label="Toiletries Provided"
            onChange={(checked) => handleBathroomAmenityChange('toiletriesProvided', checked)}
          />
        </div>
      </div>
    </div>
  );
};

const HostelsDormSection: React.FC = () => {
  const [dormRoomType, setDormRoomType] = useState<{
    mixedDorm: boolean;
    femaleDorm: boolean;
    maleDorm: boolean;
    other: string;
  }>({
    mixedDorm: false,
    femaleDorm: false,
    maleDorm: false,
    other: '',
  });

  const [dormRoomFeatures, setDormRoomFeatures] = useState<{
    lockers: boolean;
    readingLights: boolean;
    chargingPorts: boolean;
    curtainsForPrivacy: boolean;
    other: string;
  }>({
    lockers: false,
    readingLights: false,
    chargingPorts: false,
    curtainsForPrivacy: false,
    other: '',
  });

  const [privateRoomFeatures, setPrivateRoomFeatures] = useState<{
    enSuiteBathroom: boolean;
    balcony: boolean;
    closetStorageSpace: boolean;
    tv: boolean;
    other: string;
  }>({
    enSuiteBathroom: false,
    balcony: false,
    closetStorageSpace: false,
    tv: false,
    other: '',
  });

  console.log(dormRoomFeatures, dormRoomType, privateRoomFeatures);

  const handleDormRoomTypeChange = (roomType: string, checked: boolean) => {
    setDormRoomType((prev) => ({
      ...prev,
      [roomType]: checked,
    }));
  };

  const handleDormRoomFeaturesChange = (feature: string, checked: boolean) => {
    setDormRoomFeatures((prev) => ({
      ...prev,
      [feature]: checked,
    }));
  };

  const handlePrivateRoomFeaturesChange = (feature: string, checked: boolean) => {
    setPrivateRoomFeatures((prev) => ({
      ...prev,
      [feature]: checked,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Hostel Room & Bathroom Details</h2>

      {/* Total Number of Beds */}
      <Input
        type="number"
        placeholder="Total Number of Beds"
        name="totalBeds"
        action={(value) => console.log('Total Beds:', value)}
      />

      {/* Number of Dormitory Rooms */}
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
          <Checkbox label="Mixed Dorm" onChange={(checked) => handleDormRoomTypeChange('mixedDorm', checked)} />
          <Checkbox label="Female Dorm" onChange={(checked) => handleDormRoomTypeChange('femaleDorm', checked)} />
          <Checkbox label="Male Dorm" onChange={(checked) => handleDormRoomTypeChange('maleDorm', checked)} />
        </div>
      </div>

      {/* Dorm Room Features */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Dorm Room Features</h3>
        <div>
          <Checkbox label="Lockers" onChange={(checked) => handleDormRoomFeaturesChange('lockers', checked)} />
          <Checkbox
            label="Reading Lights"
            onChange={(checked) => handleDormRoomFeaturesChange('readingLights', checked)}
          />
          <Checkbox
            label="Charging Ports"
            onChange={(checked) => handleDormRoomFeaturesChange('chargingPorts', checked)}
          />
          <Checkbox
            label="Curtains for Privacy"
            onChange={(checked) => handleDormRoomFeaturesChange('curtainsForPrivacy', checked)}
          />
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
          <Checkbox
            label="En-Suite Bathroom"
            onChange={(checked) => handlePrivateRoomFeaturesChange('enSuiteBathroom', checked)}
          />
          <Checkbox
            label="Balcony/Terrace"
            onChange={(checked) => handlePrivateRoomFeaturesChange('balcony', checked)}
          />
          <Checkbox
            label="Closet/Storage Space"
            onChange={(checked) => handlePrivateRoomFeaturesChange('closetStorageSpace', checked)}
          />
          <Checkbox label="TV" onChange={(checked) => handlePrivateRoomFeaturesChange('tv', checked)} />
        </div>
      </div>
    </div>
  );
};

const CoLivingRoomsSection: React.FC = () => {
  const [sharedBedroomFeatures, setSharedBedroomFeatures] = useState<{
    balcony: boolean;
    closetStorageSpace: boolean;
    readingLights: boolean;
    chargingPorts: boolean;
    tv: boolean;
    wifi: boolean;
    airConditioning: boolean;
    workspace: boolean;
    other: string;
  }>({
    balcony: false,
    closetStorageSpace: false,
    readingLights: false,
    chargingPorts: false,
    tv: false,
    wifi: false,
    airConditioning: false,
    workspace: false,
    other: '',
  });

  const [ensuiteBedroomFeatures, setEnsuiteBedroomFeatures] = useState<{
    balcony: boolean;
    closetStorageSpace: boolean;
    readingLights: boolean;
    chargingPorts: boolean;
    tv: boolean;
    wifi: boolean;
    airConditioning: boolean;
    workspace: boolean;
    other: string;
  }>({
    balcony: false,
    closetStorageSpace: false,
    readingLights: false,
    chargingPorts: false,
    tv: false,
    wifi: false,
    airConditioning: false,
    workspace: false,
    other: '',
  });

  console.log(ensuiteBedroomFeatures, sharedBedroomFeatures);
  const [commonAreasDescription, setCommonAreasDescription] = useState('');

  const handleSharedBedroomFeaturesChange = (feature: string, checked: boolean) => {
    setSharedBedroomFeatures((prev) => ({
      ...prev,
      [feature]: checked,
    }));
  };

  const handleEnsuiteBedroomFeaturesChange = (feature: string, checked: boolean) => {
    setEnsuiteBedroomFeatures((prev) => ({
      ...prev,
      [feature]: checked,
    }));
  };

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
          <Checkbox
            label="Balcony/Terrace"
            onChange={(checked) => handleSharedBedroomFeaturesChange('balcony', checked)}
          />
          <Checkbox
            label="Closet/Storage Space"
            onChange={(checked) => handleSharedBedroomFeaturesChange('closetStorageSpace', checked)}
          />
          <Checkbox
            label="Reading Lights"
            onChange={(checked) => handleSharedBedroomFeaturesChange('readingLights', checked)}
          />
          <Checkbox
            label="Charging Ports"
            onChange={(checked) => handleSharedBedroomFeaturesChange('chargingPorts', checked)}
          />
          <Checkbox label="TV" onChange={(checked) => handleSharedBedroomFeaturesChange('tv', checked)} />
          <Checkbox label="Wi-Fi" onChange={(checked) => handleSharedBedroomFeaturesChange('wifi', checked)} />
          <Checkbox
            label="Air Conditioning/Heating"
            onChange={(checked) => handleSharedBedroomFeaturesChange('airConditioning', checked)}
          />
          <Checkbox label="Workspace" onChange={(checked) => handleSharedBedroomFeaturesChange('workspace', checked)} />
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
          <Checkbox
            label="Balcony/Terrace"
            onChange={(checked) => handleEnsuiteBedroomFeaturesChange('balcony', checked)}
          />
          <Checkbox
            label="Closet/Storage Space"
            onChange={(checked) => handleEnsuiteBedroomFeaturesChange('closetStorageSpace', checked)}
          />
          <Checkbox
            label="Reading Lights"
            onChange={(checked) => handleEnsuiteBedroomFeaturesChange('readingLights', checked)}
          />
          <Checkbox
            label="Charging Ports"
            onChange={(checked) => handleEnsuiteBedroomFeaturesChange('chargingPorts', checked)}
          />
          <Checkbox label="TV" onChange={(checked) => handleEnsuiteBedroomFeaturesChange('tv', checked)} />
          <Checkbox label="Wi-Fi" onChange={(checked) => handleEnsuiteBedroomFeaturesChange('wifi', checked)} />
          <Checkbox
            label="Air Conditioning/Heating"
            onChange={(checked) => handleEnsuiteBedroomFeaturesChange('airConditioning', checked)}
          />
          <Checkbox
            label="Workspace"
            onChange={(checked) => handleEnsuiteBedroomFeaturesChange('workspace', checked)}
          />
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
  const [bedroomFeatures, setBedroomFeatures] = useState<{
    enSuiteBathroom: boolean;
    balcony: boolean;
    closetStorageSpace: boolean;
    airConditioning: boolean;
  }>({
    enSuiteBathroom: false,
    balcony: false,
    closetStorageSpace: false,
    airConditioning: false,
  });

  const [bathroomFeatures, setBathroomFeatures] = useState<{
    bathtub: boolean;
    shower: boolean;
    doubleSink: boolean;
    towelsAndToiletries: boolean;
  }>({
    bathtub: false,
    shower: false,
    doubleSink: false,
    towelsAndToiletries: false,
  });

  console.log(bedroomFeatures, bathroomFeatures);

  const handleBedroomFeaturesChange = (feature: string, checked: boolean) => {
    setBedroomFeatures((prev) => ({
      ...prev,
      [feature]: checked,
    }));
  };

  const handleBathroomFeaturesChange = (feature: string, checked: boolean) => {
    setBathroomFeatures((prev) => ({
      ...prev,
      [feature]: checked,
    }));
  };

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
          <Checkbox
            label="En-Suite Bathroom"
            onChange={(checked) => handleBedroomFeaturesChange('enSuiteBathroom', checked)}
          />
          <Checkbox label="Balcony" onChange={(checked) => handleBedroomFeaturesChange('balcony', checked)} />
          <Checkbox
            label="Closet/Storage Space"
            onChange={(checked) => handleBedroomFeaturesChange('closetStorageSpace', checked)}
          />
          <Checkbox
            label="Air Conditioning"
            onChange={(checked) => handleBedroomFeaturesChange('airConditioning', checked)}
          />
        </div>
      </div>

      {/* Bathroom Features */}
      <div className="my-4">
        <h3 className="text-xl font-semibold">Bathroom Features</h3>
        <div>
          <Checkbox label="Bathtub" onChange={(checked) => handleBathroomFeaturesChange('bathtub', checked)} />
          <Checkbox label="Shower" onChange={(checked) => handleBathroomFeaturesChange('shower', checked)} />
          <Checkbox label="Double Sink" onChange={(checked) => handleBathroomFeaturesChange('doubleSink', checked)} />
          <Checkbox
            label="Towels and Toiletries"
            onChange={(checked) => handleBathroomFeaturesChange('towelsAndToiletries', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AccommodationForm;
