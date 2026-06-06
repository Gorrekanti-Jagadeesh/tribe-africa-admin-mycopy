import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';
import DualHeading from '@atoms/heading/dual-heading';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { useParams } from 'react-router';

interface Item {
  title: string;
  image: { asset: { _ref: string } };
  description: string;
  _id: string;
  content?: string;
}

const MustSeeAndDoDetails = () => {
  const { category, country, id } = useParams<{ category: string; country: string; id: string }>();

  const { data, error, isLoading } = useQuery<Item[]>({
    queryKey: ['must_see_and_do_data', id],
    queryFn: () => sanity.GET(query.HOLIDAY.MUST_SEE_AND_DO.DETAILS(id)),
  });

  console.log(country, category);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  const { title, image, description } = data?.[0] || {};

  return (
    <div className="max-w-8xl m-auto p-4">
      {title && <DualHeading className="my-4">{title}</DualHeading>}
      {image && (
        <img src={sanityImageUrlBuilder(image.asset._ref).url()} className="float-right max-w-96" alt={title} />
      )}
      {description && (
        <div>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default MustSeeAndDoDetails;
