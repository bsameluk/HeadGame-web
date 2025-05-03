import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import backgroundImage from "assets/images/image_for_game.png";

const AppLayout: React.FC = ({ children }: { children?: React.ReactNode }) => {

  const location = useLocation();
  const isMainPage = location.pathname === '/';

  useEffect(() => {
    console.log("pathname: ", location.pathname);
  }, [location.pathname]);

  const mainPageStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
  }

  return (
    <div className="h-full w-full p-[1rem]"
      style={isMainPage ? mainPageStyles : {}}
    >
      {children ?? <Outlet />}
    </div>
  );
};

export default AppLayout;