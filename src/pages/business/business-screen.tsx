import Footer from '../../molecules/footer/footer';
import { BusinessHeader } from '../../molecules/header/business-header';

const BusinessScreen = () => {
  return (
    <div>
      <BusinessHeader />
      <div className="text-center bg-slate-200 m-6">Business Content</div>
      <Footer />
    </div>
  );
};

export default BusinessScreen;
