import CustomeButton from '../custom-button/custom-button-component';

interface CustomHeadingProps {
  title: string;
  subPartTitle: string;
  buttonTitle?: string;
  titleStyles?: string;
  subTitleStyles?: string;
  containerStyles?: string;
  descriptionStyles?: string;
  description?: string; // New optional prop for description
  showButton?: boolean; // New prop to conditionally render the button
}

const CustomSectionHeadingComponent: React.FC<CustomHeadingProps> = ({
  title,
  subPartTitle,
  buttonTitle,
  titleStyles,
  containerStyles = 'mx-6 md:mx-10 lg:mx-16',
  description,
  showButton = true, // Default to true, but can be set to false
  descriptionStyles,
  subTitleStyles,
}) => {
  return (
    <div className={`flex justify-between items-center flex-wrap my-8 ${containerStyles}`}>
      <div className={`flex flex-col ${!showButton && 'w-[100%]'}`}>
        <h2 className={`text-4xl ${titleStyles}`}>
          {title} <span className={`${subTitleStyles}`}>{subPartTitle}</span>
        </h2>
        {description && <p className={`mt-2 text-lg text-gray-600 ${descriptionStyles}`}>{description}</p>}{' '}
        {/* Conditional rendering of description */}
      </div>
      {showButton && <CustomeButton title={buttonTitle} />} {/* Conditionally render the button */}
    </div>
  );
};

export default CustomSectionHeadingComponent;
