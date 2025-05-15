import { useRef } from "react"

import intro from 'assets/videos/campfire-loop-reverse.mp4';
import setup from 'assets/videos/setup-room-reverse.mp4';
import { useEffect } from 'react';
// import intro2 from 'assets/videos/campfire-loop-2.mp4';

export const videoMap = {
  intro: intro,
  setup: setup,
  // 'round-intro':    '/videos/arena-intro.mp4',
  // playing:          '/videos/arena-loop.mp4',
  // 'round-summary':  '/videos/summary-loop.mp4',
  // final:            '/videos/final-hall.mp4',
}

interface VideoSceneProps {
  stage: keyof typeof videoMap
}

const VideoScene: React.FC<VideoSceneProps> = ({ stage }) => {


  // const videoRefs = {
  //   intro: useRef(),
  //   setup: useRef(),
  //   arena: useRef(),
  // }

  // <video ref={videoRefs.intro} src="/videos/intro.mp4" preload="auto" />
  // <video ref={videoRefs.setup} src="/videos/setup.mp4" preload="auto" />
  // <video ref={videoRefs.arena} src="/videos/arena.mp4" preload="auto" />


  useEffect(() => {
    console.log("stage: ", stage);
  }, [stage]);


  return (
    <div>
      <Video src={videoMap['intro']} isActive={stage == 'intro'} />
      <Video src={videoMap['setup']} isActive={stage == 'setup'} playbackRate={0.8} />
    </div>
  )


}

interface VideoProps {
  src: string
  isActive: boolean
  playbackRate?: number
}

const Video: React.FC<VideoProps> = ({ src, isActive, playbackRate = 1 }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.playbackRate = playbackRate; // замедление в 2 раза
    }
  }, [isActive]);

  return (
    <video
      ref={ref}
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
      onError={e => {
        console.log('Video error:', e);
        alert('Ошибка загрузки видео!');
      }}
      style={{
        display: isActive ? 'block' : 'none',
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};




export default VideoScene