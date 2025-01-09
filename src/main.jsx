import React from 'react';
import ReactDOM from 'react-dom/client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './main.css';
import App from './App.tsx';

gsap.registerPlugin(useGSAP);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 