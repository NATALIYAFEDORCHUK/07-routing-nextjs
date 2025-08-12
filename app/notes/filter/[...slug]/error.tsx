"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};
const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Could not fetch the list of notes.</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default Error;
