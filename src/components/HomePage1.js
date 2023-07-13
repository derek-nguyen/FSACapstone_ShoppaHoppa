import React, { useEffect, useState } from "react";

const Homepage1 = ({ videoSrc }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="video-container-wrapper">
      <video
        id="videoPlayer"
        src={videoSrc}
        className={`video-container ${isVideoLoaded ? "fade-in" : ""}`}
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoad}
      />
    </div>
  );
};

export default Homepage1;
