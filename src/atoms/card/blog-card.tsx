import React from 'react';
import { useNavigate } from 'react-router';

interface BlogCardDataProps {
  _id: string;
  image: string;
  title?: string;
  redirectUrl: string;
}

interface BlogCardProps {
  data: BlogCardDataProps;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full relative grid">
      <div
        className="aspect-square bg-cover rounded-md relative"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      ></div>
      <p>{data.title}</p>
      <button className="bg-gray-300 p-2 px-6 rounded-lg text-sm m-auto" onClick={() => navigate('/blogs/' + data._id)}>
        Know more
      </button>
    </div>
  );
};

export default BlogCard;
