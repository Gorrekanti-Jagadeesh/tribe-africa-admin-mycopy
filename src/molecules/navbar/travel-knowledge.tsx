import { useState } from 'react';
import Button from '@atoms/custom-button/button';
import Modal from '../modal';
import EventForm from '../forms/event-form';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import React, { useEffect } from 'react';
import { toKebabCase } from '@utils/common';
import { useNavigate } from 'react-router';
import { FloatingSibling } from '@molecules/common/floating-sibling';

interface SubCategory {
  title: string;
  content?: Array<{ _type: string; children?: Array<{ text: string }>; asset?: { url: string }; alt?: string }>;
  accommodationCategories?: string[];
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

const TravelKnowledge: React.FC<{ country: string; pageType: string }> = ({ country, pageType }) => {
  const [travelCategories, setTravelCategories] = useState<
    Array<{
      title: string;
      imageUrl: string;
      items: Array<{ label: string; content: SubCategory['content']; accommodationCategories?: string[] }>;
    }>
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
            content, 
            accommodationCategories
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
          accommodationCategories: subCategory.accommodationCategories,
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
    <section className="flex flex-col p-2 md:p-3 max-w-8xl m-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h4 className="text-brand-orange text-lg font-semibold">&rarr; Travel Knowledge</h4>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} trigger={<Button>Advertise on tribe africa</Button>}>
          <EventForm />
        </Modal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {travelCategories.map((category, index) => (
          <div key={index} className="flex flex-col">
            {category.imageUrl && (
              <div className="border-2 border-brand-orange rounded-[10px] overflow-hidden mb-4 w-full">
                <img src={category.imageUrl} alt={category.title} className="w-full object-cover w-full" />
              </div>
            )}
            <div id="about" className="text-left w-full space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((subCategory, idx) => {
                  if (subCategory.label == 'Accommodation') {
                    return (
                      <li className="text-sm md:text-base cursor-pointer hover:underline" key={index}>
                        <FloatingSibling
                          component={<span>{subCategory.label}</span>}
                          sibling={
                            <div className="min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black">
                              <h4 className="text-brand-orange font-semibold">&rarr; {subCategory.label}</h4>
                              {subCategory.accommodationCategories &&
                                subCategory.accommodationCategories.map((item, index) => (
                                  <li
                                    key={index}
                                    onClick={() =>
                                      navigation(
                                        `/${toKebabCase(country)}/${pageType}/${toKebabCase(subCategory.label)}/${toKebabCase(item)}`
                                      )
                                    }
                                  >
                                    {item}
                                  </li>
                                ))}
                            </div>
                          }
                          hasSubcategories={true}
                          country={country}
                          pageType={pageType}
                        />
                      </li>
                    );
                  }
                  return (
                    <li
                      key={idx}
                      className="text-sm md:text-base cursor-pointer hover:underline"
                      onClick={() => {
                        if (subCategory.label == 'Q & A Forum') {
                          navigation(`/${toKebabCase(country)}/qna`);
                          return;
                        }
                        openModal(subCategory.label, subCategory.content);
                      }}
                    >
                      {subCategory.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isContentOpen}
        setIsOpen={setIsContentOpen}
        containerClasses="ms-auto"
        customClasses="w-full h-screen"
      >
        <div
          id="sub-layout"
          className="p-2 md:p-8 border border-brand-orange/30 m-2 text-left bg-white text-black rounded-[10px]"
        >
          <h4
            className="text-brand-orange text-lg hover:underline cursor-pointer w-fit font-semibold"
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
    </section>
  );
};

export default TravelKnowledge;
