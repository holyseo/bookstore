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
        publication_date: "",
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
    <div className="p-4 bg-gray-400 bg-opacity-50 w-fit mx-auto my-10 ">
      <div className="text-lg font-bold m-5">
        Please complete the form to add a book
      </div>
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
          type="date"
          placeholder="Published Year"
          name="publication_date"
          value={book.publication_date}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-between items-center">
          <BackButton />
          <button
            type="submit"
            className="text-lg font-bold bg-blue-800 h-12 text-white w-1/3 rounded-md hover:bg-amber-600"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
