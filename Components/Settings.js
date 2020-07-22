import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Updates } from "expo";
import { Restart } from "fiction-expo-restart";

import Ionicons from "react-native-vector-icons/Ionicons";

import Color from "./Color";

//almost from https://digitalsynopsis.com/design/beautiful-color-palettes-combinations-schemes/
let colorList = [
  "#30D0B7",
  "#5889F8",
  "#DB022C",
  "#4b3832",
  "#854442",
  "#fff4e6",
  "#3c2f2f",
  "#be9b7b",
  "#ee4035",
  "#f37736",
  "#fdf498",
  "#7bc043",
  "#0392cf",
  "#4a4e4d",
  "#0e9aa7",
  "#3da4ab",
  "#f6cd61",
  "#fe8a71",
  "#d11141",
  "#00b159",
  "#00aedb",
  "#f37735",
  "#ffc425",
  "#fff6e9",
  "#ffefd7",
  "#fffef9",
  "#e3f0ff",
  "#d2e7ff",
  "#2e003e",
  "#3d2352",
  "#3d1e6d",
  "#8874a3",
  "#e4dcf1",
  "#343d46",
  "#4f5b66",
  "#65737e",
  "#a7adba",
  "#c0c5ce",
  "#e3c9c9",
  "#f4e7e7",
  "#eedbdb",
  "#cecbcb",
  "#cbdadb",
  "#051e3e",
  "#251e3e",
  "#451e3e",
  "#651e3e",
  "#851e3e",
  "#ff77aa",
  "#ff99cc",
  "#ffbbee",
  "#ff5588",
  "#ff3377",
  "#96ceb4",
  "#ffeead",
  "#ff6f69",
  "#ffcc5c",
  "#88d8b0",
];

export default function Settings() {
  return (
    <View style={styles.settings}>
      <View style={{ ...styles.tobBar, borderBottomColor: global.color }}>
        <Text style={styles.tobBarText}>Settings</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View></View>
          <View style={styles.item}>
            <View
              style={{
                ...styles.contentTop,
                borderBottomWidth: 1,
                borderBottomColor: global.color,
              }}
            >
              <Text style={styles.contentTopText}>Color</Text>
            </View>
            <View style={styles.content}>
              {colorList.map((color) => {
                return <Color key={color} color={color} />;
              })}
            </View>
          </View>
          <View></View>
        </ScrollView>

        <TouchableOpacity
          style={styles.restart}
          onPress={() => {
            // Updates.reload();
            Restart();
          }}
        >
          <Ionicons
            name="ios-checkmark"
            style={{ ...styles.restartText, color: global.color }}
          ></Ionicons>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

let styles = StyleSheet.create({
  settings: {
    flex: 1,
  },
  tobBar: {
    flex: 0.1,
    borderBottomWidth: 1,
    justifyContent: "center",
    backgroundColor: "#fefefe",
  },
  tobBarText: {
    left: 15,
    top: 15,
    opacity: 0.6,
    fontSize: 26,
    color: "#191919",
    fontWeight: "bold",
  },
  container: {
    flex: 0.9,
  },
  item: {
    marginHorizontal: 40,
    marginVertical: 20,
    flex: 1,
  },
  contentTop: {
    flex: 0.1,
    opacity: 0.3,
  },
  contentTopText: {
    color: "#191919",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",

    flexWrap: "wrap",
  },
  restart: {
    position: "absolute",
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    right: 10,
    //bottom: -1 * Window.height + Window.height / 6,
    bottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  restartText: {
    fontSize: 60,
  },
});
