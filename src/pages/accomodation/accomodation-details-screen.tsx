import { FC } from 'react';
import ReviewCard from '../../atoms/card/review-card';
import { StarRating } from '../../atoms/rating/star-rating';
import Modal from '@molecules/modal';
import shareIcon from '../../assets/icons/share-dotted.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faLocationPin, faPencil, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import StarRatingInput from '../../atoms/rating/start-rating-input';
import FileUploadWithPreview from '../../atoms/input-elements/file-upload-with-preview';
import { Loading } from '@atoms/common/loading';
import { ReviewProps, accomodationProps } from '../../types';
import { Control } from 'react-hook-form';
import { sanityImageUrlBuilder } from '@api/index';
import { PortableText } from '@portabletext/react';
import UnderlineHeading from '@atoms/heading/underline-heading';
import { fromSnakeCase, getAverageOfObjectValues } from '@utils/common';
import LeafletMap from '@molecules/maps/leaflet-map';

interface AccomodationDetailsScreenProps {
  reviews: ReviewProps[];
  data: accomodationProps;
  onSubmit: (FieldValues) => void;
  control: Control;
  isSubmitting: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AccommodationImage = ({ source }: { source: string }) => {
  return <img src={source} alt="hotel image" className="w-full h-full object-cover rounded-lg max-h-96" />;
};

const AccomodationDetailsScreen: FC<AccomodationDetailsScreenProps> = ({
  reviews,
  data,
  onSubmit,
  control,
  isSubmitting,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { getValues } = useForm();

  if (!data) return <>Data not received yet</>;

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          {/* Rating */}
          {data.reviews && (
            <div className="flex mt-2">
              <StarRating rating={getAverageOfObjectValues(data.reviews.fields)} />
              <p className="ml-2 m-auto text-gray-600 text-sm">{data.reviews.count} reviews</p>
            </div>
          )}
          {/* Address and Contact */}
          <div className="text-gray-600 mt-2">
            <p className="flex items-center">
              <span className="mr-1">
                <FontAwesomeIcon icon={faLocationPin} />
              </span>
              {data.address}
            </p>
            <span className="flex gap-4">
              <p className="flex items-center">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                {data.phone_no}
              </p>
              <p className="flex items-center">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                {data.website}
              </p>
            </span>
          </div>
        </div>
        <div className="mb-auto flex gap-8">
          <button>
            <img src={shareIcon} className="w-6" />
          </button>
          <button className="bg-white border border-black px-8 py-2 rounded-md shadow-sm hover:bg-gray-100">
            Book
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-6 flex flex-col lg:flex-row gap-4 lg:max-h-96 overflow-auto">
        {/* Main Image */}
        <div className="flex-1">
          {/* Ensure data.images is an array and has at least one element */}
          {Array.isArray(data.images) && data.images[0] && (
            <AccommodationImage source={sanityImageUrlBuilder(data.images[0]).url()} />
          )}
        </div>
        {/* Side Images */}
        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 lg:w-1/3">
          {Array.isArray(data.images) && data.images[1] && (
            <AccommodationImage source={sanityImageUrlBuilder(data.images[1]).url()} />
          )}
          {Array.isArray(data.images) && data.images[2] && (
            <AccommodationImage source={sanityImageUrlBuilder(data.images[2]).url()} />
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="my-6">
        <UnderlineHeading className="text-lg font-semibold">{data.about.title}</UnderlineHeading>
        <PortableText value={data.about.description} />
      </div>

      {/* Amenities Section */}
      <div className="my-6">
        <UnderlineHeading className="text-lg font-semibold" borderWidth="w-full">
          {data.amenities.title}
        </UnderlineHeading>
        <div className="md:flex justify-between">
          {data.amenities.list.map((amenity) => (
            <p className="text-wrap md:w-[45%]" key={amenity.title}>
              <span className="font-semibold">{amenity.title}</span>
              {' - '}
              {amenity.description}
            </p>
          ))}
        </div>
      </div>

      {/* Map */}
      <LeafletMap mark={data.name} latitude={data.location.latitude} longitude={data.location.longitude} />

      {/* Guest Reviews Breakdown */}
      <div>
        <UnderlineHeading className="text-lg font-semibold" borderWidth="w-full">
          Guest Reviews
        </UnderlineHeading>
        <div className="flex flex-wrap justify-between">
          {data.reviews && (
            <>
              {Object.keys(data.reviews.fields).map((field) => (
                <div className="flex justify-between w-full sm:w-[45%]" key={field}>
                  <p>{fromSnakeCase(field)}</p>
                  <StarRating rating={data.reviews.fields[field]} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="my-4">
        <div className="flex my-4">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          <button
            className="border-b border-b-black ms-auto flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPencil} /> write a review
          </button>
        </div>
        {reviews && (
          <div id="reviews" className="flex flex-col gap-4">
            {reviews.map((item, index) => (
              <ReviewCard key={index} data={item} />
            ))}
          </div>
        )}
      </div>

      {/* Modal for writing a review */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Prevent default form submission
            onSubmit(getValues() as FormData); // Cast getValues to FormData
          }}
          className="p-8 bg-white rounded-lg w-full lg:w-[1000px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
            {/* Review Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Add a written review</h2>
              <Controller
                name="review"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    required
                    {...field}
                    className="w-full h-48 p-2 border rounded outline-none"
                    placeholder="Write your review..."
                  />
                )}
              />
            </div>

            {/* Rating Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Rate your Experience</h2>
              <div className="border border-gray-300 rounded-lg p-4">
                {['Quality of Service', 'Comfort', 'Food and beverage', 'Location', 'Cleanliness'].map((aspect) => (
                  <div key={aspect} className="flex justify-between items-center mt-2">
                    <label className="mr-2">{aspect}:</label>
                    <Controller
                      name={aspect.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')}
                      control={control}
                      defaultValue={0}
                      render={({ field }) => <StarRatingInput {...field} />}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Add some Photos</h3>
                <FileUploadWithPreview control={control} />
              </div>
              {/* Submit Button */}
              <div className="flex items-end justify-end">
                <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                  {isSubmitting ? <Loading /> : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AccomodationDetailsScreen;
