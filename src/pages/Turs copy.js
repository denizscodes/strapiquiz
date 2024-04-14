import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
export default function Turs() {
  const { error, isLoading, data } = useFetch(
    "http://localhost:1337/api/products?populate=*"
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  console.log(data);

  return (
    <div className="detay">
      <ul className="detay">
        {data.data.map((product) => (
          <li key={product.id}>
            <img
              src={
                "http://localhost:1337" +
                data.data[0].attributes.resim.data.attributes.url
              }
            />
            <h2>{product.attributes.name}</h2>
            <code>{product.attributes.price}$</code>
            <Link to={`/turs/${product.id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
