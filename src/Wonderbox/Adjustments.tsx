import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {  currentAdjustments, selectedGrandPillSignal, setAdjustment, setSelectedFilter } from '../state';
import Filter from './components/Filter';
import Pill from './components/Pill';

const Adjustments: React.FC = () => {
  const bottomRef = useRef(null);

  useGSAP(() => {
    const targets = document.querySelectorAll(".adjustment");
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y: 20, opacity: 0 },
      {
        y: 0,
        duration: 0.4,
        opacity: 1,
        delay: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  }, { scope: bottomRef, dependencies: [currentAdjustments.value] });

  const toggleAdjustment = (id: string) => {
    setAdjustment(id);
  }
  const closeAdjustment = () => {
    // revert back to the grand pill? 
    setAdjustment(selectedGrandPillSignal.value);
  }

  if (!currentAdjustments.value) return null;
  const adjustments = currentAdjustments.value.map((adjustment: any) => {
    if (adjustment.type === 'pill') {
      return <Pill className="adjustment" key={adjustment.id} icon={adjustment.icon} label={adjustment.label} isActive={adjustment.isActive} onClick={() => !adjustment.isActive ? toggleAdjustment(adjustment.id) : closeAdjustment()} onClose={closeAdjustment} />;
    }

    if (adjustment.type === 'filter') {
    return <Filter className="adjustment" key={adjustment.id} label={adjustment.label} isActive={adjustment.isActive} selected={adjustment.selected} selectedLabel={adjustment.selectedLabel} onClick={() => setSelectedFilter(adjustment.id)} />;
    }
  });

  return (
    <div className="bottom" ref={bottomRef}>
      <div className="adjustments">
        {adjustments}
      </div>
    </div>
  );
};

export default Adjustments;