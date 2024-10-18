import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './pages/home/home-container';
import BusinessContainer from './pages/business/business-container';
import HolidayContainer from './pages/holiday/holiday-container';
import InnovationsScreen from './pages/home/navbar-section/discover-section/elements/innovations-screen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/:country/business" element={<BusinessContainer />} />
        <Route path="/:country/holiday" element={<HolidayContainer />} />
        <Route path="/africa/smart-innovations" element={<InnovationsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
