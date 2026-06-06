import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { fromKebabCase } from '@utils/common';
import { Loading } from '@atoms/common/loading';

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
      <div className="md:w-1/3 p-4 mb-auto">
        <img src={imageUrl} alt={title} className="rounded-lg shadow-lg aspect-square" />
      </div>
      {/* Content Section */}
      <div className="md:w-full p-4">
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

const DiscoverArticles: React.FC = () => {
  const navigate = useNavigate();

  const { category, subcategory } = useParams();

  const {
    data: articlesData,
    error: articlesError,
    isLoading: articlesLoading,
  } = useQuery({
    queryKey: ['discover-articles', category, subcategory],
    queryFn: () =>
      sanity.GET(`
        *[_type == "home-discover-section" && name == "${fromKebabCase(category)}"]{
          subCategories[ name == "${fromKebabCase(subcategory)}" ]
          {
            discoverArticles[]->{
              title,
              subtitle,
              description,
              "imageUrl": image.asset->url
            }
          }
        }[0].subCategories[0].discoverArticles
      `),
  });

  if (articlesLoading) {
    return <Loading />;
  }

  if (articlesError) {
    return <>Error fetching data..</>;
  }

  return (
    <div className="bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="p-4 mb-8">
          <h1 className="text-4xl md:text-5xl flex">
            <p>
              <span className="text-brand-orange font-serif">{fromKebabCase(subcategory).split(' ')[0]}</span>{' '}
              {fromKebabCase(subcategory).split(' ').slice(1).join(' ')}
            </p>
            <button className="ms-auto p-2 py-0" onClick={() => navigate('/')}>
              <FontAwesomeIcon className=" max-w-6" icon={faArrowLeft} />
            </button>
          </h1>
        </header>

        {/* Cards */}
        {articlesData.map((article, index) => (
          <Card
            key={index}
            imageUrl={article.imageUrl}
            title={article.title}
            subtitle={article.subtitle}
            description={article.description}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverArticles;
