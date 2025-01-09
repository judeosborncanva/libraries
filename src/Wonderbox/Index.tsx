import React from 'react';
import './WonderBox.scss';
import WonderBox from './WonderBox.tsx';
import { pageHeadlineSignal } from '../state.ts';
const Home = () => {
  return (
    <div className="home">
      {/* <div className="toolbar">
        <img src="images/toolbar-top.png" alt="" />
        <img src="images/toolbar-bottom.png" alt="" />
      </div> */}
      
      <div className="home-main">
        <div className="top-gradient">
          <h3>Good morning, Jessica 👋</h3>
          <h2 dangerouslySetInnerHTML={{ __html: pageHeadlineSignal.value }}></h2>
          
          <WonderBox />
        </div>

        <div className="doctypes">
          <ul>
            <li><img src="images/doctypes/0.png" alt="" />Instagram<br />post</li>
            <li><img src="images/doctypes/1.png" alt="" />Social</li>
            <li><img src="images/doctypes/2.png" alt="" />Print</li>
            <li><img src="images/doctypes/3.png" alt="" />Video</li>
            <li><img src="images/doctypes/4.png" alt="" />Whiteboard</li>
            <li><img src="images/doctypes/5.png" alt="" />Background<br />remover</li>
            <li><img src="images/doctypes/6.png" alt="" />Photo editor</li>
            <li><img src="images/doctypes/7.png" alt="" />Custom size</li>
            <li><img src="images/doctypes/8.png" alt="" />Upload</li>
            <li><img src="images/doctypes/9.png" alt="" />Add</li>
          </ul>
        </div>

        <div className="designs">
          <div className="first">
            <h3 className="title">Your first design!</h3>
            <img src="images/designs/0.png" alt="" />
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