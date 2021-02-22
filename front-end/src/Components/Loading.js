import React, { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

export default function Loading() {
  const messages = ["obtaining Torre profile", "getting skills from the user", "setting up visualizations", "going to Torre for a free cookie 🍪", " "];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  useEffect(() => {
    setInterval(() => {
      setCurrentMessageIndex((c) => c + 1);
    }, 2000);
  }, []);

  return (
    <div className='Loading text-center'>
      <div css={override} style={{ width: "70%" }}>
        <PuffLoader color='#cddc39' loading={true} css={override} size={150} />
        <hr style={{ color: "#ccc" }} />
        <h1 className='loadingTitle'>{messages[currentMessageIndex % messages.length]}</h1>
      </div>
    </div>
  );
}
