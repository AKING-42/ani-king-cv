import { useState, useEffect } from 'react';
import introVideo from '@/assets/intro-animation.mp4';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setTimeout(() => {
      setVideoEnded(true);
      setTimeout(() => {
        onComplete();
      }, 300);
    }, 1500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-300 ${
        videoEnded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1/3 flex items-center justify-center">
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-1/2 max-w-md h-auto object-contain"
        >
          <source src={introVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default IntroAnimation;
