import { Outlet } from "react-router-dom";
import xray from "../assets/xray.png";

const LandingLayout = () => {
  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="flex justify-center items-center px-8 lg:px-32">
          <Outlet />
        </div>
        <div className=" lg:flex lg:justify-end hidden">
          <img className="h-full" src={xray} />
        </div>
      </section>
    </div>
  );
};
export default LandingLayout;
