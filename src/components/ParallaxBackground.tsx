import { useEffect } from "react";

interface ParallaxBackgroundProps {
  speed?: number; // 0 = static, 1 = same as scroll speed
}

// Updates a CSS variable used by body background-position so the grid moves at a different rate
const ParallaxBackground = ({ speed = 0.35 }: ParallaxBackgroundProps) => {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const offset = window.scrollY * speed;
      // Set on :root so it's inherited everywhere
      document.documentElement.style.setProperty("--bg-offset-y", `${offset}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Initialize once in case we render mid-scroll
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return null;
};

export default ParallaxBackground;
