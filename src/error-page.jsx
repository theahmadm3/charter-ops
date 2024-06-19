import { TbFaceIdError } from "react-icons/tb";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="d-flex justify-content-center align-items-center"
    >
      <div className="error-content text-center">
        <h1>Oops!</h1>
        <p>Looks like something went wrong.</p>
        <p>Please try again later.</p>
        {error && (
          <p className="error-message">
            <span>Error Message:</span>{" "}
            <i>{error.statusText || error.message}</i>
          </p>
        )}
        <div className="error-image-container mt-4">
          <TbFaceIdError className="display-1" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
