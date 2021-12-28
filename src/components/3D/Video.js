import React, { useMemo } from "react";
import { useThree } from "react-three-fiber";
import { a } from "react-spring/three";
import videoSrc from "../assets/videos/isit.mp4";
import * as THREE from "three/src/Three";

export const Video = ({ children, position, opacity, color }) => {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight },
  } = useThree();

  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const videoElement = useMemo(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.load(); 
    video.play();
    return video;
  }, [children, width, height]);
  return (
    <a.sprite scale={[scale, scale, 1]} position={position}>
      <a.spriteMaterial
        attach="material"
        transparent
        opacity={opacity}
        color={color}
      >
        <videoTexture
          minFilter={THREE.LinearFilter}
          magFilter={THREE.LinearFilter}
          attach="map"
          video={videoElement}
          format={THREE.RGBFormat}
          premultiplyAlpha
          onUpdate={(s) => (s.needsUpdate = true)}
        />
      </a.spriteMaterial>
    </a.sprite>
  );
};
