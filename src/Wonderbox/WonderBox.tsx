import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {  wbExpandedSignal, inputPlaceholderSignal, selectedGrandPillSignal, currentAdjustments, initialAdjustmentsMap, adjustmentsExpandedSignal } from '../state.ts';
import GrandPills from './GrandPills.tsx';
import Adjustments from './Adjustments.tsx';
import AdjustmentsExpanded from './AdjustmentsExpanded.tsx';
const WonderBox = () => {
  const searchRef = useRef(null);
  const searchArrowRef = useRef(null);
  const inputRef = useRef(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wbExpandedSignal.value && // Only run if expanded
        searchRef.current && 
        !searchRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('.search-categories') && // Don't close if clicking categories
        !(e.target as Element).closest('.adjustment') && // Don't close if clicking adjustments
        !(e.target as Element).closest('.format-view') && // Don't close if clicking format view
        !(e.target as Element).closest('button') // Don't close if clicking a button
      ) {
        wbExpandedSignal.value = false;
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useGSAP(()=>{
    gsap.to(inputRef.current, {
        duration: 0.15,
        opacity: 0,
        onComplete: () => {
          if (inputRef.current) {
            inputRef.current.placeholder = inputPlaceholderSignal.value;
            gsap.to(inputRef.current, {
              duration: 0.15,
              opacity: 1,
            });
          }
        },
      });
  }, [inputPlaceholderSignal.value])

  useGSAP(() => {
    if (wbExpandedSignal.value) {

      selectedGrandPillSignal.value = 'templates';
      // currentAdjustments.value = initialAdjustmentsMap.templates;
      // Expand search box
      gsap.to(searchRef.current, {
        duration: 0.46,
        borderColor: "#8B3DFF",
        y: 36,
        delay: 0.1,
        ease: "back.out(1.7)",
        width: 810,
      });

      // Animate search arrow
      // gsap.to(searchArrowRef.current, {
      //   duration: 0.3,
      //   ease: "Power3.easeInOut",
      //   delay: 0.04,
      //   x: 30,
      //   opacity: 0,
      // });

      // Update placeholder text with animation
      // gsap.to(inputRef.current, {
      //   duration: 0.15,
      //   opacity: 0,
      //   onComplete: () => {
      //     if (inputRef.current) {
      //       inputRef.current.placeholder = wbPlaceholderSignal.value;
      //       gsap.to(inputRef.current, {
      //         duration: 0.15,
      //         opacity: 1,
      //       });
      //     }
      //   },
      // });

      // Animate out doctypes
      gsap.to(".doctypes li", {
        duration: 0.3,
        ease: "Power3.easeInOut",
        opacity: 0,
        y: 30,
        stagger: 0.025,
      });

      gsap.to(".doctypes", {
        duration: 0.3,
        ease: "Power3.easeInOut",
        delay: 0.3,
        height: 0,
        scale: 0,
      });

    } else {
      selectedGrandPillSignal.value = '';
      // Collapse animations
      gsap.to(searchRef.current, {
        duration: 0.46,
        borderColor: "transparent",
        y: 0,
        width: 528,
      });

      gsap.to(searchArrowRef.current, {
        duration: 0.3,
        x: 0,
        opacity: 1,
      });

      // gsap.to(inputRef.current, {
      //   duration: 0.15,
      //   opacity: 0,
      //   onComplete: () => {
      //     if (inputRef.current) {
      //       inputRef.current.placeholder = wbPlaceholderSignal.value;
      //       gsap.to(inputRef.current, {
      //         duration: 0.15,
      //         opacity: 1,
      //       });
      //     }
      //   },
      // });

      // Restore doctypes
      gsap.fromTo(".doctypes", 
        {
          height: 0,
          scale: 0,
        },
        {
          duration: 0.3,
          ease: "Power3.easeInOut",
          height: "auto",
          scale: 1,
        }
      );

      gsap.fromTo(".doctypes li",
        {
          opacity: 0,
          y: 30,
        },
        {
          duration: 0.3,
          ease: "Power3.easeInOut",
          opacity: 1,
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );
    }
  }, [wbExpandedSignal.value]); // Run effect when isExpanded changes

  const handleSearchClick = () => {
    wbExpandedSignal.value = true; // Toggle the value instead
  };

  return (
    <div className="wonderbox">
      <GrandPills />
      <div className="search " ref={searchRef}>
      <div className="top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.2961 2.04321C16.7028 3.86049 17.5802 4.75924 19.6135 5.13201C19.7539 5.13201 19.8677 5.23633 19.8677 5.365C19.8677 5.49367 19.7539 5.59799 19.6135 5.59799C17.631 5.97076 16.7044 6.81559 16.2977 8.67948C16.2711 8.78195 16.1752 8.85979 16.0552 8.85979C15.9306 8.85979 15.8318 8.77609 15.81 8.66768C15.4033 6.85037 14.5302 5.97076 12.4968 5.59799C12.3565 5.59799 12.2427 5.49367 12.2427 5.365C12.2427 5.23633 12.3565 5.13201 12.4968 5.13201C14.4794 4.75924 15.4071 3.90932 15.8137 2.04543C15.8423 1.94546 15.9372 1.87021 16.0552 1.87021C16.1723 1.87021 16.2667 1.94435 16.2961 2.04321Z" fill="url(#paint0_linear_61_11056)" fillOpacity="0.6"></path>
          <path d="M15.094 17.4358C13.8198 18.4354 12.2139 19.0314 10.4688 19.0314C6.32661 19.0314 2.96875 15.6735 2.96875 11.5314C2.96875 7.54669 6.07622 4.28777 10 4.04581V5.54944C6.90537 5.78857 4.46875 8.37543 4.46875 11.5314C4.46875 14.8451 7.15504 17.5314 10.4688 17.5314C13.7825 17.5314 16.4688 14.8451 16.4688 11.5314C16.4688 11.3524 16.4609 11.1752 16.4456 11.0001H17.9502C17.9625 11.1756 17.9688 11.3528 17.9688 11.5314C17.9688 13.2073 17.4191 14.7548 16.4902 16.0034L20.7401 20.2529C21.1306 20.6435 21.1306 21.2766 20.7401 21.6671C20.3496 22.0577 19.7164 22.0577 19.3259 21.6671L15.094 17.4358Z" fill="url(#paint1_linear_61_11056)" fillOpacity="0.6"></path>
          <path d="M13.6664 8.96406C12.8091 8.7283 12.3101 8.34947 12.1386 7.56359C12.1386 7.469 12.055 7.3923 11.9518 7.3923C11.8486 7.3923 11.7649 7.469 11.7649 7.56359C11.5077 8.34947 11.0945 8.80687 10.2372 8.96406C10.134 8.96406 10.0503 9.04075 10.0503 9.13534C10.0503 9.22993 10.134 9.30663 10.2372 9.30663C11.0945 9.54238 11.5935 9.92122 11.7649 10.7071C11.7649 10.8017 11.8486 10.8784 11.9518 10.8784C12.055 10.8784 12.1386 10.8017 12.1386 10.7071C12.3958 9.92122 12.8091 9.46381 13.6664 9.30663C13.7696 9.30663 13.8533 9.22993 13.8533 9.13534C13.8533 9.04075 13.7696 8.96406 13.6664 8.96406Z" fill="url(#paint2_linear_61_11056)" fillOpacity="0.6"></path>
          <defs>
            <linearGradient id="paint0_linear_61_11056" x1="-6.06334" y1="11.9151" x2="13.9136" y2="29.8778" gradientUnits="userSpaceOnUse">
              <stop stopColor="#03A5AB"></stop>
              <stop offset="1" stopColor="#8B3DFF"></stop>
            </linearGradient>
            <linearGradient id="paint1_linear_61_11056" x1="-6.06334" y1="11.9151" x2="13.9136" y2="29.8778" gradientUnits="userSpaceOnUse">
              <stop stopColor="#03A5AB"></stop>
              <stop offset="1" stopColor="#8B3DFF"></stop>
            </linearGradient>
            <linearGradient id="paint2_linear_61_11056" x1="-6.06334" y1="11.9151" x2="13.9136" y2="29.8778" gradientUnits="userSpaceOnUse">
              <stop stopColor="#03A5AB"></stop>
              <stop offset="1" stopColor="#8B3DFF"></stop>
            </linearGradient>
          </defs>
        </svg>
        <input 
          type="text" 
          placeholder="Search & Discover Canva" 
          ref={inputRef}
          onClick={handleSearchClick}
        />
        <div className="search-arrow" ref={searchArrowRef}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0999 13.0038H5.50366C5.08945 13.0038 4.75366 12.668 4.75366 12.2538C4.75366 11.8396 5.08945 11.5038 5.50366 11.5038H17.0999L12.7233 7.12725C12.4304 6.83436 12.4304 6.35949 12.7233 6.06659C13.0162 5.7737 13.4911 5.7737 13.784 6.06659L18.7337 11.0163C19.4172 11.6998 19.4172 12.8078 18.7337 13.4912L13.784 18.441C13.4911 18.7339 13.0162 18.7339 12.7233 18.441C12.4304 18.1481 12.4304 17.6732 12.7233 17.3803L17.0999 13.0038Z" fill="#0E1318"/>
          </svg>
        </div>
      </div>
      {wbExpandedSignal.value && <Adjustments />}
      <AdjustmentsExpanded />
    </div>
    </div>
  );
};

export default WonderBox;
