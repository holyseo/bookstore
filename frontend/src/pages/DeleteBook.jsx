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
    <div className="flex flex-col items-center bg-gray-400 bg-opacity-50 shadow-md  shadow-slate-800 drop-shadow-xl w-1/3 mx-auto mt-16 p-3 gap-5">
      <div className="text-xl font-bold m-3">
        Are you sure you want to delete this book permanently?
      </div>
      <div className=" font-semibold text-lg flex flex-col bg-slate-200 p-3 rounded-lg">
        <div>Title: {book.title}</div>
        <div>Author: {book.author}</div>
        <div>Published Year: {book.publishYear}</div>
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
