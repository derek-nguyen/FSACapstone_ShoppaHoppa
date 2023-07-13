import React from 'react';
import Homepage1 from './HomePage1';
import watchVideo from '../assets/videos/watchSample.mp4';

const Home = () => {


return (
    <div>
        <Homepage1 videoSrc={watchVideo}/>
    </div>
)

}

export default Home; 