import React from "react";
import { View, Text } from "react-native";
import Note from "./Note";

export default function makeNotes(dropZone) {
  let arrIdx = [];
  global.noteList.forEach((note, i) =>
    arrIdx.push(<Note key={i} noteData={note} dropZone={dropZone} />)
  );

  return arrIdx;
}
