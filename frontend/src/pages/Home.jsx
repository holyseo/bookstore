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
  const [filteredBooks, setFilteredBooks] = useState([]);
  // const [filteredByGenre, setFilteredByGenre] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
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
      });
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    const filteredItems = books.filter((book) => {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredBooks(filteredItems);
  };

  // const handleInputGenre = (e) => {
  //   const searchGenre = e.target.value;
  //   const filteredItems = books.filter((book) => {
  //     return book.genre === searchGenre;
  //   });
  //   searchGenre === "all"
  //     ? setFilteredByGenre(books)
  //     : setFilteredByGenre(filteredItems);
  // };

  return (
    <div className="p-4 bg-stone-100 mx-auto my-10">
      <div className="w-1/2 flex justify-between items-center my-10 mx-auto">
        <h1 className="text-3xl ">Books List</h1>
        <div className="flex flex-row items-center gap-5 text-lg font-semibold">
          <div>
            <input
              type="text"
              placeholder="Search by Title"
              className=" placeholder:p-1 placeholder:font-light "
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="font-light">
            <select onChange={handleInputGenre}>
              <option value="all">Filter by genre</option>
              <option value="christian">Christian</option>
              <option value="fiction">Fiction</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
            </select>
          </div> */}
          {/* <div>Sort</div> */}
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
            {filteredBooks.map((book, index) => (
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
