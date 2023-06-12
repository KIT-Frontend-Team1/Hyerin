import React from "react";
import { useRecoilValue } from "recoil";
import { countNextState } from "./selector";

export const CountInfo = () => {
  const nextCount = useRecoilValue(countNextState);
  return <p>the next number is {nextCount}</p>;
};
