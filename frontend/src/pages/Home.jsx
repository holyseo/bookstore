import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import Spinner from "../components/Spinner";
import UserContext from "../UserContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  // const [filteredByGenre, setFilteredByGenre] = useState([]);

  useEffect(() => {
    setLoading(true);
    user !== "guest"
      ? axios
          .get("http://localhost:5555/books")
          .then(({ data }) => {
            setBooks(data.data);
            setLoading(false);
            setFilteredBooks(data.data);
            // setFilteredByGenre(data.data);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          })
      : navigate("/login");
  }, [user]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    const filteredItems = books.filter((book) => {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredBooks(filteredItems);
  };

  return (
    <div className="p-4 mx-auto bg-blue-50">
      <div className=" mt-20 flex flex-row justify-between w-3/4 mx-auto items-end">
        <h1 className="text-3xl text-gray-600 font-bold ">Dashboard</h1>
        <div className="flex flex-row text-lg items-center gap-20 font-semibold">
          <div className="flex justify-between items-center gap-5">
            <input
              type="text"
              placeholder="Search books by Title..."
              className=" text-sm font-light rounded-md h-9 w-60 placeholder:p-2 placeholder:font-light placeholder:text-sm border-2 border-gray-200"
              onChange={handleInputChange}
            />
            <Link to="/books/create">
              <button className="bg-sky-600 text-white p-2 rounded-lg text-sm">
                <span className=" flex flex-row gap-1 items-center justify-center">
                  Add Book
                </span>
              </button>
            </Link>
          </div>
          <div>
            {user === "guest" ? (
              <button onClick={() => navigate("/login")}>Sign In</button>
            ) : (
              <button
                onClick={() => {
                  logout();
                }}
                className="bg-red-700 p-2 rounded-md text-white text-sm font-semibold"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-fit mt-10 mx-auto border-separate border-spacing-2 ">
          <thead>
            <tr>
              <th className="border border-slate-500 px-2 rounded-md">No</th>
              <th className="border border-slate-500 px-2 rounded-md">Title</th>
              <th className="border border-slate-500 px-2 rounded-md">
                Author
              </th>
              <th className="border border-slate-500 px-2 rounded-md">ISBN</th>
              <th className="border border-slate-500 px-2 rounded-md">Genre</th>
              <th className="border border-slate-500 px-2 rounded-md">
                Publisher
              </th>
              <th className="border border-slate-500 px-2 rounded-md">Price</th>
              <th className="border border-slate-500 px-2 rounded-md">
                Language
              </th>
              <th className="border border-slate-500 px-2 rounded-md">
                Page Count
              </th>
              <th className="border border-slate-500 px-2 rounded-md">
                Publication Date
              </th>
              <th className="border border-slate-500 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {index + 1}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.title}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.author}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.isbn}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.genre}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.publisher}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.price}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.language}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {book.page_count}
                </td>
                <td className="text-center px-2 bg-gray-50 border-2 border-slate-300 rounded-md">
                  {new Date(book.publication_date).toLocaleDateString("en-US")}
                </td>
                <td className="text-center px-2 bg-gray-50 text-xl border-2 border-slate-300 rounded-md ">
                  <div className="flex justify-center gap-x-5 items-center ">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-blue-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className=" text-orange-600" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
