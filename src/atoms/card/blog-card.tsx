import { useNavigate } from 'react-router';
import { BlogContentProps } from '@/types';
import { sanityImageUrlBuilder } from '@api/index';

const BlogCard = ({ data }: { data: BlogContentProps }) => {
  const navigate = useNavigate();

  const backgroundImageUrl =
    typeof data?.image === 'string' ? data?.image : sanityImageUrlBuilder(data?.image?.asset?._ref)?.url();

  return (
    <div className="w-full grid gap-3 group">
      <div
        className="w-full bg-cover bg-center rounded-[10px] overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          aspectRatio: '424/351',
        }}
      />
      <p className="font-poppins font-medium text-xl truncate">{data.title}</p>
      <button
        className="bg-brand-orange text-white font-poppins font-semibold px-6 py-2.5 rounded-[10px] text-sm w-fit hover:bg-[#E05A00] transition-colors"
        onClick={() => navigate(data._id)}
      >
        Know more
      </button>
    </div>
  );
};

export default BlogCard;
