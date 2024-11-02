import Footer from '../../molecules/footer/footer';
import { HolidayHeader } from '../../molecules/header';

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
