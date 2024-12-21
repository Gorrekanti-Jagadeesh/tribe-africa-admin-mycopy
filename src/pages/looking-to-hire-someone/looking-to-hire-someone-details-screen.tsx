import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import DualHeading from '@atoms/heading/dual-heading';
import ReviewCard from '@atoms/card/review-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import type { ProffesionalData, ReviewProps } from '../../../src/types/index';

const reviews: ReviewProps[] = [
  {
    _id: 'okati',
    _key: 'feedback:person:manodu',
    content: 'Ma anna devudu lanti vadu',
    ratings: [
      {
        title: 'Quality of service',
        score: 5,
      },
      {
        title: 'Reliability',
        score: 4,
      },
      {
        title: 'Punctuality',
        score: 2,
      },
      {
        title: 'Integrity',
        score: 5,
      },
    ],
    submitted_by: 'some chillara fan',
  },
];

const LookingToHireSomeoneDetailsScreen: React.FC<{ proffesionalPersonData: ProffesionalData }> = ({
  proffesionalPersonData,
}) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <DualHeading className="font-bold">{proffesionalPersonData.name}</DualHeading>
      <TribeAfricaPagesCard
        className="border-none"
        image={proffesionalPersonData.image}
        content={
          <div>
            <p>{proffesionalPersonData.role}</p>
            <p>{proffesionalPersonData.experience}</p>
            <p>{proffesionalPersonData.phone_no}</p>
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
          {reviews?.map((item, index) => <ReviewCard key={index} data={item} />)}
        </div>
      </div>
    </div>
  );
};

export default LookingToHireSomeoneDetailsScreen;
