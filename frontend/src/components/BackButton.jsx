import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  return (
    <div className="flex m-5">
      <Link
        to="/"
        className="bg-sky-900 text-white rounded-full font-extrabold text-2xl p-1 hover:bg-orange-800"
      >
        <BsArrowLeft />
      </Link>
    </div>
  );
};

export default BackButton;
