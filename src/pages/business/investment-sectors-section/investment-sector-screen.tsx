import CustomSectionHeadingComponent from '../../../atoms/custom-section-heading/custom-section-heading-component';

const InvestmentSectorsScreen: React.FC = () => {
  return (
    <div className="container">
      <CustomSectionHeadingComponent
        title="Key"
        subPartTitle="Investment Sectors"
        showButton={false}
        subPartTitle2={`In algeria`}
        titleStyles="font-[Poppins] text-[#000]"
        subTitleStyles="text-[#FF6600] font-[Rufina]"
      />
      <div>{}</div>
    </div>
  );
};

export default InvestmentSectorsScreen;
