import { PortableText } from '@portabletext/react';
import { getEntryDataById, sanityImageUrlBuilder } from '../../api';
import { parseImageUrl } from '../../utils/sanity';
import { useParams } from 'react-router';
import { Loading } from '@atoms/common/loading';
import { useQuery } from '@tanstack/react-query';

const BlogDetailsPage = () => {
  const { blogId } = useParams();

  const {
    data: data,
    error: eventDetailsError,
    isLoading: eventDetailsLoading,
  } = useQuery({
    queryKey: ['events-details-page'],
    queryFn: () => getEntryDataById(blogId), // Handle undefined 'country'
  });

  if (eventDetailsLoading) {
    return <Loading />;
  }
  if (eventDetailsError) {
    return 'Error Occured';
  }

  return (
    <div className="flex flex-col gap-6 pb-10 px-10">
      <h1 className="text-4xl my-4 font-semibold capitalize">{data.title}</h1>
      <img className="aspect-video object-cover" src={sanityImageUrlBuilder(data.image).url()} />
      {typeof data.content == 'string' ? (
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      ) : (
        <PortableText
          value={data.content}
          components={{
            types: {
              image: ({ value }) => <img src={parseImageUrl(value.asset._ref)} alt={value.alt || 'Blog Image'} />,
            },
            marks: {
              link: ({ children, value }) => (
                <a href={value.href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            },
          }}
        />
      )}
    </div>
  );
};

export default BlogDetailsPage;
