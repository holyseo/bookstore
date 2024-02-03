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
    <div className="p-4 bg-stone-100 mx-auto my-10">
      <div className="flex justify-between items-center my-10 mx-auto">
        <h1 className="text-3xl ">Books List</h1>
        <div className="flex flex-row items-center gap-5 text-lg font-semibold">
          <div>Search</div>
          <div>Filter</div>
          <div>Sort</div>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-fit mx-auto border-separate border-spacing-2 ">
          <thead>
            <tr>
              <th className="border border-slate-500 rounded-md">No</th>
              <th className="border border-slate-500 rounded-md">Title</th>
              <th className="border border-slate-500 rounded-md">Author</th>
              <th className="border border-slate-500 rounded-md">ISBN</th>
              <th className="border border-slate-500 rounded-md">Genre</th>
              <th className="border border-slate-500 rounded-md">Publisher</th>
              <th className="border border-slate-500 rounded-md">Price</th>
              <th className="border border-slate-500 rounded-md">Language</th>
              <th className="border border-slate-500 rounded-md">Page Count</th>
              <th className="border border-slate-500 rounded-md">
                Publication Date
              </th>
              <th className="border border-slate-500 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {index + 1}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.title}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.author}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.isbn}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.genre}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.publisher}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.price}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.language}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
                  {book.page_count}
                </td>
                <td className="text-center px-2 bg-gray-50 text-lg border-2 border-slate-300 rounded-md">
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
