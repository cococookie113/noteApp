import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
//import { Updates } from "expo";

import Ionicons from "react-native-vector-icons/Ionicons";

import Color from "./Color";

let colorList = [
  "#30D0B7",
  "#5889F8",
  "#DB022C",
  "#AD1C31",
  "#55969D",
  "#11A63A",
  "#FFFF66",
  "#FFE4E1",
  "#8A2BE2",
  "#407294",
  "#FFF68F",
];

export default function Settings() {
  return (
    <View style={styles.settings}>
      <View style={{ ...styles.tobBar, borderBottomColor: global.color }}>
        <Text style={styles.tobBarText}>Settings</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
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
        </ScrollView>
        {/* 
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
        </TouchableOpacity> */}
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
