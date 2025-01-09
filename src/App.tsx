import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Wonderbox/Index.tsx';
import Marketing from './Wonderbox/Marketing.tsx';
import YourLibrary from './Wonderbox/YourLibrary.tsx';
import General from './Wonderbox/General.tsx';
import Brand from './Wonderbox/Brand.tsx';
import './main.css';
const App = () => {
  return (
    <Router>
      <div className="application">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/your-library" element={<YourLibrary />} />
          <Route path="/general" element={<General />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/brand" element={<Brand />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App; 