import CustomeSectionHeadingComponent from '../../../atoms/custom-section-heading/custom-section-heading-component';
import CommonCarousel from '../../../molecules/common-carousel/common-carousel';

interface carouselData {
  images: string[];
}

const CharmingHotelsScreen: React.FC<carouselData> = ({ images }) => {
  return (
    <div className="container mx-auto mt-12">
      <CustomeSectionHeadingComponent title="Charming" subPartTitle="Hotels" buttonTitle="List Your Accommodation" />
      <CommonCarousel images={images} />;
    </div>
  );
};

export default CharmingHotelsScreen;
