import React from "react";
import { useState, useCallback } from "react";

const Review = ({ productId }) => {
  const [userDisplayName, setuserDisplayName] = useState("");
  const [body, setBody] = useState("");
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("http://localhost:1337/api/sohbet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            userDisplayName: userDisplayName,
            body: body,
            product: productId,
          },
        }),
      });

      setuserDisplayName("");
      setBody("");
    },
    [userDisplayName, body]
  );

  return (
    <div>
      <form className="flex-col" onSubmit={handleSubmit}>
        <input
          className="duzen"
          type="string"
          placeholder="Enter your name"
          value={userDisplayName}
          onChange={(e) => setuserDisplayName(e.currentTarget.value)}
        ></input>
        <textarea
          className="duzen"
          placeholder="Review"
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
        />
        <button className="duzen" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Review;
