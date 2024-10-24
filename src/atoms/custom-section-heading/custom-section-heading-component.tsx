import CustomeButton from '../custom-button/custom-button-component';

interface customHeadingProps {
  title: string;
  subPartTitle: string;
  buttonTitle: string;
  titleStyles?: string;
}

const CustomeSectionHeadingComponent: React.FC<customHeadingProps> = ({
  title,
  subPartTitle,
  buttonTitle,
  titleStyles,
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap my-8">
      <h2 className={`text-4xl ${titleStyles}`}>
        {title} <span className="text-[#FF6600] font-[Rufina]">{subPartTitle}</span>
      </h2>
      <CustomeButton title={buttonTitle} />
    </div>
  );
};

export default CustomeSectionHeadingComponent;
