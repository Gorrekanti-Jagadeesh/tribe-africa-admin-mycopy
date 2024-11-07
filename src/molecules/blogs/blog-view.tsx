import { useState, useEffect, SetStateAction } from 'react';

import { PortableText } from '@portabletext/react';
import { getEntryDataById } from '../../api';

import { BlogContentProps } from '../../types';

const BlogView = ({ blogId, parseImageUrl }: { blogId: string; parseImageUrl: (imageRef: string) => string }) => {
  const [data, setData] = useState<BlogContentProps>({
    _id: '1',
    title: '',
    image: '',
    content: '',
  });
  const [image, setImage] = useState('');

  useEffect(() => {
    getEntryDataById(blogId).then((res: SetStateAction<BlogContentProps>[]) => {
      setData(res[0]);
    });
  }, [blogId]);

  useEffect(() => {
    if (typeof data.image != 'string') setImage(parseImageUrl(data.image.asset._ref));
  }, [data]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl my-4 font-semibold capitalize">{data.title}</h1>
      <img className="aspect-video object-cover" src={image} />
      {typeof data.content == 'string' ? (
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      ) : (
        <PortableText
          value={data.content}
          components={{
            types: {
              image: ({ value }) => <img src={value.asset.url} alt={value.alt || 'Blog Image'} />,
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

export default BlogView;
