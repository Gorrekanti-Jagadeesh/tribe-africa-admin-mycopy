interface ProffesionalIcons {
  label: string;
  icon: React.ReactNode;
}

interface IconsCardProps {
  data: ProffesionalIcons;
}

const IconsCard: React.FC<IconsCardProps> = ({ data }) => {
  return (
    <div className="w-full">
      {/* {data.map((item) => ( */}
      <div key={data.label} className="flex flex-col items-center p-2 cursor-pointer">
        {data.icon}
        <p>{data.label}</p>
      </div>
    </div>
  );
};

export default IconsCard;
