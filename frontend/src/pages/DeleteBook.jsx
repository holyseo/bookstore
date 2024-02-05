import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(({ data }) => {
        setBook(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const deleteBook = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(({ data }) => {
        alert(data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 bg-opacity-70 shadow-lg w-1/4 mx-auto mt-16 gap-3">
      <div className="text-lg text-white m-3 bg-sky-700 bg-opacity-80 rounded-lg p-2">
        Are you sure you want to delete this book permanently?
      </div>
      <div className=" flex flex-col bg-gray-200 w-1/2 p-3 tracking-wide leading-8 rounded-lg">
        <div>Title: {book.title}</div>
        <div>Author: {book.author}</div>
        <div>
          Published Year:{" "}
          {new Date(book.publication_date).toLocaleDateString("en-US")}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <BackButton />
        <button
          className="bg-red-800 h-12 text-white p-3 rounded-lg"
          onClick={deleteBook}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
