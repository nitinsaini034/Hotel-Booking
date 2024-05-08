import React, { useEffect } from 'react'
import Aboutus from './Aboutus'
import { useRef } from 'react';
import gsap from 'gsap';
function Maintheme() {
  const oneref = useRef(null);
  const tworef=useRef(null);

  useEffect(()=>{
    gsap.fromTo(
      oneref.current,
      {x:-500},
      {x:5,
        duration:2,
        ease:'liner'
      }
    )
  })
  useEffect(()=>{
    gsap.fromTo(
      tworef.current,
      {x:900},
      {x:5,
        duration:2,
        ease:'liner'
      }
    )
  })
  return (
    <>
     <div className='maintheme'>
        <h1 className='mainheadingone' id='one' ref={oneref}>SPEND YOUR TIME </h1><br />
        <h1 className='mainheadingtwo' id='two' ref={tworef}>IN DREAM PLACES</h1>
        <p className='mainpara'>When, while lovely valley teems with vapour around <br /> meand meridian sun strikes the upper impenetrable .</p>
        <img src="/src/assets/mainpage.jpg" alt="" />
    </div>
    <Aboutus/>
    </>
   
    
  )
}

export default Maintheme