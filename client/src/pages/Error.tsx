import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-4">
      <p className="text-6xl md:text-8xl font-bold text-blue-300 mb-4">404</p>
      <p className="text-xl md:text-2xl mb-2 text-gray-700 font-semibold">
        Oops! Page not found.
      </p>
      <p className="text-md md:text-lg  mb-6 text-center max-w-md text-gray-500">
        The page you're looking for doesn't exist or has been removed.
      </p>
      <Link
        to="/dashboard"
        className="text-blue-400 border w-fit border-blue-200 rounded-md py-3 px-16 hover:cursor-pointer hover:border-blue-300"
      >
        Dashboard
      </Link>
    </div>
  );
};

export default Error;
