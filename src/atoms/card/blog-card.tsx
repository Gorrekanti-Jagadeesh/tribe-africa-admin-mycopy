import { useNavigate } from 'react-router';
import { BlogContentProps } from '../../types';

const BlogCard = ({ data }: { data: BlogContentProps }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full relative grid gap-2">
      <div
        className="aspect-square bg-cover bg-center rounded-md relative"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      ></div>
      <p className="text-nowrap truncate">{data.title}</p>
      <button className="bg-gray-300 p-2 px-6 rounded-lg text-sm m-auto" onClick={() => navigate('/blogs/' + data._id)}>
        Know more
      </button>
    </div>
  );
};

export default BlogCard;
