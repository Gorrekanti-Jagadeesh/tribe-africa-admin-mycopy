import Footer from '../../molecules/footer/footer';
import { BusinessHeader } from '../../molecules/header/business-header';

const BusinessScreen = ({ country }: { country: string }) => {
  return (
    <div>
      <div className="bg-orange-500 p-4 text-white text-xl text-center">
        <p>Getting there - Book Flight and accomodation</p>
      </div>
      <BusinessHeader country={country} />
      <div className="text-center bg-slate-200 m-6">Business Content</div>
      <Footer />
    </div>
  );
};

export default BusinessScreen;
