import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(({ data }) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4 bg-stone-50 w-fit mx-auto my-10 border-2 border-gray-300 rounded-lg">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="font-bold tracking-wide text-xl p-3 m-3">
            <h1>Book details</h1>
          </div>
          <div className=" tracking-wide text-sm p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">ID: </span>
            <span>{book._id}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Title: </span>
            <span>{book.title}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Author: </span>
            <span>{book.author}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Year: </span>
            <span>{book.publishYear}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Time created: </span>
            <span>{book.createdAt}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Time updated: </span>
            <span>{book.updatedAt}</span>
          </div>
          <div className="mt-10">
            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
