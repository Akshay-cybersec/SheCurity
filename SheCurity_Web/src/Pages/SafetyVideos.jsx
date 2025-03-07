import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const VideoCard = ({ videoSrc, title }) => {
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="col-md-4">
      <div className="card">
        <video
          ref={videoRef}
          src={videoSrc}
          className="card-img-top"
          onClick={handleVideoClick}
          controls={false} // Ensure controls are disabled to enforce click behavior
        ></video>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </div>
  );
};

const VideoGallery = () => {
  const videos = [
    { src: "assets/videos/video_1.mp4", title: "Video" },
    { src: "assets/videos/video_2.mp4", title: "Video 2" },
    { src: "assets/videos/video_3.mp4", title: "Video 3" },
    { src: "assets/videos/video_4.mp4", title: "Video 4" },
    { src: "assets/videos/video_5.mp4", title: "Video 5" },
    { src: "assets/videos/video_6.mp4", title: "Video 6" },
    

  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {videos.map((video, index) => (
          <VideoCard key={index} videoSrc={video.src} title={video.title} />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
