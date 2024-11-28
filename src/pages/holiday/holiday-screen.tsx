import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Footer from '../../molecules/footer';
import { HolidayHeader } from '../../molecules/header';
import MapChart from '../../molecules/maps/map';
import LookOutCollage from './sections/look-out-collage';
import DualHeading from '@atoms/heading/dual-heading';
import ColsGrid from '@molecules/layout/cols-grid';
import OverLayCard from '@atoms/card/overlay-card';
import CommonCarousel from '@molecules/carousel/common-carousel';

import { upcomingEvents, demoImage as heroBackground } from '@data/index';
import useScreenWidth from '@hooks/useScreenWidth';

interface MarkerType {
  name: string;
  coordinates: [number, number];
  category: string;
  subCategory?: string;
}
interface CountryDataType {
  center: [number, number];
  markers: MarkerType[];
  scale: number;
}

const countryData: Record<string, CountryDataType> = {
  algeria: {
    center: [2.6328, 28.0339],
    markers: [
      { name: 'Algiers', coordinates: [3.0588, 36.7323], category: 'Cities' },
      { name: 'Oran', coordinates: [-0.6299, 35.6971], category: 'Cities' },
      { name: 'Constantine', coordinates: [6.6147, 36.365], category: 'Cities' },
      { name: 'Annaba', coordinates: [7.7662, 36.8969], category: 'Cities' },
      { name: 'Batna', coordinates: [6.1739, 35.555], category: 'Cities' },
      {
        name: 'Hoggar Mountains',
        coordinates: [5.7749, 23.6854],
        category: 'Action Enthusiasts',
        subCategory: 'Conquer the Sahara',
      },
      {
        name: 'Tassili n’Ajjer',
        coordinates: [9.2195, 24.7986],
        category: 'Action Enthusiasts',
        subCategory: 'Conquer the Sahara',
      },
      {
        name: 'Djurdjura Mountains',
        coordinates: [4.3286, 36.5661],
        category: 'Action Enthusiasts',
        subCategory: 'Climb to New heights',
      },
      {
        name: 'Tlemcen National Park',
        coordinates: [-1.2974, 34.8828],
        category: 'Action Enthusiasts',
        subCategory: 'Climb to New heights',
      },
      {
        name: 'Tamanrasset',
        coordinates: [5.5228, 22.785],
        category: 'Action Enthusiasts',
        subCategory: 'Dive into History',
      },
      {
        name: 'Timgad',
        coordinates: [6.4674, 35.4881],
        category: 'Action Enthusiasts',
        subCategory: 'Dive into History',
      },
      {
        name: 'Djemila',
        coordinates: [5.7382, 36.3147],
        category: 'Action Enthusiasts',
        subCategory: 'Surf the waves',
      },
      { name: 'Djanet', coordinates: [8.7, 24.55], category: 'Action Enthuisiasts', subCategory: 'Soar through sky' },
      {
        name: 'Sidi Boumediene Mosque',
        coordinates: [-1.3369, 34.8783],
        category: 'Action Enthuisiasts',
        subCategory: 'Soar through sky',
      },
      { name: 'Tipaza', coordinates: [2.4496, 36.5897], category: 'Action Enthusiasts', subCategory: 'Surf the waves' },
      { name: 'Beni Hammad Fort', coordinates: [4.7667, 35.8333], category: 'Nature', subCategory: 'Nature1' },
      { name: 'El Kala National Park', coordinates: [8.4667, 36.8833], category: 'Nature', subCategory: 'Nature1' },
      { name: 'Chréa National Park', coordinates: [2.8172, 36.4628], category: 'Nature', subCategory: 'Nature2' },
      { name: 'Ahaggar National Park', coordinates: [5.8735, 23.2856], category: 'Nature', subCategory: 'Nature2' },
      { name: 'Casbah of Algiers', coordinates: [3.0588, 36.7665], category: 'Historical & Cultural' },
      { name: 'Mzab Valley', coordinates: [3.6667, 32.4911], category: 'Historical & Cultural' },
      { name: 'Sidi Okba Mosque', coordinates: [5.743, 34.7059], category: 'Sacred Sites' },
      { name: "Qal'a of Beni Hammad", coordinates: [4.7782, 35.863], category: 'Sacred Sites' },
      { name: 'Sidi Abderrahmane', coordinates: [3.046, 36.7809], category: 'Sacred Sites' },
    ],
    scale: 2300,
  },
  angola: {
    center: [17.8739, -11.2027],
    markers: [
      { name: 'Luanda', coordinates: [13.2344, -8.8383], category: 'Cities' },
      { name: 'Huambo', coordinates: [15.7346, -12.7761], category: 'Cities' },
      { name: 'Lubango', coordinates: [13.4916, -14.9172], category: 'Cities' },
      { name: 'Kalandula Falls', coordinates: [16.0203, -9.0795], category: 'Nature' },
      { name: 'Quicama National Park', coordinates: [13.1395, -9.4514], category: 'Nature' },
      { name: 'Fortress of São Miguel', coordinates: [13.235, -8.8137], category: 'Historical & Cultural' },
    ],
    scale: 3000,
  },
  benin: {
    center: [2.3158, 9.3077],
    markers: [
      { name: 'Cotonou', coordinates: [2.4183, 6.3703], category: 'Cities' },
      { name: 'Porto-Novo', coordinates: [2.6167, 6.4969], category: 'Cities' },
      { name: 'Parakou', coordinates: [2.6163, 9.3372], category: 'Cities' },
      { name: 'Pendjari National Park', coordinates: [1.5416, 11.2382], category: 'Nature' },
      { name: 'Royal Palaces of Abomey', coordinates: [1.9876, 7.1825], category: 'Historical & Cultural' },
    ],
    scale: 2300,
  },
  botswana: {
    center: [24.6849, -22.3285],
    markers: [
      { name: 'Gaborone', coordinates: [25.9231, -24.6282], category: 'Cities' },
      { name: 'Francistown', coordinates: [27.5144, -21.1699], category: 'Cities' },
      { name: 'Maun', coordinates: [23.4167, -19.9833], category: 'Cities' },
      { name: 'Okavango Delta', coordinates: [23.0507, -19.9124], category: 'Nature' },
      { name: 'Chobe National Park', coordinates: [25.1999, -18.6616], category: 'Nature' },
    ],
    scale: 2300,
  },
  'south-africa': {
    center: [24.9916, -30.5595],
    markers: [
      { name: 'Johannesburg', coordinates: [28.0473, -26.2041], category: 'Cities' },
      { name: 'Cape Town', coordinates: [18.4241, -33.9249], category: 'Cities' },
      { name: 'Durban', coordinates: [31.0218, -29.8587], category: 'Cities' },
      { name: 'Kruger National Park', coordinates: [31.4857, -23.9884], category: 'Nature' },
      { name: 'Table Mountain', coordinates: [18.4156, -33.9628], category: 'Nature' },
      { name: 'Robben Island', coordinates: [18.3683, -33.8068], category: 'Historical & Cultural' },
    ],
    scale: 2400,
  },
  zimbabwe: {
    center: [29.1549, -19.0154],
    markers: [
      { name: 'Harare', coordinates: [31.0522, -17.8292], category: 'Cities' },
      { name: 'Bulawayo', coordinates: [28.5856, -20.1322], category: 'Cities' },
      { name: 'Victoria Falls', coordinates: [25.8485, -17.9243], category: 'Nature' },
      { name: 'Hwange National Park', coordinates: [26.9476, -18.6414], category: 'Nature' },
      { name: 'Great Zimbabwe', coordinates: [30.9341, -20.2679], category: 'Historical & Cultural' },
    ],
    scale: 4500,
  },
};

