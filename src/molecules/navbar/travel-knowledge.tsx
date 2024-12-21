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

import React, { useState } from 'react';
import { LinkList } from '../layout/link-list';
import Button from '@atoms/custom-button/button';
import Modal from '../modal';
import EventForm from '../forms/event-form';
import { travelKnowledgeURLs } from '../../data';

const NavcategoryItem = ({ category }) => {
  return (
    <div className="flex flex-col">
      {category.imageUrl && (
        <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 w-full">
          <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
        </div>
      )}
      {/* <LinkList
      heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
      links={category.items}
      className="text-left w-full"
      subLinksHeading={<h3 className="text-lg md:text-xl font-semibold">{category.subTitle}</h3>}
      subLinks={category.subitems}
    /> */}
      <LinkList
        heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
        links={category.items}
        className="text-left w-full"
        subLinksHeading={<h3 className="text-lg md:text-xl font-semibold">{category.subTitle}</h3>}
        subLinks={category.subLinks} // Corrected property name
      />
    </div>
  );
};

const TravelKnowledge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col p-2 md:p-4 max-w-6xl m-auto">
      <div className="text-lg font-semibold flex flex-col md:flex-row mb-5">
        <h4 className=" text-left text-orange-500 text-lg">&rarr; Travel Knowledge</h4>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} containerClasses="ms-auto">
          <EventForm />
        </Modal>
        <Button onClick={() => setIsOpen(true)}>Advertise on tribe africa</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {travelKnowledgeURLs?.map((category, index) => <NavcategoryItem key={index} category={category} />)}
      </div>
    </section>
  );
};

export default TravelKnowledge;
