interface CardDataProps {
  image: string;
  title?: string;
  isOverlay?: boolean;
  overlayText?: string;
  onClick?: () => void;
}

interface OverLayCardProps {
  data: CardDataProps;
}

const OverLayCard: React.FC<OverLayCardProps> = ({ data }) => {
  return (
    <div className="w-full inline-block cursor-pointer group relative" onClick={data.onClick}>
      <div
        className="aspect-square bg-cover rounded-md relative"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      >
        {data.isOverlay && (
          <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100">
            <div className=" bg-black rounded-md flex items-center justify-center transition-opacity duration-300">
              <div className="text-white">{data.overlayText}</div>
            </div>
          </div>
        )}
      </div>
      <p>{data.title}</p>
    </div>
  );
};

export default OverLayCard;
