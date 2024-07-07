import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex items-center">
      <div className=" flex items-center flex-col w-7/12 h-4/6">
        <span className=" font-bold text-6xl">
          {error.status} : {error.statusText}
        </span>

        <button className=" p-2 mt-12 font-semibold text-white bg-orange-500 hover:shadow-xl rounded-lg  px-6">
          <Link to="/">Go Home </Link>
        </button>
      </div>

      <div className="h-3/6 w-6/12">
        <img
          src="https://tailwindcomponents.com/svg/404-error-with-broken-robot-pana.svg"
          className="w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
};

export default Error;
