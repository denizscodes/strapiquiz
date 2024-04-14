import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Review from "../components/Review";
import Turyorum from "./Turyorum";
import CSVToJsonConverter from "./Sohbet";
import Urunler from "./Urunler";

const Turdetayi = () => {
  const { id } = useParams();
  const { error, isLoading, data } = useFetch(
    "http://localhost:1337/api/products?populate=*&filters[id][$eq]=" + id + ""
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  const reviews = data.data[0].attributes.reviews.data;
  console.log(data);

  return (
    <div>
      <div className="detay">
        <img
          src={
            "http://localhost:1337" +
            data.data[0].attributes.resim.data.attributes.url
          }
        />
        <h1>{data.data[0].attributes.name}</h1>

        <h3>{data.data[0].attributes.details}</h3>
      </div>
      <div className="detay">
        <h1>Make a Review!</h1>
        <Review productId={id} />
      </div>

      <div className="detay">
        <h1>Yorumlar</h1>
        {reviews.map((review) => (
          <div key={review.id}>
            <h1>{review.attributes.userDisplayName}</h1>
            <h3>{review.attributes.body}</h3>
          </div>
        ))}
      </div>
      <CSVToJsonConverter />
      <Urunler />
    </div>
  );
};

export default Turdetayi;
