import { useQuery } from '@tanstack/react-query';
import { uploadImage } from '../../api';
import { useParams } from 'react-router-dom';
import AccomodationDetailsScreen from './accomodation-details-screen';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { UploadBody } from '@sanity/client';
import { Loading } from '@atoms/common/loading';
import { useState } from 'react';
import { query, sanity } from '@utils/sanity';
import { appendToAverage } from '@utils/common';

const AccommodationDetailsContainer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { categoryInfoId } = useParams<{ categoryInfoId: string }>();

  const fetchReviewsByHotelId = async (id: string) => {
    const reviews = await sanity.GET(query.REVIEWS.ACCOMMODATION(id));
    return reviews;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['accommodation_details'],
    queryFn: () => sanity.GET(query.ACCOMMODATION.DETAILS(categoryInfoId)),
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', categoryInfoId || 'defaultId'],
    queryFn: () => (categoryInfoId ? fetchReviewsByHotelId(categoryInfoId) : Promise.resolve([])),
  });

  const { control, handleSubmit } = useForm();

  console.log('------ details', data);
  const onSubmit = async (formData: Record<string, number>) => {
    if (
      !formData.quality_of_service ||
      !formData.comfort ||
      !formData.food_and_beverage ||
      !formData.location ||
      !formData.cleanliness
    ) {
      alert('Enter valid rating scores');
      return;
    }

    setIsSubmitting(true);
    const token = Cookies.get('googleUser');
    const userDetails = token ? JSON.parse(token) : null;

    const { displayName } = userDetails || {};

    // Upload images using the uploadImage function
    const uploadedImages = await Promise.all(
      Array.isArray(formData.images)
        ? formData.images.map(async (image: UploadBody | string) => {
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
        : []
    );

    // Filter out any null values in case of upload errors
    const validImages = uploadedImages.filter((image) => image !== null);

    const submissionData = {
      key: `review:accommodation:${categoryInfoId}`, // Use categoryInfoId for hotel_id
      content: formData.reviews,
      ratings: {
        quality_of_service: formData.quality_of_service,
        comfort: formData.comfort,
        food_and_beverage: formData.food_and_beverage,
        location: formData.location,
        cleanliness: formData.cleanliness,
      },
      images: validImages,
      submitted_by: displayName,
    };

    try {
      // Submit review to Sanity CMS
      sanity.POST('review', submissionData).then(() => {
        if (!data.reviews) {
          data.reviews = {
            count: 0,
            fields: {
              quality_of_service: 0,
              comfort: 0,
              food_and_beverage: 0,
              location: 0,
              cleanliness: 0,
            },
          };
        }
        sanity.PUT(categoryInfoId, {
          ...data,
          reviews: {
            count: 1 + data.reviews.count,
            fields: {
              quality_of_service: appendToAverage(
                data.reviews.fields.quality_of_service,
                data.reviews.count,
                formData.quality_of_service
              ),
              comfort: appendToAverage(data.reviews.fields.comfort, data.reviews.count, formData.comfort),
              food_and_beverage: appendToAverage(
                data.reviews.fields.food_and_beverage,
                data.reviews.count,
                formData.food_and_beverage
              ),
              location: appendToAverage(data.reviews.fields.location, data.reviews.count, formData.location),
              cleanliness: appendToAverage(data.reviews.fields.cleanliness, data.reviews.count, formData.cleanliness),
            },
          },
        });
      });
      fetchReviewsByHotelId(categoryInfoId);
      // Close the modal after submission
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  if (isLoading) return <Loading />;

  if (error) return <div>Error fetching reviews: {error.message}</div>;

  if (!data) return <>data not received yet</>;

  return (
    <div>
      <AccomodationDetailsScreen
        hostel={data}
        reviews={reviews}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        isSubmitting={isSubmitting}
        setIsModalOpen={(isOpen: boolean) => setIsModalOpen(isOpen)}
        isModalOpen={isModalOpen}
        data={data}
      />
    </div>
  );
};

export default AccommodationDetailsContainer;
