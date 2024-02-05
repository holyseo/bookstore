import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    publication_date: "",
    isbn: "isbn",
    genre: "genre",
    publisher: "publisher",
    price: "price",
    language: "language",
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
      description: book.description,
      publication_date: book.publication_date,
      isbn: book.isbn,
      genre: book.genre,
      publisher: book.publisher,
      price: book.price,
      language: book.language,
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
    <div className="p-8 bg-gray-400 bg-opacity-50 w-1/3 mx-auto my-10 text-sm">
      <div className="text-lg font-bold m-5">Edit book details</div>
      <form onSubmit={handleEdit} className="flex flex-col gap-5 ">
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">Title:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="title"
            value={book.title}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">Author:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="author"
            value={book.author}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row gap-3">
          <label className="w-1/4">Description:</label>
          <textarea
            rows={5}
            className="p-1 rounded-md w-2/3"
            name="description"
            value={book.description}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">Publication Date:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="publication_date"
            value={new Date(book.publication_date).toLocaleDateString("en-US")}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">ISBN:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="isbn"
            value={book.isbn}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">Genre:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="genre"
            value={book.genre}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">Publisher:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="publication_date"
            value={book.publisher}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">Price:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="price"
            value={book.price}
            onChange={updateBook}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="w-1/4">Language:</label>
          <input
            type="text"
            className="p-1 rounded-md"
            name="language"
            value={book.language}
            onChange={updateBook}
          />
        </div>
        <div className="mt-10 flex flex-row w-1/3 gap-5 items-center">
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
