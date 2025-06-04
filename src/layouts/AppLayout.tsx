import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
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

  return (
    <div className="relative h-full w-full" style={{backgroundColor: '#f4f4f4'}}>
      {
        isMainPage &&
        <div className="absolute top-0 left-0 w-full h-full z-5">
          {videoSceneStage && <VideoScene stage={videoSceneStage} />}
        </div>
      }
      <div className="relative z-10 h-full w-full">
        {children ?? <Outlet />}
      </div>
    </div>
  );
};

export default AppLayout;
