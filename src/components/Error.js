import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error.status}: {error.statusText}
    </div>
  );
};

export default Error;
