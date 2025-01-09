import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { adjustmentsExpandedSignal, selectedFilterSignal } from '../state';

const AdjustmentsExpanded = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (adjustmentsExpandedSignal.value) {
      gsap.set(containerRef.current, {
        display: 'flex'
      });
      
      gsap.to(containerRef.current, {
        duration: 0.4,
        opacity: 1,
        padding: 16,
        height: 'auto'
      });
    } else {
      gsap.to(containerRef.current, {
        duration: 0.4,
        opacity: 0,
        padding: 0,
        height: 0,
        onComplete: () => {
          gsap.set(containerRef.current, {
            display: 'none'
          });
        }
      });
    }
  }, { scope: containerRef, dependencies: [adjustmentsExpandedSignal.value] });

  const handleItemClick = (item: any) => {
    adjustmentsExpandedSignal.value = false;
    // You might want to add the category switch logic here
    // _switchCategory(item.label);
  };

  return (
    <div ref={containerRef} className="expanded-adjustments-view" style={{ display: 'none', height: 0, padding: 0, opacity: 0 }}>
      <div className="container">
        {selectedFilterSignal.value.map((item, index) => (
          item.type === 'pill' ? (
            <div 
              key={item.id}
              className="pill"
              onClick={() => handleItemClick(item)}
            >
              {item.icon && <span className="icon">{item.icon}</span>}
              <span className="label">{item.label}</span>
            </div>
          ) : (
            <div 
              key={item.id}
              className="image-item"
              onClick={() => handleItemClick(item)}
            >
              <img 
                src={item.src}
                alt={item.label}
              />
              {item.label && <span className="label">{item.label}</span>}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default AdjustmentsExpanded;