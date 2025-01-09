import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DesignsIcon, TemplatesIcon, ImageIcon, CreateDesignIcon, WidgetIcon } from './components/Icons.tsx';
import { wbExpandedSignal, selectedGrandPillSignal } from '../state.ts';

const GrandPills: React.FC = () => {
  const grandPillsRef = useRef(null);

  useGSAP(() => {
    // Set initial state
    gsap.set(".grand-pill", { y: 20, opacity: 0 });
    
    if (wbExpandedSignal.value) {
      // Show grand-pills with animation
      gsap.fromTo(
        ".grand-pill",
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
    } else {
      // Hide grand-pills with animation
      gsap.to(".grand-pill", {
        y: -20,
        duration: 0.3,
        opacity: 0,
        ease: "back.out(1.7)",
      });
    }
  }, { scope: grandPillsRef, dependencies: [wbExpandedSignal.value] });

  return (
    <div className="search-categories" ref={grandPillsRef}>
    <GrandPillButton 
        icon={<TemplatesIcon />}
        label="Search Templates"
        id="templates"
        isActive={selectedGrandPillSignal.value === 'templates'}
        className="btn-template"
      />
      <GrandPillButton 
        isActive={selectedGrandPillSignal.value === 'search'}
        icon={<DesignsIcon />}
        label="Search your designs"
        id="search"
        className="btn-design"
      />
      
      <GrandPillButton 
        icon={<ImageIcon />}
        label="Make an image"
        isActive={selectedGrandPillSignal.value === 'make-an-image'}
        className="btn-image"
        id="make-an-image"
      />
      <GrandPillButton 
        icon={<CreateDesignIcon />}
        label="Design with AI"
        isActive={selectedGrandPillSignal.value === 'design-with-ai'}
        className="btn-design"
        id="design-with-ai"
      />
      <GrandPillButton 
        icon={<WidgetIcon />}
        label="Create a widget"
        className="btn-widget"
        id="widget"
        isActive={selectedGrandPillSignal.value === 'widget'}
      />
    </div>
  );
};

interface GrandPillButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
  id: string;
}

const GrandPillButton: React.FC<GrandPillButtonProps> = ({ 
  icon, 
  label, 
  isActive, 
  className,
  id
}) => {
  return (
    <div onClick={() => selectedGrandPillSignal.value = id} className={`grand-pill ${isActive ? 'active' : ''} ${className || ''}`}>
      {icon}
      {label}
    </div>
  );
};

export default GrandPills;