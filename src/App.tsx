import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './pages/home/HomeContainer';
import BusinessContainer from './pages/business/BusinessContainer';
import HolidayContainer from './pages/holiday/HolidayContainer';

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
