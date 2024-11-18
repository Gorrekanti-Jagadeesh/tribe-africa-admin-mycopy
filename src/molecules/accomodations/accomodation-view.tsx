import React, { useState } from 'react';
import ReviewCard from '../../atoms/card/review-card';
import { StarRating } from '../../atoms/rating/star-rating';
import Modal from '../modal'; // Adjust the import path as necessary

import shareIcon from '../../assets/icons/share-dotted.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faLocationPin, faPencil, faPhone } from '@fortawesome/free-solid-svg-icons';

import { useForm, Controller } from 'react-hook-form';
import StarRatingInput from '../../atoms/rating/start-rating-input';
import FileUploadWithPreview from '../../atoms/input-elements/file-upload-with-preview';
import Cookies from 'js-cookie';
import sanityClient from '../../sanityClient';
import { uploadImage } from '../../api';
import { UploadBody } from '@sanity/client';
import { Review } from '../../types';
import { HotelData } from '../../types';

interface AccommodationViewProps {
  hotelData: HotelData;
  reviews: Review[];
}

const AccommodationImage = ({ source }: { source: string }) => {
  return <img src={source} alt="hotel image" className="w-full h-full object-cover rounded-lg max-h-96" />;
};

const AccommodationView: React.FC<AccommodationViewProps> = ({ hotelData, reviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (formData: any) => {
    const token = Cookies.get('googleUser');
    const userDetails = token ? JSON.parse(token) : null;

    const { displayName, photoURL } = userDetails || {};

    // Calculate the total rating as the average of the individual ratings
    const ratings = [
      formData.quality_of_service,
      formData.comfort,
      formData.food_and_beverage,
      formData.location,
      formData.cleanliness,
    ];

    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;

    // Upload images using the uploadImage function
    const uploadedImages = await Promise.all(
      (formData.images || []).map(async (image: UploadBody | string) => {
        try {
          const uploadedImage = await uploadImage(image);
          return {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id,
            },
            _key: uploadedImage._id,
          };
        } catch (error) {
          console.error('Error uploading image:', error);
          return null;
        }
      })
    );

    // Filter out any null values in case of upload errors
    const validImages = uploadedImages.filter((image) => image !== null);

    const submissionData = {
      hotel_id: hotelData._id,
      review_text: formData.review,
      quality_of_service: formData.quality_of_service,
      comfort: formData.comfort,
      food_and_beverage: formData.food_and_beverage,
      location: formData.location,
      cleanliness: formData.cleanliness,
      total_rating: totalRating,
      created_at: new Date().toISOString(),
      images: validImages,
      reviewer_name: displayName,
      reviewer_image: photoURL,
    };

    // Submit review to Sanity CMS
    sanityClient
      .create({
        _type: 'review',
        ...submissionData,
      })
      .then((response) => {
        console.log('Review submitted:', response);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{hotelData.name}</h1>
          {/* Rating */}
          <div className="flex mt-2">
            <StarRating rating={3} />
            <p className="ml-2 m-auto text-gray-600 text-sm">{102} reviews</p>
          </div>
          {/* Address and Contact */}
          <div className="text-gray-600 mt-2">
            <p className="flex items-center">
              <span className="mr-1">
                <FontAwesomeIcon icon={faLocationPin} />
              </span>
              {hotelData.location}
            </p>
            <span className="flex gap-4">
              <p className="flex items-center">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                {hotelData.phone_number}
              </p>
              <p className="flex items-center">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                {hotelData.website_url}
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
          {Array.isArray(hotelData.images) && hotelData.images[0] && (
            <AccommodationImage source={hotelData.images[0]} />
          )}
        </div>
        {/* Side Images */}
        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 lg:w-1/3">
          {Array.isArray(hotelData.images) && hotelData.images[1] && (
            <AccommodationImage source={hotelData.images[1]} />
          )}
          {Array.isArray(hotelData.images) && hotelData.images[2] && (
            <AccommodationImage source={hotelData.images[2]} />
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700">{hotelData.description}</p>
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
        <div id="reviews" className="flex flex-col gap-4">
          {reviews.map((item, index) => (
            <ReviewCard key={index} reviewData={item} />
          ))}
        </div>
      </div>

      {/* Modal for writing a review */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded-lg w-full lg:w-[1000px] mx-auto">
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
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AccommodationView;
