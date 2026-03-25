import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const MernCanvas = () => {
  const particlesInit = useCallback(async engine => {

    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false, zIndex: 0 },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: {
              enable: true,
              mode: "repulse",
              parallax: { enable: true, force: 60, smooth: 10 }
            },
            resize: true
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 150, duration: 0.4 }
          }
        },
        particles: {
          color: { value: ["#4CAF50", "#FFEB3B", "#2196F3"] },
          links: {
            color: "#888888",
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 1.5,
            straight: false
          },
          number: {
            density: { enable: true, area: 800 },
            value: 80
          },
          opacity: { value: 1 },
          shape: { type: ["circle", "triangle", "edge"] },
          size: { value: { min: 3, max: 7 } }
        },
        detectRetina: true
      }}
      className="mern-pro-canvas-container"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
};

export default MernCanvas;
