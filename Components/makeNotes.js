import React from "react";
import { View, Text } from "react-native";
import Note from "./Note";

export function makeArr(noteList) {
  let arrIdx = [];

  for (const [key, value] of Object.entries(noteList)) {
    arrIdx.push(value);
  }
  // console.log(arrIdx);
  return arrIdx;
}
