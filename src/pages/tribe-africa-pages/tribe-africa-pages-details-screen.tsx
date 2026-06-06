import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
// import ReviewCard from '@atoms/card/review-card';

interface TribeAfricaPagaDetails {
  id: string;
  imageUrl: string;
  location: string;
  phoneNumber: string;
  websiteUrl: string;
  department: string;
  description: string;
}

interface tribeAfricaPageDetails {
  tribeAfricaPageDetails: TribeAfricaPagaDetails;
}

const TribeAfricaPagesDetailsScreen: React.FC<tribeAfricaPageDetails> = ({ tribeAfricaPageDetails }) => {
  return (
    <div className="p-2 md:p-4 max-w-8xl m-auto">
      <h4>{tribeAfricaPageDetails.department}</h4>
      <TribeAfricaPagesCard
        image={tribeAfricaPageDetails.imageUrl}
        content={
          <div>
            <p>{tribeAfricaPageDetails.description}</p>
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

export default TribeAfricaPagesDetailsScreen;
