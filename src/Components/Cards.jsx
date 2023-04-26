import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../Firebase/Firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className=" flex flex-wrap justify-center p-3 mt-2 m-3">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots height={50} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}>
              <div className="card flex flex-col items-center font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6  transition-all duration-500 m-3">
                <img className="h-96 mb-2 " src={e.image} alt={e.title} />
                <h1>
                  <span className="text-gray-500  text-ellipsis"></span>{" "}
                  {e.title}
                </h1>
                <h1 className="flex items-center mr-1">
                  <span className="text-gray-500">Rating :</span>

                  <ReactStars
                    size={20}
                    half={true}
                    count={5}
                    value={e.rating / e.rated}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-gray-500">Year :</span>
                  {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
