import React from 'react';
import styles from './fullscreen-video.module.css';

interface FullscreenVideoProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  className?: string;
  containerClassName?: string;
}

export function FullscreenVideo({
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  className = '',
  containerClassName = '',
}: FullscreenVideoProps) {
  return (
    <div className={`${styles.videoContainer} ${containerClassName}`}>
      <video
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={`${styles.fullscreenVideo} ${className}`}
      />
    </div>
  );
}
