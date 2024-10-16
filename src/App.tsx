import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './pages/home/home-container';
import BusinessContainer from './pages/business/business-container';
import HolidayContainer from './pages/holiday/holiday-container';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/:country/business" element={<BusinessContainer />} />
        <Route path="/:country/holiday" element={<HolidayContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
