import { useState } from 'react';
import Button from '@atoms/custom-button/button';
import Modal from '../modal';
import EventForm from '../forms/event-form';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import React, { useEffect } from 'react';
import { toKebabCase } from '@utils/common';
import { useNavigate } from 'react-router';

interface SubCategory {
  title: string;
  content: Array<{ _type: string; children?: Array<{ text: string }>; asset?: { url: string }; alt?: string }>;
}

interface Category {
  category: string;
  imageUrl: string;
  subCategories: SubCategory[];
}

interface TravelData {
  categories: Category[];
}

interface ModalContent {
  title: string;
  content: SubCategory['content'];
}

const TravelKnowledge: React.FC<{ country: string }> = ({ country }) => {
  const [travelCategories, setTravelCategories] = useState<
    Array<{ title: string; imageUrl: string; items: Array<{ label: string; content: SubCategory['content'] }> }>
  >([]);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({ title: '', content: [] });
  const navigation = useNavigate();

  const {
    data: travelData,
    error: travelError,
    isLoading: travelLoading,
  } = useQuery<TravelData>({
    queryKey: ['travel-knowledge', country],
    queryFn: () =>
      sanity.GET(`*[_type == "travel-knowldge" && country == "${country}"][0]{
        categories[] {
          category,
          "imageUrl": categoryImage.asset->url,
          subCategories[] {
            title,
            content
          }
        }
      }`),
    enabled: Boolean(country),
  });

  useEffect(() => {
    if (travelData) {
      const formattedData = travelData.categories.map((category) => ({
        title: category.category,
        imageUrl: category.imageUrl,
        items: category.subCategories.map((subCategory) => ({
          label: subCategory.title,
          content: subCategory.content,
        })),
      }));

      setTravelCategories(formattedData || []);
    }
  }, [travelData]);

  if (travelLoading) return <div>Loading Travel Knowledge...</div>;
  if (travelError) return <div>Error loading Travel Knowledge data.</div>;

  const openModal = (title: string, content: SubCategory['content']) => {
    setModalContent({ title, content });
    setIsContentOpen(true);
  };

  return (
    <section className="flex flex-col p-2 md:p-4 max-w-6xl m-auto">
      <div className="text-lg font-semibold flex flex-col md:flex-row mb-5">
        <h4 className=" text-left text-orange-500 text-lg">&rarr; Travel Knowledge</h4>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} containerClasses="ms-auto">
          <EventForm />
        </Modal>
        <Modal
          isOpen={isContentOpen}
          setIsOpen={setIsContentOpen}
          containerClasses="ms-auto"
          customClasses="w-full h-screen"
        >
          <div
            id="sub-layout"
            className="p-2 md:p-8 border border-cyan-400 m-2 text-left bg-white text-black rounded-2xl"
          >
            <h4
              className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
              onClick={() => setIsContentOpen(false)}
            >
              &larr; {modalContent.title}
            </h4>
            <div className="space-y-4">
              {modalContent.content.map((block, index) => {
                if (block._type === 'block') {
                  return (
                    <p key={index} className="text-base">
                      {block.children?.[0]?.text}
                    </p>
                  );
                }
                if (block._type === 'image') {
                  return <img key={index} src={block.asset?.url} alt={block.alt || 'Image'} className="w-full" />;
                }
                return null;
              })}
            </div>
          </div>
        </Modal>
        <Button onClick={() => setIsOpen(true)}>Advertise on tribe africa</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {travelCategories.map((category, index) => (
          <div key={index} className="flex flex-col">
            {category.imageUrl && (
              <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 w-full">
                <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
              </div>
            )}
            <div id="about" className="text-left w-full space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((subCategory, idx) => (
                  <li
                    key={idx}
                    className="text-sm md:text-base cursor-pointer hover:underline"
                    onClick={() => {
                      if (subCategory.label === 'Accommodation') {
                        navigation(`/${toKebabCase(country)}/${toKebabCase(subCategory.label)}`);
                        return;
                      }
                      if (subCategory.label == 'Q & A Forum') {
                        navigation(`/${toKebabCase(country)}/qna`);
                        return;
                      }
                      openModal(subCategory.label, subCategory.content);
                    }}
                  >
                    {subCategory.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelKnowledge;
