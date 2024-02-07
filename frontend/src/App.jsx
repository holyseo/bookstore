import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/UserLogin";
import { useState } from "react";
import UserContext from "./UserContext";

const App = () => {
  const [user, setUser] = useState("guest");

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser("guest");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
