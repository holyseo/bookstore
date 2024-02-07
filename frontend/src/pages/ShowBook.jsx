import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import UserContext from "../UserContext";

const ShowBook = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const { id } = useParams();

  const [book, setBook] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user !== "guest"
      ? axios
          .get(`http://localhost:5555/books/${id}`)
          .then(({ data }) => {
            setBook(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          })
      : navigate("/login");
  }, [user]);

  return (
    <div className="w-1/3 p-4 bg-stone-50 mx-auto my-10 border-2 border-gray-500 shadow-2xl rounded-lg">
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
          <div className="mt-10 flex flex-row items-center justify-between px-5">
            <BackButton />
            <span>
              {user !== "guest" ? (
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="bg-red-700 p-2 rounded-md text-white font-semibold"
                >
                  Log Out
                </button>
              ) : null}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
