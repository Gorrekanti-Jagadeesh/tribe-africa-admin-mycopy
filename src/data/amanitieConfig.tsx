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
  category: string;
  locationType: {
    beach: string;
    mountain: string;
    river: string;
    lakeside: string;
    desert: string;
    island: string;
    urban: string;
    other: string;
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
    socialMedia?: string;
  };
  description: {
    tagline: string;
    description: string;
    highlights: string[];
  };
  languages: {
    arabic: boolean;
    english: boolean;
    french: boolean;
    spanish: boolean;
    portuguese: boolean;
    german: boolean;
    mandarin: boolean;
    bahasa: boolean;
    other?: string;
  };
  establishedIn: string;
  policy: {
    cancellation: {
      freeCancellation: boolean;
      nonRefundable: boolean;
      description?: string;
    };
    securityDeposit: {
      hasDeposit: boolean;
      amount?: string;
      conditions?: string;
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
  operatingSeason: {
    isYearRound: boolean; // true if open year-round, false if seasonal
    seasonalMonths?: string; // Specify seasonal months
    lowSeason?: string; // Specify low season months
    highSeason?: string; //
  }[];
  location: {
    latitude: string;
    longitude: string;
  };
  amenities: {
    generalAmenities: {
      security24h: boolean;
      cctvCameras: boolean;
      freeParking: boolean;
      paidParking: boolean;
      valetParking: boolean;
      electricVehicleChargingStation: boolean;
      conciergeService: boolean;
      frontDesk24h: boolean;
      freeWiFi: boolean;
      airportShuttleService: boolean;
      luggageStorage: boolean;
      wheelchairAccessibleFacilities: boolean;
      upperFloorsAccessibleByElevator: boolean;
      roomService: boolean;
      laundryService: boolean;
      airConditioning: boolean;
      heating: boolean;
      breakfastIncluded: boolean;
      breakfastAvailableForPurchase: boolean;
      salahRoom: boolean;
      chapel: boolean;
      garden: boolean;
      terrace: boolean;
      otherSpecify: string;
    };
    barDining: {
      barLounge: boolean;
      poolBar: boolean;
      otherSpecify: string;
    };
    specialMenus: {
      dairyFree: boolean;
      glutenFree: boolean;
      vegetarian: boolean;
      vegan: boolean;
      halal: boolean;
      kosher: boolean;
      otherSpecify: string;
    };
    recreational: {
      indoorSwimmingPool: boolean;
      outdoorSwimmingPool: boolean;
      spaServices: boolean;
      fitnessCenterGym: boolean;
      tennisCourt: boolean;
      golfCourse: boolean;
      kidsClub: boolean;
      kidsPlayArea: boolean;
      otherSpecify: string;
      culturalEvents: boolean;
      notApplicable: boolean;
    };
    travelAdventureSupport: {
      tourDesk: boolean;
      guidedTours: boolean;
      privateTourGuides: boolean;
      transportServices: boolean; // Courtesy Bus/Car Service
      vehiclesForRent: boolean;
      bicyclesForRent: boolean;
      storageForOutdoorGear: boolean; // Surfboards, Bicycles, etc.
      otherSpecify?: string; // Optional string input for additional options
    };
    workConnectivity: {
      coWorkingSpaces: boolean;
      businessCenter: boolean;
      networkingOpportunities: boolean;
      printingScanningServices: boolean;
      powerOutletsUSBPorts: boolean;
      highSpeedWiFi: boolean;
      translators: boolean;
      otherSpecify?: string; // Optional string input for additional options
    };

    meetingRooms: {
      numberOfRooms?: string; // Number of meeting rooms (input field)
      maxCapacity?: string; // Maximum capacity (input field)
    };

    eventServices: {
      weddings?: boolean;
      corporateEvents?: boolean;
      banquets?: boolean;
      otherSpecify?: string; // Input field for specifying other event services
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
  amenitiesForHostel: {
    generalAmenities: {
      frontDesk: boolean;
      security: boolean;
      keyAccess: boolean;
      cctv: boolean;
      freeParking: boolean;
      paidParking: boolean;
      evCharging: boolean;
      wheelchairAccess: boolean;
      elevator: boolean;
      freeWiFi: boolean;
      luggageStorage: boolean;
      lockers: boolean;
      safetyDepositBox: boolean;
      laundryFacilities: boolean;
      cleaningServices: boolean;
      sharedKitchen: boolean;
      smokingAllowed: boolean;
      alcoholAllowed: boolean;
      petsAllowed: boolean;
      linenProvided: boolean;
      towelsProvided: boolean;
      airConditioning: boolean;
      heating: boolean;
      freeBreakfast: boolean;
      breakfastAvailable: boolean;
      salahRoom: boolean;
      chapel: boolean;
      other?: string; // For specifying other amenities
    };
    recreational: {
      onSiteCafe: boolean;
      onSiteBar: boolean;
      sharedLounge: boolean;
      gameEntertainment: boolean;
      poolTable: boolean;
      tableTennis: boolean;
      library: boolean;
      rooftopTerrace: boolean;
      kidsPlayArea: boolean;
      bbqArea: boolean;
      weeklyEvents: boolean;
      culturalEvents: boolean;
      otherSpecify: string; // User can input custom text for "Other (Specify)"
    };
    workConnectivity: {
      coWorkingSpaces: boolean;
      networkingOpportunities: boolean;
      powerOutletsUsbPorts: boolean;
      printingScanningServices: boolean;
      highSpeedWiFi: boolean;
      otherSpecify: string; // User can input custom text for "Other (Specify)"
    };
    wellness: {
      gymFitnessArea: boolean;
      swimmingPool: boolean;
      massageWellnessServices: boolean;
      otherSpecify?: string;
    };
    specialMenus: {
      dairyFree: boolean;
      glutenFree: boolean;
      vegetarian: boolean;
      vegan: boolean;
      halal: boolean;
      kosher: boolean;
      otherSpecify: string;
    };
    travelAdventureSupport: {
      tourDesk: boolean;
      transportServices: boolean;
      travelGuides: boolean;
      outdoorGearStorage: boolean;
      bicyclesForRent: boolean;
      otherSpecify?: string;
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
  amenitiesForCoLiving: {
    generalAmenities: {
      frontDesk: boolean;
      security: boolean;
      keyAccess: boolean;
      cctv: boolean;
      freeParking: boolean;
      paidParking: boolean;
      evCharging: boolean;
      wheelchairAccess: boolean;
      elevator: boolean;
      freeWiFi: boolean;
      luggageStorage: boolean;
      lockers: boolean;
      safetyDepositBox: boolean;
      laundryFacilities: boolean;
      cleaningServices: boolean;
      sharedKitchen: boolean;
      smokingAllowed: boolean;
      alcoholAllowed: boolean;
      petsAllowed: boolean;
      linenProvided: boolean;
      towelsProvided: boolean;
      airConditioning: boolean;
      heating: boolean;
      freeBreakfast: boolean;
      breakfastAvailable: boolean;
      salahRoom: boolean;
      chapel: boolean;
      other?: string; // For specifying other amenities
    };
    recreational: {
      onSiteCafe: boolean;
      onSiteBar: boolean;
      sharedLounge: boolean;
      gameEntertainment: boolean;
      poolTable: boolean;
      tableTennis: boolean;
      library: boolean;
      rooftopTerrace: boolean;
      kidsPlayArea: boolean;
      bbqArea: boolean;
      weeklyEvents: boolean;
      culturalEvents: boolean;
      otherSpecify: string; // User can input custom text for "Other (Specify)"
    };
    workConnectivity: {
      coWorkingSpaces: boolean;
      networkingOpportunities: boolean;
      powerOutletsUsbPorts: boolean;
      printingScanningServices: boolean;
      highSpeedWiFi: boolean;
      otherSpecify: string; // User can input custom text for "Other (Specify)"
    };
    wellness: {
      gymFitnessArea: boolean;
      swimmingPool: boolean;
      massageWellnessServices: boolean;
      otherSpecify?: string;
    };
    specialMenus: {
      dairyFree: boolean;
      glutenFree: boolean;
      vegetarian: boolean;
      vegan: boolean;
      halal: boolean;
      kosher: boolean;
      otherSpecify: string;
    };
    travelAdventureSupport: {
      transportServices: boolean;
      outdoorGearStorage: boolean;
      otherSpecify?: string;
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

  amenitiesForCampground: {
    generalAmenities: {
      security: boolean; // 24/7 Security
      cctv: boolean; // CCTV Cameras
      freeParking: boolean; // Free Parking
      paidParking: boolean; // Paid Parking
      evCharging: boolean; // Electric Vehicle Charging Station
      freeWiFi: boolean; // Free Wi-Fi
      wheelchairAccess: boolean; // Wheelchair-Accessible Facilities
      restrooms: boolean; // Restrooms
      showers: boolean; // Showers
      laundryFacilities: boolean; // Laundry Facilities
      sharedKitchen: boolean; // Shared Kitchen Facilities
      smokingAllowed: boolean; // Smoking Allowed
      alcoholAllowed: boolean; // Alcohol Allowed
      playground: boolean; // Playground
      petFriendly: boolean; // Pet-Friendly Spaces
      breakfastAvailable: boolean; // Breakfast Available for Purchase
      salahRoom: boolean; // Salah Room (Muslim Prayer Room)
      chapel: boolean; // Chapel
      other?: string; // Optional field for custom input
    };

    utilities: {
      electricity: boolean;
      water: boolean;
      sewer: boolean;
      dumpStation: boolean;
      wifi: boolean;
    };
    recreational: {
      onSiteCafe: boolean;
      onSiteBar: boolean;
      sharedLounge: boolean;
      gameEntertainment: boolean;
      poolTable: boolean;
      tableTennis: boolean;
      library: boolean;
      rooftopTerrace: boolean;
      kidsPlayArea: boolean;
      bbqArea: boolean;
      weeklyEvents: boolean;
      culturalEvents: boolean;
      otherSpecify: string; // User can input custom text for "Other (Specify)"
    };
    workConnectivity: {
      coWorkingSpaces: boolean;
      networkingOpportunities: boolean;
      powerOutletsUsbPorts: boolean;
      printingScanningServices: boolean;
      highSpeedWiFi: boolean;
      otherSpecify: string; // User can input custom text for "Other (Specify)"
    };
    specialMenus: {
      dairyFree: boolean;
      glutenFree: boolean;
      vegetarian: boolean;
      vegan: boolean;
      halal: boolean;
      kosher: boolean;
      otherSpecify: string;
    };
    travelAdventureSupport: {
      tourDesk: boolean;
      transportServices: boolean;
      travelGuides: boolean;
      outdoorGearStorage: boolean;
      bicyclesForRent: boolean;
      otherSpecify?: string;
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
  aminitiesForRental: {
    generalAmenities: {
      frontDesk: boolean;
      security: boolean;
      keyAccess: boolean;
      cctv: boolean;
      freeParking: boolean;
      paidParking: boolean;
      streetParking: boolean;
      noParking: boolean;
      garageParking: boolean;
      valetParking: boolean;
      evCharging: boolean;
      wheelchairAccess: boolean;
      elevator: boolean;
      freeWiFi: boolean;
      wifi: boolean;
      airConditioning: boolean;
      heating: boolean;
      petsAllowed: boolean;
      fireplace: boolean;
      cableSatelliteTV: boolean;
      gymFitness: boolean;
      other?: string; // Optional field for custom input
    };
    recreational: {
      poolTable: boolean;
      gameConsole: boolean;
      boardGames: boolean;
    };
    livingAreas: {
      livingRoom: boolean;
      diningArea: boolean;
      workspaceOffice: boolean;
      familyTvRoom: boolean;
      other?: string;
    };
    kitchen: {
      fullyEquippedKitchen: boolean;
      refrigerator: boolean;
      stoveOven: boolean;
      microwave: boolean;
      dishwasher: boolean;
      coffeeMaker: boolean;
      toaster: boolean;
      washingMachine: boolean;
      dryer: boolean;
      other?: string;
    };
    outdoorFacilities: {
      privatePool: boolean;
      sharedPool: boolean;
      hotTubJacuzzi: boolean;
      bbqGrillArea: boolean;
      gardenLawn: boolean;
      patioTerrace: boolean;
      outdoorDiningArea: boolean;
      other?: string;
    };
    ecoFriendlyPractices: {
      greenCertification: boolean;
      energyUsageTransparency: boolean;
      natureInspiredDesign: boolean;
      greenSpacesForRelaxation: boolean;
      energyConservation: boolean;
      waterConservationMeasures: boolean;
      recyclingBinsWasteManagement: boolean;
      communityInitiatives: boolean;
      otherSpecify: string;
    };
  };
  nearbyAttraction: {
    name: string;
    distance: string;
    beach?: boolean;
    desert?: boolean;
    parkReserve?: boolean;
    lake?: boolean;
    river?: boolean;
    kayakingCanoeing?: boolean;
    hikingTrails?: boolean;
    bikingTrails?: boolean;
  }[];
  hotelResortsbathroomDetails: {
    numberOfBeds: string;
    numberOfRooms: string;
    numberOfSuites: string;
    roomAmenities: {
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
    };
    bathroomAmenities: {
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
      other: string;
    };
  };
  bedBreakfastRoomBathroomDetails: {
    numberOfBeds: string;
    numberOfRooms: string;
    numberOfEnSuiteRooms: string;
    numberOfSharedBathrooms: string;
    roomAmenities: {
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
    };
    bathroomAmenities: {
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
      other: string;
    };
  };
  hostelRoomBathroomDetails: {
    totalBeds: string;
    dormitoryRooms: string;
    dormRoomType: {
      mixedDorm: boolean;
      femaleDorm: boolean;
      maleDorm: boolean;
      other: string;
    };
    dormRoomFeatures: {
      lockers: boolean;
      readingLights: boolean;
      chargingPorts: boolean;
      curtainsForPrivacy: boolean;
      other: string;
    };
    sharedBathrooms: string;
    privateRooms: string;
    enSuitePrivateRooms: string;
    privateRoomFeatures: {
      enSuiteBathroom: boolean;
      balconyTerrace: boolean;
      closetStorageSpace: boolean;
      tv: boolean;
      other: string;
    };
  };
  coLivingRoomBathroomDetails: {
    sharedBedrooms: string;
    sharedBedroomFeatures: {
      balconyTerrace: boolean;
      closetStorageSpace: boolean;
      readingLights: boolean;
      chargingPorts: boolean;
      tv: boolean;
      wifi: boolean;
      airConditioningHeating: boolean;
      workspace: boolean;
      other: string;
    };
    sharedBathrooms: string;
    enSuiteBedrooms: string;
    enSuiteBedroomFeatures: {
      balconyTerrace: boolean;
      closetStorageSpace: boolean;
      readingLights: boolean;
      chargingPorts: boolean;
      tv: boolean;
      wifi: boolean;
      airConditioningHeating: boolean;
      workspace: boolean;
      other: string;
    };
    commonAreas: string;
  };
  vacationRentalRoomBathroomDetails: {
    maxOccupancy: string;
    bedrooms: {
      count: string;
      bedTypes: string;
    };
    enSuiteBedrooms: {
      count: string;
      bedTypes: string;
    };
    separateBathrooms: string;
    propertySize: string;
    outdoorTerraceSize: string;
    gardenSize: string;
    bedroomFeatures: {
      enSuiteBathroom: boolean;
      balcony: boolean;
      closetStorageSpace: boolean;
      airConditioning: boolean;
    };
    bathroomFeatures: {
      bathtub: boolean;
      shower: boolean;
      doubleSink: boolean;
      towelsToiletries: boolean;
    };
  };
  distanceToKeyLocations: {
    nearestAirport: string;
    trainBusStation: string;
    taxiStands: string;
    cityCenter: string;
    localMarkets: string;
    popularRestaurants: string;
  };
  uploadedPhotoshotel: {
    exterior?: string[];
    lobby?: string[];
    commonAreas?: string[];
    rooms?: string[];
    amenities?: string[];
  };
  uploadedPhotosresort: {
    exterior?: string[];
    lobby?: string[];
    commonAreas?: string[];
    rooms?: string[];
    amenities?: string[];
  };
  uploadedPhotosbedAndBreakfast: {
    exterior?: string[];
    lobby?: string[];
    commonAreas?: string[];
    rooms?: string[];
    amenities?: string[];
  };
  uploadedPhotoshostel: {
    exterior?: string[];
    commonAreas?: string[];
    dormitories?: string[];
    privateRooms?: string[];
    socialSpaces?: string[];
    diningAreas?: string[];
  };
  uploadedPhotoscoLiving: {
    exterior?: string[];
    commonAreas?: string[];
    bedrooms?: string[];
    bathrooms?: string[];
    enSuiteBedrooms?: string[];
    socialSpaces?: string[];
    diningRoom?: string[];
  };
  uploadedPhotosvacationRental: {
    exterior?: string[];
    bedrooms?: string[];
    livingRoom?: string[];
    kitchen?: string[];
    bathrooms?: string[];
    outdoorSpaces?: string[];
  };
  uploadedPhotoscampground: {
    campground?: string[];
    restrooms?: string[];
    showers?: string[];
    socialSpaces?: string[];
    coWorkingSpace?: string[];
  };
  manager: {
    name: string;
    role: string;
    phoneNumber: string;
    email: string;
    emergencyContact?: string;
    idPhoto?: File;
  };
  dateOfSubmit: string;
  signature: string;
  consent: boolean;
  confirmation: boolean;
}

export const locationTypes = {
  hotel: {
    options: [
      { label: 'Beach', value: 'beach' },
      { label: 'Mountain', value: 'mountain' },
      { label: 'River', value: 'river' },
      { label: 'Lakeside', value: 'lakeside' },
      { label: 'Desert', value: 'desert' },
      { label: 'Island', value: 'island' },
      { label: 'Urban', value: 'urban' },
      { label: 'Other (Specify)', value: 'other' },
    ],
  },
  resort: {
    options: [
      { label: 'Beach', value: 'beach' },
      { label: 'Mountain', value: 'mountain' },
      { label: 'River', value: 'river' },
      { label: 'Lakeside', value: 'lakeside' },
      { label: 'Desert', value: 'desert' },
      { label: 'Island', value: 'island' },
      { label: 'Urban', value: 'urban' },
      { label: 'Other (Specify)', value: 'other' },
    ],
  },
  'bed-and-breakfast': {
    options: [
      { label: 'Beach', value: 'beach' },
      { label: 'Mountain', value: 'mountain' },
      { label: 'River', value: 'river' },
      { label: 'Lakeside', value: 'lakeside' },
      { label: 'Desert', value: 'desert' },
      { label: 'Island', value: 'island' },
      { label: 'Urban', value: 'urban' },
      { label: 'Other (Specify)', value: 'other' },
    ],
  },
};
export const propertyTypes = {
  hotel: {
    options: [
      { label: 'Budget', value: 'budget', checked: false },
      { label: 'Luxury', value: 'luxury', checked: false },
      { label: 'Boutique', value: 'boutique', checked: false },
      { label: 'Family Friendly', value: 'familyFriendly', checked: false },
      { label: 'Business Friendly', value: 'businessFriendly', checked: false },
    ],
  },
  resort: {
    options: [
      { label: 'Budget', value: 'budget', checked: false },
      { label: 'Luxury', value: 'luxury', checked: false },
      { label: 'Boutique', value: 'boutique', checked: false },
      { label: 'Family Friendly', value: 'familyFriendly', checked: false },
      { label: 'Business Friendly', value: 'businessFriendly', checked: false },
    ],
  },
  'bed-and-breakfast': {
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
  'co-living': {
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
  'vacation-rental': {
    options: [
      // Apartments
      { label: 'Beachfront Apartment', value: 'beachfrontApartment', checked: false },
      { label: 'Mountain Apartment', value: 'mountainApartment', checked: false },
      { label: 'Countryside Apartment', value: 'countrysideApartment', checked: false },
      { label: 'City Apartment', value: 'cityApartment', checked: false },
      { label: 'Luxury Apartment', value: 'luxuryApartment', checked: false },
      { label: 'Eco-Friendly Apartment', value: 'ecoFriendlyApartment', checked: false },
      { label: 'Family-Friendly Apartment', value: 'familyFriendlyApartment', checked: false },
      { label: 'Other (specify)', value: 'otherApartment', checked: false },

      // Villas
      { label: 'Beachfront Villa', value: 'beachfrontVilla', checked: false },
      { label: 'Mountain Villa', value: 'mountainVilla', checked: false },
      { label: 'Countryside Villa', value: 'countrysideVilla', checked: false },
      { label: 'City Villa', value: 'cityVilla', checked: false },
      { label: 'Luxury Villa', value: 'luxuryVilla', checked: false },
      { label: 'Eco-Friendly Villa', value: 'ecoFriendlyVilla', checked: false },
      { label: 'Family-Friendly Villa', value: 'familyFriendlyVilla', checked: false },
      { label: 'Other (specify)', value: 'otherVilla', checked: false },
    ],
  },
};

export const formCategories: { [key: string]: { label: string; value: string }[] } = {
  hotel: [
    { label: 'Exterior', value: 'exterior' },
    { label: 'Lobby', value: 'lobby' },
    { label: 'Common Areas', value: 'commonAreas' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Amenities', value: 'amenities' },
  ],
  resort: [
    { label: 'Exterior', value: 'exterior' },
    { label: 'Lobby', value: 'lobby' },
    { label: 'Common Areas', value: 'commonAreas' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Amenities', value: 'amenities' },
  ],
  'bed-and-breakfast': [
    { label: 'Exterior', value: 'exterior' },
    { label: 'Lobby', value: 'lobby' },
    { label: 'Common Areas', value: 'commonAreas' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Amenities', value: 'amenities' },
  ],
  hostel: [
    { label: 'Exterior', value: 'exterior' },
    { label: 'Common Areas', value: 'commonAreas' },
    { label: 'Dormitories', value: 'dormitories' },
    { label: 'Private Rooms', value: 'privateRooms' },
    { label: 'Social Spaces (Rooftop, Garden, etc.)', value: 'socialSpaces' },
    { label: 'Dining Areas', value: 'diningAreas' },
  ],
  'co-living': [
    { label: 'Exterior of Apartment/House', value: 'exterior' },
    { label: 'Common Areas', value: 'commonAreas' },
    { label: 'Bedrooms', value: 'bedrooms' },
    { label: 'Bathrooms', value: 'bathrooms' },
    { label: 'En-Suite Bedrooms', value: 'enSuiteBedrooms' },
    { label: 'Social Spaces (Rooftop, Garden, Lounge, etc.)', value: 'socialSpaces' },
    { label: 'Dining Room', value: 'diningRoom' },
  ],
  'vacation-rental': [
    { label: 'Exterior', value: 'exterior' },
    { label: 'Bedrooms', value: 'bedrooms' },
    { label: 'Living Room', value: 'livingRoom' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Bathrooms', value: 'bathrooms' },
    { label: 'Outdoor Spaces', value: 'outdoorSpaces' },
  ],
  campground: [
    { label: 'Campground', value: 'campground' },
    { label: 'Restrooms', value: 'restrooms' },
    { label: 'Showers', value: 'showers' },
    { label: 'Social Spaces', value: 'socialSpaces' },
    { label: 'Co-Working Space', value: 'coWorkingSpace' },
  ],
};
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
