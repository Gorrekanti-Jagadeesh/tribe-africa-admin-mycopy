interface ProffesionalIcons {
  label: string;
  icon: React.ReactNode;
}

interface IconsCardProps {
  data: ProffesionalIcons;
  onClick?: () => void;
}

const IconsCard: React.FC<IconsCardProps> = ({ data, onClick }) => {
  return (
    <div className="w-full cursor-pointer" onClick={onClick}>
      {/* {data.map((item) => ( */}
      <div key={data.label} className="flex flex-col items-center p-2 cursor-pointer">
        {data.icon}
        <p>{data.label}</p>
      </div>
    </div>
  );
};

export default IconsCard;
