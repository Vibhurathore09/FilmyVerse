import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../Firebase/Firebase";
import {
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsloading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);

  const sendReview = async () => {
    try {
      setLoading(true);
      if (useState.login) {
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppstate.username,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });

        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });

        setRating(0);
        setForm("");
        swal({
          title: "Review Added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setLoading("false");
      } else {
        navigate("/login");
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    async function getData() {
      setReviewsloading(true);

      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewsloading(false);
    }
    getData();
  }, []);

  return (
    <div className="mt-2 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(e) => setRating(e)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        className="w-full p-2 outline-none header"
        placeholder="Share Your Thoughts..."
        type="text"
      />
      <button
        onClick={sendReview}
        className="bg-green-500 flex justify-center w-full p-2 mt-1 "
      >
        {loading ? <TailSpin height={15} color="white" /> : "Share"}
      </button>

      {/* Review Loading */}

      {reviewsLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4  ">
          {data.map((e, i) => {
            return (
              <div
                className=" p-2 w-full border-b header   border-gray-600  mt-2 "
                key={i}
              >
                <div className="flex items-center ">
                  <p className="text-blue-500 text-lg">{e.name}</p>
                  <p className="ml-3 text-s">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  edit={false}
                  value={e.rating}
                />
                <p>{e.thought} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
