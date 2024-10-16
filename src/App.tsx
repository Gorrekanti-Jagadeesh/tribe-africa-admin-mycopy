import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BusinessContainer from './pages/business/BusinessContainer';
import HomeContainer from './pages/home/HomeContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/:country/business" element={<BusinessContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
