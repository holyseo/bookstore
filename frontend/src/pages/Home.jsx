import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import Spinner from "../components/Spinner";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then(({ data }) => {
        setBooks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-10">
        <h1 className="text-3xl ">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2 ">
          <thead>
            <tr>
              <th className="border border-slate-500 rounded-md">No</th>
              <th className="border border-slate-500 rounded-md">Title</th>
              <th className="border border-slate-500 rounded-md">Author</th>
              <th className="border border-slate-500 rounded-md">
                Publish Year
              </th>
              <th className="border border-slate-500 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="text-center bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {index + 1}
                </td>
                <td className="text-center bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.title}
                </td>
                <td className="text-center bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.author}
                </td>
                <td className="text-center bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.publishYear}
                </td>
                <td className="text-center bg-gray-50 text-xl border-2 border-slate-300 rounded-md ">
                  <div className="flex justify-center gap-x-5 items-center ">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-blue-800 text-2xl" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className=" text-orange-600 text-2xl" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-red-800 text-2xl" />
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
