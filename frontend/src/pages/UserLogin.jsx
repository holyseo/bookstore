import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Login = () => {
  const { login } = useContext(UserContext);

  const [userData, setUserData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/users/login", userData);
      login(userData);
      setUserData({ username: "", password: "" });
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-blue-50 h-screen flex">
      <div className=" flex flex-row h-3/5 items-center justify-center gap-16">
        <div className=" w-2/5">
          <div className="text-4xl font-thin tracking-wide">
            Welcome to Cambridge Bookworm Haven
          </div>
          <div className="mt-10 ">
            <img
              className=" w-7/12 opacity-70 float-left mr-8"
              src="https://www.alumni.cam.ac.uk/sites/www.alumni.cam.ac.uk/files/images/cambridge-camcard-locations/900px_bookshop_header_sketch.jpg"
            ></img>
            <div className="text-sm font-mono leading-6 text-justify">
              Welcome to Bookworm Haven in Cambridge, where every page turns
              into an adventure! Nestled in the heart of the bustling city, our
              bookstore is a haven for book lovers of all ages. <br />
              <br />
              Immerse yourself in the scent of freshly printed pages and the
              cozy ambiance as you explore our extensive collection of
              literature from every genre imaginable. <br /> <br />
              At Bookworm Haven, we believe in the power of storytelling to
              transport readers to different worlds, ignite imaginations, and
              create lifelong memories. So, grab a cup of coffee from our
              in-house cafe, find a cozy nook, and lose yourself in the
              captivating world of literature at Bookworm Haven – where every
              book is an invitation to a new adventure!
            </div>
          </div>
        </div>
        <div className="flex flex-col p-10 gap-8 w-1/5 bg-blue-100">
          <div className="text-xl font-semibold">Sign in</div>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="p-2 shadow-lg drop-shadow-lg rounded-md h-9 placeholder:p-3 placeholder:text-sm"
              placeholder="Enter Username"
              value={userData.username}
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              className="p-2 shadow-lg drop-shadow-lg rounded-md h-9 placeholder:p-3 placeholder:text-sm"
              placeholder="Password"
              value={userData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="text-red-900">{errorMsg ? errorMsg : null}</div>
          <button
            className="mt-10 rounded-lg bg-blue-600 bg-opacity-80 text-white p-4 text-sm font-bold"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <div className="self-center text-sm text-gray-500 text-opacity-80 font-semibold">
            Not registered yet?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
