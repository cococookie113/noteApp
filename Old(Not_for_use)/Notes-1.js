import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

jang = "장 볼것";

export default class Notes extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        <Note word={jang} />
        <Note word={"응ㅇ애"} />
      </View>
    );
  }
}

class Note extends Component {
  constructor() {
    super();

    this.state = {
      pan: new Animated.ValueXY(), //Step 1
    };

    this.panResponder = PanResponder.create({
      //Step 2
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            //Step 3
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
      }, //Step 4
    });
  }

  render() {
    return (
      <View style={styles.draggableContainer}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.circle]}
        >
          <Text style={styles.text}>{word}</Text>
        </Animated.View>
      </View>
    );
  }
}

let CIRCLE_RADIUS = 50;
let Window = Dimensions.get("window");
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    height: 100,
    backgroundColor: "#2c3e50",
  },
  text: {
    textAlign: "center",
    color: "#fff",
  },
  draggableContainer: {
    position: "absolute",
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1abc9c",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});
