import React from "react";
import { useFetch } from "../hooks/useFetch";

const Turyorum = () => {
  const { error, isLoading, data } = useFetch(
    "http://localhost:1337/api/reviews"
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }
  console.log(data);
  console.log(data.data.length);

  return (
    <div className="detay">
      {" "}
      <h1>{data.data[0].attributes.userDisplayName}</h1>
      <h1>{data.data[0].attributes.body}</h1>
    </div>
  );
};

export default Turyorum;
