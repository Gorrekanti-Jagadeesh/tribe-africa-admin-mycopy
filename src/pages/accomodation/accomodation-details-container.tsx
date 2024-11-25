import { useQuery } from '@tanstack/react-query';
import { getDataByDocumentTypeWithId, uploadImage } from '../../api';
import { useParams, useLocation } from 'react-router-dom';
import AccomodationDetailsScreen from './accomodation-details-screen';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'js-cookie';
import sanityClient from '../../sanityClient';
import { UploadBody } from '@sanity/client';

const AccommodationDetailsContainer = () => {
  const { accommodationId } = useParams<{ accommodationId: string }>();

  const location = useLocation();
  const { data } = location.state || {}; // Add fallback empty object

  const fetchReviewsByHotelId = async (hotelId: string) => {
    const reviews = await getDataByDocumentTypeWithId('review', 'hotel_id', hotelId, [
      'review_text',
      'quality_of_service',
      'comfort',
      'food_and_beverage',
      'location',
      'cleanliness',
      'total_rating',
      'created_at',
      'images',
      'reviewer_name',
      'reviewer_image',
    ]);

    // Define the type for reviews
    type Review = {
      created_at: string;
    };

    // Sort reviews by created_at in descending order
    reviews.sort((a: Review, b: Review) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return reviews;
  };

  const {
    data: reviews,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['reviews', accommodationId || 'defaultId'],
    queryFn: () => (accommodationId ? fetchReviewsByHotelId(accommodationId) : Promise.resolve([])),
  });

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
      hotel_id: accommodationId, // Use accommodationId for hotel_id
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
        // Optionally handle the response
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching reviews: {error.message}</div>;

  return (
    <div>
      <AccomodationDetailsScreen
        reviews={reviews}
        hotelData={data}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </div>
  );
};

export default AccommodationDetailsContainer;
