import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import backgroundImage from "assets/images/image_for_game.png";
import VideoScene, { videoMap } from "@/modules/VideoScene";

const AppLayout: React.FC = ({ children }: { children?: React.ReactNode }) => {

  const location = useLocation();
  const isMainPage = location.pathname === '/';

  const [videoSceneStage, setVideoSceneStage] = useState<keyof typeof videoMap | null>(null);

  useEffect(() => {
    console.log("pathname: ", location.pathname);

    if (isMainPage) {
      setVideoSceneStage('intro');
    } else if (location.pathname.includes('create-game')) {
      setVideoSceneStage('setup');
    } else {
      setVideoSceneStage('setup');
    }
  }, [location.pathname]);

  const mainPageStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
  }

  return (
    <div className="relative h-full w-full">
      {/* Фоновый слой с blur и overlay */}
      {!isMainPage && (
        <div
          className="absolute top-0 left-0 w-full h-full z-7"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)', // для Safari
            background: 'rgba(255,255,255,0.7)', // для overlay
            pointerEvents: 'none',
          }}
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full z-5">
        {videoSceneStage && <VideoScene stage={videoSceneStage} />}
      </div>
      <div className="relative z-10 h-full w-full p-[1rem]">
        {children ?? <Outlet />}
      </div>
    </div>
  );
};

export default AppLayout;