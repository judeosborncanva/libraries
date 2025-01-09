import React from 'react';
interface PillProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

export const Pill: React.FC<PillProps> = ({ icon, label, isActive, onClose, onClick }) => (
  <div className={`adjustment ${isActive ?'active' : ''} ${isActive ? 'pill-trigger' : ''}`} onClick={onClick}>
    <span>{icon}</span>
    {label}
    {isActive && (
      <svg 
        className="close" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={(e) => {
          e.stopPropagation();  // Prevent triggering parent onClick
          onClose?.();
        }}
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M8.8194 8.05024C8.52651 7.75734 8.05163 7.75734 7.75874 8.05024C7.46585 8.34313 7.46585 8.818 7.75874 9.1109L10.9407 12.2929L7.75873 15.4749C7.46584 15.7678 7.46584 16.2426 7.75873 16.5355C8.05163 16.8284 8.5265 16.8284 8.81939 16.5355L12.0014 13.3535L15.1834 16.5355C15.4763 16.8284 15.9511 16.8284 16.244 16.5355C16.5369 16.2426 16.5369 15.7678 16.244 15.4749L13.062 12.2929L16.244 9.1109C16.5369 8.818 16.5369 8.34313 16.244 8.05024C15.9511 7.75734 15.4762 7.75734 15.1834 8.05024L12.0014 11.2322L8.8194 8.05024Z" fill="#0E1318"/>
      </svg>
    )}
  </div>
);

export default Pill; 