import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const CreateBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publication_date: "",
  });

  useEffect(() => {
    console.log(book);
  }, [book]);

  const addNewBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/books", book);
      setBook({
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-blue-50 h-screen flex justify-center">
      <div className=" bg-blue-100 w-1/5 p-5 h-fit mt-20 rounded-md">
        <div className="text-2xl font-bold mb-5">Add Book</div>
        <form onSubmit={addNewBook} className="flex flex-col gap-5 ">
          <input
            className="p-1 my-1 rounded-md"
            type="text"
            placeholder="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="text"
            placeholder="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="text"
            placeholder="Book description"
            name="description"
            value={book.description}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="date"
            placeholder="Published Year"
            name="publication_date"
            value={book.publication_date}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="text"
            placeholder="ISBN"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="text"
            placeholder="Genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="text"
            placeholder="Publisher"
            name="publisher"
            value={book.publisher}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="number"
            placeholder="Price"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
          <input
            className="p-1 my-1 rounded-md"
            type="test"
            placeholder="Language"
            name="language"
            value={book.language}
            onChange={handleChange}
          />
          <div className="flex flex-row justify-between items-center">
            <BackButton />
            <button
              type="submit"
              className="text-lg font-bold bg-blue-700 h-10 text-white w-1/5 rounded-md hover:bg-amber-600"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
