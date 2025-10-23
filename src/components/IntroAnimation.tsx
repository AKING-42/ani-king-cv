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
    }, 3000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-300 ${
        videoEnded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="max-w-full max-h-full object-contain"
      >
        <source src={introVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default IntroAnimation;
