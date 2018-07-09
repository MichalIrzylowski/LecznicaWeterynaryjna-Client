import React from 'react';
import HeroMiddle from './HeroMiddle';
import Video from '../../Videos/theVideo.mp4';

const Landing = () => (
  <section className='landing'>
    <video className='video' src={Video} muted autoPlay loop='true'></video>
    <HeroMiddle />
  </section>
)

export default Landing;
