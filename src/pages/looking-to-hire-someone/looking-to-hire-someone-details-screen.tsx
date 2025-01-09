import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import DualHeading from '@atoms/heading/dual-heading';
import ReviewCard from '@atoms/card/review-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import type { ProffesionalData } from '../../../src/types/index';
import { sanityImageUrlBuilder } from '@api/index';

const LookingToHireSomeoneDetailsScreen: React.FC<{ proffesionalPersonData: ProffesionalData }> = ({
  proffesionalPersonData,
}) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <DualHeading className="font-bold">{proffesionalPersonData.name}</DualHeading>
      <TribeAfricaPagesCard
        className="border-none"
        image={sanityImageUrlBuilder(proffesionalPersonData.image).url()}
        content={
          <div>
            <p>{proffesionalPersonData.role}</p>
            <p>{proffesionalPersonData.experience}</p>
            <p>{proffesionalPersonData.phoneNumber}</p>
            <p>{proffesionalPersonData.email}</p>
            <p>{proffesionalPersonData.website}↗</p>
            <p>{proffesionalPersonData.description}</p>
          </div>
        }
      />
      <div className="my-4">
        <div className="flex my-4">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          <button className="border-b border-b-black ms-auto flex justify-center items-center gap-2" onClick={() => {}}>
            <FontAwesomeIcon icon={faPencil} /> write a review
          </button>
        </div>
        <div id="reviews" className="flex flex-col gap-4">
          {proffesionalPersonData.reviews?.map((item, index) => <ReviewCard key={index} data={item} />)}
        </div>
      </div>
    </div>
  );
};

export default LookingToHireSomeoneDetailsScreen;
