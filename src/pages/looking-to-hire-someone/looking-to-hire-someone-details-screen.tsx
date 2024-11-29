import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';

interface ProffesionalPersonData {
  id: string;
  personName: string;
  description: string;
  imageUrl: string;
  area: string;
  email: string;
  experience: string;
  location: string;
  phoneNumber: string;
  profession: string;
}

const LookingToHireSomeoneDetailsScreen: React.FC<{ proffesionalPersonData: ProffesionalPersonData }> = ({
  proffesionalPersonData,
}) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <TribeAfricaPagesCard
        image={proffesionalPersonData.imageUrl}
        content={
          <div>
            <p>{proffesionalPersonData.personName}</p>
            <p>{proffesionalPersonData.description}</p>
          </div>
        }
      />
      <div className="my-4">
        <div className="flex my-4">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          {/* <button
            className="border-b border-b-black ms-auto flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPencil} /> write a review
          </button> */}
        </div>
        {/* <div id="reviews" className="flex flex-col gap-4">
          {reviews?.map((item, index) => <ReviewCard key={index} reviewData={item} />)}
        </div> */}
      </div>
    </div>
  );
};

export default LookingToHireSomeoneDetailsScreen;
