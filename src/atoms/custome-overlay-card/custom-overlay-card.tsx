interface CustomOverLayCardProps {
  imageUrl: string;
  overlayTextContent: React.ReactNode;
  title?: string;
}

const CustomOverLayCard: React.FC<CustomOverLayCardProps> = ({ imageUrl, overlayTextContent, title }) => {
  return (
    <div className="relative w-60 h-60 rounded-lg border border-slate-300 m-auto overflow-hidden group cursor-pointer">
      <img
        src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        alt="1"
        loading="lazy"
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-80 flex items-center justify-center transition-opacity duration-300">
        <div className="text-white">Hello World</div>
      </div>
    </div>
  );
};

export default CustomOverLayCard;
