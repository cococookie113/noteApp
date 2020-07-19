import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { storeData } from "./storage";

const COLOR_KEY = "color";

function changeColor(color) {
  storeData(COLOR_KEY, color);
  global.color = color;
}

export default function Color({ color }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        ...styles.container,
        ...isSameWidthGlobalColor(color),
      }}
      onPress={() => {
        changeColor(color);
      }}
    />
  );
}

function isSameWidthGlobalColor(color) {
  if (color === global.color) {
    return {
      borderWidth: 2,
      borderColor: "#f8f8f8",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    };
  }
}

const radius = 35;
let styles = StyleSheet.create({
  container: {
    borderRadius: radius,
    // borderWidth: 3,
    // borderColor: "#eeeeee",
    width: radius * 2,
    height: radius * 2,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
