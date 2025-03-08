import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import videos from src/assets/videos/
import video1 from "../assets/videos/video_1.mp4";
import video2 from "../assets/videos/video_2.mp4";
import video3 from "../assets/videos/video_3.mp4";
import video4 from "../assets/videos/video_4.mp4";
import video5 from "../assets/videos/video_5.mp4";
import video6 from "../assets/videos/video_6.mp4";

const VideoCard = ({ videoSrc, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card position-relative">
        <video
          ref={videoRef}
          src={videoSrc}
          className="card-img-top"
          onClick={handleVideoClick}
          controls={false}
          style={{ cursor: "pointer", borderRadius: "10px", height: "250px", objectFit: "cover" }}
        ></video>
        
        {!isPlaying && (
          <div
            className="position-absolute top-50 start-50 translate-middle text-white"
            onClick={handleVideoClick}
            style={{ cursor: "pointer", fontSize: "2rem" }}
          >
            ▶️
          </div>
        )}

        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </div>
  );
};

const VideoGallery = () => {
  const videos = [
    { src: video1, title: "Learn fundamental self-defense moves to protect yourself in common situations." },
    { src: video2, title: "Techniques to break free from wrist grabs, bear hugs, and other physical restraints." },
    { src: video3, title: "Powerful strikes, including palm strikes, knee strikes, and elbow techniques." },
    { src: video4, title: "How to use items like keys, bags, and umbrellas as self-defense tools." },
    { src: video5, title: "Tips on situational awareness, body language, and avoiding unsafe situations before they happen." },
    { src: video6, title: "Essential strategies to protect yourself in case of an edged weapon attack." },
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
