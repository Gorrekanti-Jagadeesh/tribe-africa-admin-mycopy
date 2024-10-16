import React from 'react';
import view from '../../../../../assets/homepage-welcome-image-3.png';

interface CardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, subtitle, description, link }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-12">
      {/* Image Section */}
      <div className="md:w-1/2 p-4 mb-auto">
        <img src={imageUrl} alt={title} className="rounded-lg shadow-lg" />
      </div>
      {/* Content Section */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <h3 className="italic text-gray-600 mb-4">{subtitle}</h3>
        <p className="text-lg mb-4">{description}</p>
        {link && (
          <a href={link} className="text-blue-500 hover:underline">
            {link}
          </a>
        )}
      </div>
    </div>
  );
};

const InnovationsScreen: React.FC = () => {
  const inventions = [
    {
      imageUrl: view, // Add image URL here
      title: 'WAGA Power Pack, Tanzania',
      subtitle: 'Giving new life to trashed lithium-ion batteries',
      description:
        'Aiming to break the cycle of battery waste, Tanzanian electrical engineer Gibson Kawago developed the WAGA Power Pack, a portable energy solution made from recycled lithium-ion batteries. Designed to address the country’s unreliable electricity supply, the device powers electric bikes, power banks, solar lights, homes, and businesses. The WAGA Power Pack offers durable and affordable battery-powered products, with voltage options of 12, 24, or 48 volts depending on the intended use, ranging from lighting and heating to appliances. By recycling discarded batteries, Kawago’s innovation supports both sustainability and energy accessibility in Tanzania.',
      link: 'https://wagatanzania.com',
    },
    {
      imageUrl: view, // Add image URL here
      title: 'EAT-SET, Nigeria',
      subtitle: 'The Emergency Autotransfusion Set',
      description:
        'The Emergency Autotransfusion Set (EAT-SET) was invented by Dr. Otu Oviemo Ovadje, a Nigerian Army doctor, to address the fatal consequences of ruptured ectopic pregnancies, a common issue in developing countries. With limited access to organized blood transfusion services, many women faced heightened risks of death from internal hemorrhages. The EAT-SET became a life-saving low-cost solution in regions with limited healthcare infrastructure, by collecting and filtering the patient’s own blood during surgery and reinfusing it, eliminating the reliance on donor blood and reducing the risks of disease transmission or immunological reactions in case of accidents.',
    },
  ];

  return (
    <div className="bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="p-4 mb-8">
          <h1 className="text-5xl">
            <span className="text-orange-500 font-serif">Amazing</span> Inventions
          </h1>
        </header>

        {/* Cards */}
        {inventions.map((invention, index) => (
          <Card
            key={index}
            imageUrl={invention.imageUrl}
            title={invention.title}
            subtitle={invention.subtitle}
            description={invention.description}
            link={invention.link}
          />
        ))}
      </div>
    </div>
  );
};

export default InnovationsScreen;
