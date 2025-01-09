import React from 'react';
interface FilterProps {
  label: string;
  active: boolean;
  selected: boolean;
  selectedLabel: string;
  onClick?: () => void;
}

const Filter: React.FC<FilterProps> = ({ label, active, selected, selectedLabel, onClick }) => (
  <div className={`adjustment ${active ? 'active' : ''} ${selected ? 'selected' : ''}`} onClick={onClick}>
    {selected ? selectedLabel : label}
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9641 5.97181L8.17694 8.75936C8.07931 8.85699 7.92102 8.85699 7.82339 8.75936L5.03581 5.97178C4.74291 5.67888 4.26804 5.67888 3.97515 5.97178C3.68225 6.26467 3.68225 6.73954 3.97515 7.03244L6.76273 9.82002C7.44614 10.5034 8.55418 10.5034 9.2376 9.82002L12.0248 7.03247C12.3177 6.73957 12.3177 6.2647 12.0248 5.97181C11.7319 5.67891 11.257 5.67891 10.9641 5.97181Z" fill="#0E1318"/>
    </svg>
  </div>
);

export default Filter; 