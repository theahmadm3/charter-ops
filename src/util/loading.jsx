import { useSelector } from "react-redux";

const Loading = () => {
  const loading = useSelector((state) => state.loading);

  if (!loading) {
    return null;
  }

  return (
    <div className="loader-section">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
