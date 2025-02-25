import { t } from 'i18next';
import { title } from 'process';

export const generalAmenities = [
  { label: '24/7 Security', value: 'security24h' },
  { label: 'CCTV Cameras', value: 'cctvCameras' },
  { label: 'Free Parking', value: 'freeParking' },
  { label: 'Paid Parking', value: 'paidParking' },
  { label: 'Valet Parking', value: 'valetParking' },
  { label: 'Electric Vehicle Charging Station', value: 'electricVehicleChargingStation' },
  { label: 'Concierge Service', value: 'conciergeService' },
  { label: '24-Hour Front Desk', value: 'frontDesk24h' },
  { label: 'Free Wi-Fi', value: 'freeWiFi' },
  { label: 'Airport Shuttle Service', value: 'airportShuttleService' },
  { label: 'Luggage Storage', value: 'luggageStorage' },
  { label: 'Wheelchair-Accessible Facilities', value: 'wheelchairAccessibleFacilities' },
  { label: 'Upper Floors Accessible by Elevator', value: 'upperFloorsAccessibleByElevator' },
  { label: 'Room Service', value: 'roomService' },
  { label: 'Laundry Service', value: 'laundryService' },
  { label: 'Air Conditioning', value: 'airConditioning' },
  { label: 'Heating', value: 'heating' },
  { label: 'Breakfast Included', value: 'breakfastIncluded' },
  { label: 'Breakfast Available for Purchase', value: 'breakfastAvailableForPurchase' },
  { label: 'Salah Room (Muslim Prayer Room)', value: 'salahRoom' },
  { label: 'Chapel', value: 'chapel' },
  { label: 'Garden', value: 'garden' },
  { label: 'Terrace', value: 'terrace' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];

export const generalAmenitiesOptionsForHostelnCoLiving = [
  { value: 'frontDesk', label: '24/7 Front Desk' },
  { value: 'security', label: '24/7 Security' },
  { value: 'keyAccess', label: 'Key Card or Code Access to Rooms' },
  { value: 'cctv', label: 'CCTV Cameras' },
  { value: 'freeParking', label: 'Free Parking' },
  { value: 'paidParking', label: 'Paid Parking' },
  { value: 'evCharging', label: 'Electric Vehicle Charging Station' },
  { value: 'wheelchairAccess', label: 'Wheelchair Access' },
  { value: 'elevator', label: 'Elevator' },
  { value: 'freeWiFi', label: 'Free Wi-Fi' },
  { value: 'luggageStorage', label: 'Luggage Storage' },
  { value: 'lockers', label: 'Lockers' },
  { value: 'safetyDepositBox', label: 'Safety Deposit Box' },
  { value: 'laundryFacilities', label: 'Laundry Facilities' },
  { value: 'cleaningServices', label: 'Cleaning Services' },
  { value: 'sharedKitchen', label: 'Shared Kitchen' },
  { value: 'smokingAllowed', label: 'Smoking Allowed' },
  { value: 'alcoholAllowed', label: 'Alcohol Allowed' },
  { value: 'petsAllowed', label: 'Pets Allowed' },
  { value: 'linenProvided', label: 'Linen Provided' },
  { value: 'towelsProvided', label: 'Towels Provided' },
  { value: 'airConditioning', label: 'Air Conditioning' },
  { value: 'heating', label: 'Heating' },
  { value: 'freeBreakfast', label: 'Free Breakfast' },
  { value: 'breakfastAvailable', label: 'Breakfast Available for Purchase' },
  { value: 'salahRoom', label: 'Salah Room (Muslim Prayer Room)' },
  { value: 'chapel', label: 'Chapel' },
  { value: 'otherSpecify', label: 'Other (Specify)' },
];
export const generalAmenitiesOptionsForRental = [
  { value: 'frontDesk', label: '24/7 Front Desk' },
  { value: 'security', label: '24/7 Security' },
  { value: 'keyAccess', label: 'Key Card or Code Access to Rooms' },
  { value: 'cctv', label: 'CCTV Cameras' },
  { value: 'freeParking', label: 'Free Parking' },
  { value: 'paidParking', label: 'Paid Parking' },
  { value: 'streetParking', label: 'Street Parking' },
  { value: 'noParking', label: 'No Parking Available' },
  { value: 'garageParking', label: 'Garage for Parking' },
  { value: 'valetParking', label: 'Valet Parking' },
  { value: 'evCharging', label: 'Electric Vehicle Charging Station' },
  { value: 'wheelchairAccess', label: 'Wheelchair Access' },
  { value: 'elevator', label: 'Elevator' },
  { value: 'freeWiFi', label: 'Free Wi-Fi' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'airConditioning', label: 'Air Conditioning' },
  { value: 'heating', label: 'Heating' },
  { value: 'petsAllowed', label: 'Pets Allowed' },
  { value: 'fireplace', label: 'Fireplace' },
  { value: 'cableSatelliteTV', label: 'Cable/Satellite TV' },
  { value: 'gymFitness', label: 'Gym/Fitness Area' },
  { value: 'otherSpecify', label: 'Other (Specify)' },
];

export const generalAmenitiesOptionsForCampground = [
  { label: '24/7 Security', value: 'security' },
  { label: 'CCTV Cameras', value: 'cctv' },
  { label: 'Free Parking', value: 'freeParking' },
  { label: 'Paid Parking', value: 'paidParking' },
  { label: 'Electric Vehicle Charging Station', value: 'evCharging' },
  { label: 'Free Wi-Fi', value: 'freeWiFi' },
  { label: 'Wheelchair-Accessible Facilities', value: 'wheelchairAccess' },
  { label: 'Restrooms', value: 'restrooms' },
  { label: 'Showers', value: 'showers' },
  { label: 'Laundry Facilities', value: 'laundryFacilities' },
  { label: 'Shared Kitchen Facilities', value: 'sharedKitchen' },
  { label: 'Smoking Allowed', value: 'smokingAllowed' },
  { label: 'Alcohol Allowed', value: 'alcoholAllowed' },
  { label: 'Playground', value: 'playground' },
  { label: 'Pet-Friendly Spaces', value: 'petFriendly' },
  { label: 'Breakfast Available for Purchase', value: 'breakfastAvailable' },
  { label: 'Salah Room (Muslim Prayer Room)', value: 'salahRoom' },
  { label: 'Chapel', value: 'chapel' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];

const utilitiesOptions = [
  { label: 'Electricity', value: 'electricity' },
  { label: 'Water', value: 'water' },
  { label: 'Sewer', value: 'sewer' },
  { label: 'Dump Station', value: 'dumpStation' },
  { label: 'Wi-Fi', value: 'wifi' },
];

const livingAreasOptions = [
  { label: 'Living Room', value: 'livingRoom' },
  { label: 'Dining Area', value: 'diningArea' },
  { label: 'Workspace/Office', value: 'workspaceOffice' },
  { label: 'Family/TV Room', value: 'familyTvRoom' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];
const kitchenAmenitiesOptions = [
  { label: 'Fully Equipped Kitchen', value: 'fullyEquippedKitchen' },
  { label: 'Refrigerator', value: 'refrigerator' },
  { label: 'Stove/Oven', value: 'stoveOven' },
  { label: 'Microwave', value: 'microwave' },
  { label: 'Dishwasher', value: 'dishwasher' },
  { label: 'Coffee Maker', value: 'coffeeMaker' },
  { label: 'Toaster', value: 'toaster' },
  { label: 'Washing Machine', value: 'washingMachine' },
  { label: 'Dryer', value: 'dryer' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];
const outdoorFacilitiesOptions = [
  { label: 'Private Pool', value: 'privatePool' },
  { label: 'Shared Pool', value: 'sharedPool' },
  { label: 'Hot Tub/Jacuzzi', value: 'hotTubJacuzzi' },
  { label: 'BBQ/Grill Area', value: 'bbqGrillArea' },
  { label: 'Garden/Lawn', value: 'gardenLawn' },
  { label: 'Patio/Terrace', value: 'patioTerrace' },
  { label: 'Outdoor Dining Area', value: 'outdoorDiningArea' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];

export const barDiningOptions = [
  { label: 'Bar/Lounge', value: 'barLounge' },
  { label: 'Pool Bar', value: 'poolBar' },
  { label: 'Number of Restaurants & Cuisine Types (Specify)', value: 'otherSpecify' },
];

export const specialMenusOptions = [
  { label: 'Dairy-Free', value: 'dairyFree' },
  { label: 'Gluten-Free', value: 'glutenFree' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Halal', value: 'halal' },
  { label: 'Kosher', value: 'kosher' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];
export const wellnessRecreationalOptions = [
  { label: 'Indoor Swimming Pool', value: 'indoorSwimmingPool' },
  { label: 'Outdoor Swimming Pool', value: 'outdoorSwimmingPool' },
  { label: 'Spa Services', value: 'spaServices' },
  { label: 'Fitness Center/Gym', value: 'fitnessCenterGym' },
  { label: 'Tennis Court', value: 'tennisCourt' },
  { label: 'Golf Course', value: 'golfCourse' },
  { label: 'Kids’ Club', value: 'kidsClub' },
  { label: 'Kids’ Play Area', value: 'kidsPlayArea' },
  { label: 'Other Sport Facilities (Specify)', value: 'otherSpecify' },
  { label: 'Cultural Events', value: 'culturalEvents' },
  { label: 'N/A', value: 'notApplicable' },
];
const wellnessComfortAmenitiesForHostel = [
  { label: 'Gym / Fitness Area', value: 'gymFitnessArea' },
  { label: 'Swimming Pool', value: 'swimmingPool' },
  { label: 'Massage / Wellness Services', value: 'massageWellnessServices' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];
export const recreationalFacilitieOptionsForHostel = [
  { label: 'On-Site Café', value: 'onSiteCafe' },
  { label: 'On-Site Bar', value: 'onSiteBar' },
  { label: 'Shared Lounge/TV Area', value: 'sharedLounge' },
  { label: 'Game & Entertainment', value: 'gameEntertainment' },
  { label: 'Pool Table', value: 'poolTable' },
  { label: 'Table Tennis', value: 'tableTennis' },
  { label: 'Library', value: 'library' },
  { label: 'Rooftop/Outdoor Terrace', value: 'rooftopTerrace' },
  { label: "Kids' Play Area", value: 'kidsPlayArea' },
  { label: 'BBQ Area', value: 'bbqArea' },
  { label: 'Weekly Events', value: 'weeklyEvents' },
  { label: 'Cultural Events', value: 'culturalEvents' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];

const recreationalAmenitiesForRental = [
  { label: 'Pool Table', value: 'poolTable' },
  { label: 'Game Console', value: 'gameConsole' },
  { label: 'Board Games', value: 'boardGames' },
];

export const travelAdventureSupportOptions = [
  { label: 'Tour Desk', value: 'tourDesk' },
  { label: 'Guided Tours or Excursions', value: 'guidedTours' },
  { label: 'Private Tour Guides', value: 'privateTourGuides' },
  { label: 'Transport Services (Courtesy Bus/Car Service)', value: 'transportServices' },
  { label: 'Vehicles Available for Rent', value: 'vehiclesForRent' },
  { label: 'Bicycles Available for Rent', value: 'bicyclesForRent' },
  { label: 'Storage for Outdoor Gear (e.g., Surfboards, Bicycles, etc.)', value: 'storageForOutdoorGear' },
  { label: 'Other (Specify)', value: 'otherSpecify' }, // Input field for additional options
];
const travelAdventureSupportOpionsForHostel = [
  { label: 'Tour Desk', value: 'tourDesk' },
  { label: 'Transport Services', value: 'transportServices' },
  { label: 'Travel Guides', value: 'travelGuides' },
  { label: 'Storage for Outdoor Gear (e.g., Surfboards, Bicycles etc)', value: 'outdoorGearStorage' },
  { label: 'Bicycles for Rent', value: 'bicyclesForRent' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];
const travelAdventureSupportOpionsForCoLiving = [
  { label: 'Transport Services', value: 'transportServices' },
  { label: 'Storage for Outdoor Gear (e.g., Surfboards, Bicycles etc)', value: 'outdoorGearStorage' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];

export const workConnectivityOptions = [
  { label: 'Co-Working Spaces', value: 'coWorkingSpaces' },
  { label: 'Fully Equipped Business Center', value: 'businessCenter' },
  { label: 'Networking Opportunities', value: 'networkingOpportunities' },
  { label: 'Printing & Scanning Services', value: 'printingScanningServices' },
  { label: 'Power Outlets & USB Ports', value: 'powerOutletsUSBPorts' },
  { label: 'High-Speed Wi-Fi', value: 'highSpeedWiFi' },
  { label: 'Translators', value: 'translators' },
  { label: 'Other (Specify)', value: 'otherSpecify' }, // Input field for additional options
];
export const workConnectivityOptionsForHostel = [
  { label: 'Co-Working Spaces', value: 'coWorkingSpaces' },
  { label: 'Networking Opportunities', value: 'networkingOpportunities' },
  { label: 'Power Outlets & USB Ports', value: 'powerOutletsUsbPorts' },
  { label: 'Printing & Scanning Services', value: 'printingScanningServices' },
  { label: 'High-Speed Wi-Fi', value: 'highSpeedWiFi' },
  { label: 'Other (Specify)', value: 'otherSpecify' },
];

export const meetingRoomsOptions = [
  { label: 'Number of Rooms (Specify)', value: 'numberOfRooms', input: true },
  { label: 'Max Capacity (Specify)', value: 'maxCapacity', input: true },
];

export const eventServicesOptions = [
  { label: 'Weddings', value: 'weddings' },
  { label: 'Corporate Events', value: 'corporateEvents' },
  { label: 'Banquets', value: 'banquets' },
  { label: 'Other (Specify)', value: 'otherSpecify' }, // Input field
];

export const ecoFriendlyPractices = [
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

export const ecoFriendlyPracticesForRental = [
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

  { label: 'Community Initiatives', value: 'communityInitiatives' },
  { label: 'Other (Specify)', value: 'otherSpecify' }, // Input field
];

export const nameLabels: Record<string, string> = {
  hotel: 'Property Name',
  resort: 'Property Name',
  'bed-and-breakfast': 'Property Name',
  hostel: 'Hostel Name',
  'co-living': 'Property Name',
  campground: 'Campground Name',
  'vacation-rental': 'Property Name',
};
export const categoryLabels: Record<string, string> = {
  hotel: 'Category',
  hostel: 'Hostel Type',
  'bed-and-breakfast': 'Category',
  campground: 'Campground Type',
  resort: 'Category',
  'co-living': 'Propery Type',
  'vacation-rental': 'Property Type',
};

export const policyLabels: Record<string, string> = {
  hotel: 'Hotel Policies',
  resort: 'Resort Policies',
  'bed-and-breakfast': 'B&B Policies',
  hostel: 'Hostel Policies',
  'co-living': 'Co-Living Policies',
  campground: 'Campground Policies',
  'vacation-rental': 'Rental Policies',
};

export const priceRangeOptions: Record<string, { key: string; label: string }[]> = {
  hotel: [
    { key: 'budget', label: 'Budget (e.g.: $20 - $50 per night)' },
    { key: 'midRange', label: 'Mid-range (e.g.: $50 - $150 per night)' },
    { key: 'upScale', label: 'Upscale (e.g.: $150 - $300 per night)' },
    { key: 'luxury', label: 'Luxury (e.g.: $300+ per night)' },
  ],
  resort: [
    { key: 'budget', label: 'Budget (e.g.: $20 - $50 per night)' },
    { key: 'midRange', label: 'Mid-range (e.g.: $50 - $150 per night)' },
    { key: 'upScale', label: 'Upscale (e.g.: $150 - $300 per night)' },
    { key: 'luxury', label: 'Luxury (e.g.: $300+ per night)' },
  ],
  'bed-and-breakfast': [
    { key: 'budget', label: 'Budget (e.g.: $20 - $50 per night)' },
    { key: 'midRange', label: 'Mid-range (e.g.: $50 - $150 per night)' },
    { key: 'upScale', label: 'Upscale (e.g.: $150 - $300 per night)' },
    { key: 'luxury', label: 'Luxury (e.g.: $300+ per night)' },
  ],
  hostel: [
    { key: 'budget', label: 'Budget (e.g., $10 - $20 per night)' },
    { key: 'midRange', label: 'Mid-range (e.g., $20 - $50 per night)' },
    { key: 'upScale', label: 'Upscale (e.g., $50 - $100 per night)' },
    { key: 'luxury', label: 'Luxury (e.g., $100+ per night)' },
  ],
  'co-living': [
    { key: 'budget', label: 'Budget (e.g., $10 - $30 per night)' },
    { key: 'midRange', label: 'Mid-range (e.g., $30 - $70 per night)' },
    { key: 'upScale', label: 'Upscale (e.g., $70 - $150 per night)' },
    { key: 'luxury', label: 'Luxury (e.g., $150+ per night)' },
  ],
  campground: [
    { key: 'budget', label: 'Budget (e.g., $10 - $25 per night)' },
    { key: 'midRange', label: 'Mid-range (e.g., $25 - $50 per night)' },
    { key: 'upScale', label: 'Upscale (e.g., $50 - $100 per night)' },
    { key: 'luxury', label: 'Luxury (e.g., $100+ per night)' },
  ],
  'vacation-rental': [
    { key: 'budget', label: 'Budget (e.g., $30 - $70 per night)' },
    { key: 'midRange', label: 'Mid-range (e.g., $70 - $150 per night)' },
    { key: 'upScale', label: 'Upscale (e.g., $150 - $300 per night)' },
    { key: 'luxury', label: 'Luxury (e.g., $300+ per night)' },
  ],
};

export const amenitiesMapping: Record<string, Record<string, any>> = {
  hotel: {
    generalAmenities: { zero: 'amenities', options: generalAmenities, title: 'General Amenities & Facilities' },
    barDining: { zero: 'amenities', options: barDiningOptions, title: 'Bar & Dining Options' },
    specialMenus: { zero: 'amenities', options: specialMenusOptions, title: 'Special Menus Available' },
    recreational: { zero: 'amenities', options: wellnessRecreationalOptions, title: 'Wellness & Recreational' },
    travelAdventureSupport: {
      zero: 'amenities',
      options: travelAdventureSupportOptions,
      title: 'Travel & Adventure Support',
    },
    workConnectivity: { zero: 'amenities', options: workConnectivityOptions, title: 'Work & Connectivity' },
    meetingRooms: { zero: 'amenities', options: meetingRoomsOptions, title: 'Meeting Rooms/Conference Hall' },
    eventServices: { zero: 'amenities', options: eventServicesOptions, title: 'Event Services Offered' },
    ecoFriendlyPractices: { zero: 'amenities', options: ecoFriendlyPractices, title: 'Eco-Friendly Practices' },
  },
  'bed-and-breakfast': {
    generalAmenities: { zero: 'amenities', options: generalAmenities, title: 'General Amenities & Facilities' },
    barDining: { zero: 'amenities', options: barDiningOptions, title: 'Bar & Dining Options' },
    specialMenus: { zero: 'amenities', options: specialMenusOptions, title: 'Special Menus Available' },
    recreational: { zero: 'amenities', options: wellnessRecreationalOptions, title: 'Wellness & Recreational' },
    travelAdventureSupport: {
      zero: 'amenities',
      options: travelAdventureSupportOptions,
      title: 'Travel & Adventure Support',
    },
    workConnectivity: { zero: 'amenities', options: workConnectivityOptions, title: 'Work & Connectivity' },
    meetingRooms: { zero: 'amenities', options: meetingRoomsOptions, title: 'Meeting Rooms/Conference Hall' },
    eventServices: { zero: 'amenities', options: eventServicesOptions, title: 'Event Services Offered' },
    ecoFriendlyPractices: { zero: 'amenities', options: ecoFriendlyPractices, title: 'Eco-Friendly Practices' },
  },
  resort: {
    generalAmenities: { zero: 'amenities', options: generalAmenities, title: 'General Amenities & Facilities' },
    barDining: { zero: 'amenities', options: barDiningOptions, title: 'Bar & Dining Options' },
    specialMenus: { zero: 'amenities', options: specialMenusOptions, title: 'Special Menus Available' },
    recreational: { zero: 'amenities', options: wellnessRecreationalOptions, title: 'Wellness & Recreational' },
    travelAdventureSupport: {
      zero: 'amenities',
      options: travelAdventureSupportOptions,
      title: 'Travel & Adventure Support',
    },
    workConnectivity: { zero: 'amenities', options: workConnectivityOptions, title: 'Work & Connectivity' },
    meetingRooms: { zero: 'amenities', options: meetingRoomsOptions, title: 'Meeting Rooms/Conference Hall' },
    eventServices: { zero: 'amenities', options: eventServicesOptions, title: 'Event Services Offered' },
    ecoFriendlyPractices: { zero: 'amenities', options: ecoFriendlyPractices, title: 'Eco-Friendly Practices' },
  },
  hostel: {
    generalAmenities: {
      zero: 'amenitiesForHostel',
      options: generalAmenitiesOptionsForHostelnCoLiving,
      title: 'General Amenities & Facilities',
    },
    recreational: {
      zero: 'amenitiesForHostel',
      options: recreationalFacilitieOptionsForHostel,
      title: 'Recreational Facilities',
    },
    workConnectivity: {
      zero: 'amenitiesForHostel',
      options: workConnectivityOptionsForHostel,
      title: 'Work & Connectivity Features',
    },
    wellness: {
      zero: 'amenitiesForHostel',
      options: wellnessComfortAmenitiesForHostel,
      title: 'Wellness & Comfort Amenities',
    },
    specialMenus: { zero: 'amenitiesForHostel', options: specialMenusOptions, title: 'Special Menus Available' },
    travelAdventureSupport: {
      zero: 'amenitiesForHostel',
      options: travelAdventureSupportOpionsForHostel,
      title: 'Travel & Adventure Support',
    },
    ecoFriendlyPractices: {
      zero: 'amenitiesForHostel',
      options: ecoFriendlyPractices,
      title: 'Eco-Friendly Practices',
    },
  },
  'co-living': {
    generalAmenities: {
      zero: 'amenitiesForCoLiving',
      options: generalAmenitiesOptionsForHostelnCoLiving,
      title: 'General Amenities & Facilities',
    },
    recreational: {
      zero: 'amenitiesForCoLiving',
      options: recreationalFacilitieOptionsForHostel,
      title: 'Recreational Facilities',
    },
    workConnectivity: {
      zero: 'amenitiesForCoLiving',
      options: workConnectivityOptionsForHostel,
      title: 'Work & Connectivity Features',
    },
    wellness: {
      zero: 'amenitiesForCoLiving',
      options: wellnessComfortAmenitiesForHostel,
      title: 'Wellness & Comfort Amenities',
    },
    specialMenus: { zero: 'amenitiesForCoLiving', options: specialMenusOptions, title: 'Special Menus Available' },
    travelAdventureSupport: {
      zero: 'amenitiesForCoLiving',
      options: travelAdventureSupportOpionsForCoLiving,
      title: 'Travel & Adventure Support',
    },
    ecoFriendlyPractices: {
      zero: 'amenitiesForCoLiving',
      options: ecoFriendlyPractices,
      title: 'Eco-Friendly Practices',
    },
  },
  campground: {
    generalAmenities: {
      zero: 'amenitiesForCampground',
      options: generalAmenitiesOptionsForCampground,
      title: 'General Amenities & Facilities',
    },
    recreational: {
      zero: 'amenitiesForCampground',
      options: recreationalFacilitieOptionsForHostel,
      title: 'Recreational Facilities',
    },
    workConnectivity: {
      zero: 'amenitiesForCampground',
      options: workConnectivityOptionsForHostel,
      title: 'Work & Connectivity Features',
    },
    utilities: {
      zero: 'amenitiesForCampground',
      options: utilitiesOptions,
      title: 'Utilities & Hookups',
    },
    specialMenus: { zero: 'amenitiesForCampground', options: specialMenusOptions, title: 'Special Menus Available' },
    travelAdventureSupport: {
      zero: 'amenitiesForCampground',
      options: travelAdventureSupportOpionsForCoLiving,
      title: 'Travel & Adventure Support',
    },
    ecoFriendlyPractices: {
      zero: 'amenitiesForCampground',
      options: ecoFriendlyPractices,
      title: 'Eco-Friendly Practices',
    },
  },
  'vacation-rental': {
    generalAmenities: {
      zero: 'amenitiesForRental',
      options: generalAmenitiesOptionsForRental,
      title: 'General Amenities & Facilities',
    },
    livingArea: { zero: 'amenitiesForRental', options: livingAreasOptions, title: 'Living Areas' },
    kitchen: { zero: 'amenitiesForRental', options: kitchenAmenitiesOptions, title: 'Kitchen' },
    outdoorFacilities: { zero: 'amenitiesForRental', options: outdoorFacilitiesOptions, title: 'Outdoor Facilities' },
    recreational: {
      zero: 'amenitiesForRental',
      options: recreationalAmenitiesForRental,
      title: 'Recreational Amenities',
    },
    ecoFriendlyPractices: {
      zero: 'amenitiesForRental',
      options: ecoFriendlyPracticesForRental,
      title: 'Eco-Friendly Practices',
    },
  },
};

export const getAmenitiesConfig = (formType: string, amenityType: string) => {
  const key = formType;
  return amenitiesMapping[key]?.[amenityType];
};
