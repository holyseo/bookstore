import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publication_date: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id}`).then(({ data }) => {
      setBook(data);
    });
  }, [id]);

  const updateBook = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const newBook = {
      title: book.title,
      author: book.author,
      publication_date: book.publication_date,
    };

    axios
      .put(`http://localhost:5555/books/${id}`, newBook)
      .then(({ data }) => {
        alert(data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4 bg-gray-400 bg-opacity-50 w-fit mx-auto my-10 ">
      <div className="text-lg font-bold m-5">Edit book details</div>
      <form onSubmit={handleEdit} className="flex flex-col gap-5 ">
        <div className="flex flex-row justify-between items-center gap-5">
          <label>Title:</label>
          <input
            type="text"
            className="p-1 my-1 rounded-md"
            name="title"
            value={book.title}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-5">
          <label>Author:</label>
          <input
            type="text"
            className="p-1 my-1 rounded-md"
            name="author"
            value={book.author}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-5">
          <label>Publication Date:</label>
          <input
            type="text"
            className="p-1 my-1 rounded-md"
            name="publication_date"
            value={new Date(book.publication_date).toLocaleDateString("en-US")}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <BackButton />
          <button
            type="submit"
            className="text-lg font-bold bg-blue-800 h-12 text-white w-1/3 rounded-md hover:bg-amber-600"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
