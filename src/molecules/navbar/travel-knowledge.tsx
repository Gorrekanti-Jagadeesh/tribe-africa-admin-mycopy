// import servicesBG from '@assets/business/travel-knowledge/services.png';

// const TravelKnowledge = () => {
//   return (
//     <div className="flex gap-6 text-left px-5 py-2">
//       <div id="addresses" className="w-1/3">
//         <img src={servicesBG} alt="" className="aspect-video object-cover object-left-center max-w-64 rounded-md" />
//         <h4 className="font-bold text-xl my-2">Important Addresses</h4>
//         <ul className="space-y-1">
//           {links.map((link, index) => (
//             <li className="text-gray-400" key={index}>
//               {link.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex flex-1 flex-col gap-6">
//         <div className="flex flex-1 gap-4">
//           <div id="services" className="flex-1">
//             <img src={servicesBG} alt="" className="aspect-video object-cover object-left-center max-w-64 rounded-md" />
//             <h4 className="font-bold text-xl my-2">Useful Services</h4>
//             <ul className="space-y-1">
//               {links.map((link, index) => (
//                 <li className="text-gray-400" key={index}>
//                   {link.title}
//                 </li>
//               ))}
//             </ul>
//             <h4 className="font-bold text-lg mt-4">For more Services, checkout</h4>
//             <a className="text-orange-500">Tribe Africa pages</a>
//           </div>
//           <div id="main" className="flex-1">
//             <h3 className="text-orange-500 text-2xl">&rarr; Travel Knowlegde</h3>
//             <ul className="space-y-1 ml-8">
//               {links.map((link, index) => (
//                 <li className="text-gray-400" key={index}>
//                   {link.title}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="flex-1 text-right">
//           <button className="bg-orange-500 p-2 rounded-md text-white">
//             List Your Business/Instituition on the Tribe Africa Pages
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TravelKnowledge;

// const links = [
//   {
//     title: 'first',
//     redirect: '',
//   },
//   {
//     title: 'second',
//     redirect: '',
//   },
//   {
//     title: 'third',
//     redirect: '',
//   },
//   {
//     title: 'fourth',
//     redirect: '',
//   },
// ];

import { useState } from 'react';
import { LinkList } from '../layout/link-list';
// import Button from '@atoms/custom-button/button';
// import Modal from '../modal';
// import EventForm from '../forms/event-form';
// import { travelKnowledgeURLs } from '../../data';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';

// const NavcategoryItem = ({ category }) => {
//   return (
//     <div className="flex flex-col">
//       {category.imageUrl && (
//         <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 w-full">
//           <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
//         </div>
//       )}
//       {/* <LinkList
//       heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
//       links={category.items}
//       className="text-left w-full"
//       subLinksHeading={<h3 className="text-lg md:text-xl font-semibold">{category.subTitle}</h3>}
//       subLinks={category.subitems}
//     /> */}
//       <LinkList
//         heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
//         links={category.items}
//         className="text-left w-full"
//         subLinksHeading={<h3 className="text-lg md:text-xl font-semibold">{category.subTitle}</h3>}
//         subLinks={category.subLinks} // Corrected property name
//       />
//     </div>
//   );
// };

import React, { useEffect } from 'react';
import { toKebabCase } from '@utils/common';
import NavLayout from '@molecules/layout/nav-layout';
import { EventCategory } from '../../../src/types/index'; // Reuse the EventCategory type

const TravelKnowledge: React.FC<{ country: string }> = ({ country }) => {
  const [travelCategories, setTravelCategories] = useState<EventCategory[]>([]);

  // Fetch Travel Knowledge data filtered by the country
  const {
    data: travelData,
    error: travelError,
    isLoading: travelLoading,
  } = useQuery({
    queryKey: ['travel-knowledge', country],
    queryFn: () =>
      sanity.GET(`*[_type == "travel-knowldge" && country == "${country}"]{
        categories[] {
          category,
          "imageUrl": categoryImage.asset->url,
          subCategories[]
        }
      }`),
    enabled: Boolean(country), // Ensure the query only runs when country is defined
  });

  useEffect(() => {
    if (travelData) {
      // Transform data to match NavLayout's eventCategories format
      const formattedData = travelData[0]?.categories?.map((category) => ({
        title: category.category, // Category Title
        imageUrl: category.imageUrl, // Category Image URL
        items: category.subCategories.map((subCategory: string) => ({
          label: subCategory,
          url: `/travel-knowledge/${toKebabCase(category.category)}/${toKebabCase(subCategory)}`,
          imageUrl: category.imageUrl, // Reuse category image if no sub-category image exists
        })),
      }));

      setTravelCategories(formattedData || []);
    }
  }, [travelData]);

  if (travelLoading) return <div>Loading Travel Knowledge...</div>;
  if (travelError) return <div>Error loading Travel Knowledge data.</div>;

  return (
    <NavLayout
      eventCategories={travelCategories || []}
      showModal={true}
      showButton={true}
      navLayoutHeading="Travel Knowledge"
    />
  );
};

export default TravelKnowledge;
