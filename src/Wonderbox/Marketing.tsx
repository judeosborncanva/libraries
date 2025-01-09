import React from 'react';
import './WonderBox.scss';
import WonderBox from './WonderBox.tsx';

const Home = () => {
  return (
    <div className="home">
      <div className="toolbar">
        <img src="images/toolbar-top.png" alt="" />
        <img src="images/toolbar-bottom.png" alt="" />
      </div>

      <div className="sidepanel">
        <ul>
          <li>Recents</li>
          <li>Shared with you</li>
        </ul>

        <div><span>Libraries</span><button>+</button></div>
        <ul>
          <li onClick={() => window.location.href = '/your-library'}>Your Library</li>
          <li onClick={() => window.location.href = '/general'}>General</li>
          <li onClick={() => window.location.href = '/marketing'}>Marketing</li>
          <li onClick={() => window.location.href = '/brand'}>Brand</li>
        </ul>
      </div>

      <div className="home-main">
        <div className="top-gradient">
         <h2>Marketing</h2>
          
          <WonderBox />
        </div>

        <div className="designs">
          <div className="first">
            <h3 className="title">Starred for Marketing</h3>
          </div>

          <div className="grid">
            <div className="design search-design">
              <img src="images/designs/search-design/0.png" alt="" />
              <img src="images/designs/search-design/1.png" alt="" />
              <img src="images/designs/search-design/2.png" alt="" />
              <img className="preso" src="images/designs/search-design/3.png" alt="" />
              <img src="images/designs/search-design/4.png" alt="" />
              <img className="preso" src="images/designs/search-design/5.png" alt="" />
              <img src="images/designs/search-design/6.png" alt="" />
              <img src="images/designs/search-design/7.png" alt="" />
              <img src="images/designs/search-design/8.png" alt="" />
              <img className="preso" src="images/designs/search-design/9.png" alt="" />
              <img src="images/designs/search-design/10.png" alt="" />
              <img src="images/designs/search-design/11.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;