const HolidayScreen = () => {
  const [layout, setLayout] = useState(3);
  const { country } = useParams<{ country: string }>();
  const screenWidth = useScreenWidth();

  if (!country || !countryData[country]) {
    // Render a fallback component or message if the country is undefined or not in countryData
    return <div>Country data not available</div>;
  }

  const markers = countryData[country].markers;
  const center = countryData[country].center;
  const scale = countryData[country].scale;

  useEffect(() => {
    if (screenWidth < 1024) {
      setLayout(2);
    } else {
      setLayout(3);
    }
  }, [screenWidth]);
  return (
    <div>
      <HolidayHeader />
      <div>
        {/* Adventure */}
        <div className="max-w-6xl m-auto p-4">
          <DualHeading className="mb-4">Let the *Adventure* begin</DualHeading>
          <CommonCarousel
            data={[
              {
                title: 'title1',
                image: heroBackground,
              },
              {
                title: 'title1',
                image: heroBackground,
              },
              {
                title: 'title1',
                image: heroBackground,
              },
            ]}
          />
        </div>
        <LookOutCollage />
        <MapChart country={country} markers={markers} scale={scale} center={center} />
        {/* When the tribe goes out */}
        <div className="max-w-6xl m-auto p-4">
          <DualHeading className="mb-4">When the *Tribe* goes out!</DualHeading>
          <CommonCarousel
            data={[
              {
                title: 'title1',
                image: heroBackground,
              },
              {
                title: 'title1',
                image: heroBackground,
              },
              {
                title: 'title1',
                image: heroBackground,
              },
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HolidayScreen;
