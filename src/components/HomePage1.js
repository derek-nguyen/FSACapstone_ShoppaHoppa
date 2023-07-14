import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage1 = ({ videoSrc }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const handleVideoLoad = () => {
      setIsVideoLoaded(true);
    };

    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.addEventListener("loadeddata", handleVideoLoad);

    return () => {
      videoPlayer.removeEventListener("loadeddata", handleVideoLoad);
    };
  }, []);

  return (
    <div>
      <div className="video-container-wrapper">
        <video
          id="videoPlayer"
          src={videoSrc}
          className={`video-container ${isVideoLoaded ? "fade-in" : ""}`}
          autoPlay
          loop
          muted
        />
      </div>

      <div className="lp-container-1">
        <div className="lp-column-left">
          <div className="block-background">
            <h2>Chrono Realm</h2>
            <p>
              Your destination for exquisite timepieces from prestigious luxury brands. As an official partner, we take pride in delivering the highest quality watches to our esteemed customers. Discover a world of exceptional timepieces meticulously crafted with precision and elegance. Our curated collection showcases a range of timeless classics and modern innovations, ensuring there's a perfect watch to suit every style and occasion.
            </p>
          </div>
        </div>
      </div>

      <div className="lp-container-2">
        <div className="img-left-link">
          <Link to={`/products`}>
            <img src="https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-diver-300m-21032422004001-l.png" alt="" />
          </Link>
        </div>
        <div className="lp-column-2-right">
          <div className="block-background-2">
            <h2>Explore our product selection</h2>
            <p>
              Stay up to date with the latest watch trends and styles. Explore our curated selection of watches that combine timeless elegance with contemporary design, ensuring you make a statement wherever you go.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage1;
