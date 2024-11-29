interface ProffesionalIcons {
  label: string;
  icon: React.ReactNode;
}

interface IconsCardProps {
  proffesionalIcons: ProffesionalIcons[];
}

const IconsCard: React.FC<IconsCardProps> = ({ proffesionalIcons }) => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {proffesionalIcons.map((proffesionalIcon) => (
        <div key={proffesionalIcon.label} className="flex flex-col items-center p-2 cursor-pointer">
          {proffesionalIcon.icon}
          <p>{proffesionalIcon.label}</p>
        </div>
      ))}
    </div>
  );
};

export default IconsCard;
