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
    <div className="w-1/3 p-4 bg-stone-50 mx-auto my-10 border-2 border-gray-300 rounded-lg">
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
          </div>{" "}
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Author: </span>
            <span>{book.author}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Description: </span>
            <span>{book.description}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Publication Date: </span>
            <span>
              {new Date(book.publication_date).toLocaleDateString("en-US")}
            </span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">ISBN: </span>
            <span>{book.isbn}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Genre: </span>
            <span>{book.genre}</span>
          </div>{" "}
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Publisher: </span>
            <span>{book.publisher}</span>
          </div>
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Price: </span>
            <span>{book.price}</span>
          </div>{" "}
          <div className=" tracking-wide p-3 bg-gray-300 bg-opacity-30 m-5 rounded-xl">
            <span className="font-extrabold">Language: </span>
            <span>{book.language}</span>
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
