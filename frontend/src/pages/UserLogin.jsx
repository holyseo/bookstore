import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../backend/UserContext";

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
    <>
      <div className=" bg-blue-50 mt-10 flex flex-col p-10 gap-8 w-1/5 mx-auto">
        <div className="text-xl font-semibold self-start">Sign in</div>
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
    </>
  );
};

export default Login;
