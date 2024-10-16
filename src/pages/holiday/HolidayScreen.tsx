import Footer from '../../molecules/footer/Footer';
import { HolidayHeader } from '../../molecules/header/holiday-header';

const HolidayScreen = () => {
  return (
    <div>
      <div>
        <HolidayHeader />
        <div className="text-center bg-slate-200 m-6">Holiday Content</div>
        <Footer />
      </div>
    </div>
  );
};

export default HolidayScreen;
