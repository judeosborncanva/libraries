import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Wonderbox/Index.tsx';
import './main.css';
const App = () => {
  return (
    <Router>
      <div className="application">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 