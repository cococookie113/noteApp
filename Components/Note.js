import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function Note({ noteData, dropZone }) {
  const [visible, setVisible] = useState("flex");
  const [refresh, setRefresh] = useState(0);

  let word = noteData.get("word"),
    details = noteData.get("details");

  const alertMore = () => Alert.alert(word, details ? details : null);

  let pan = new Animated.ValueXY(); //Step 1

  let panResponder = PanResponder.create({
    //Step 2
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          //Step 3
          dx: pan.x,
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),

    onPanResponderRelease: (e, gesture) => {
      if (gesture.moveY + CIRCLE_RADIUS / 3 < dropZone) {
        global.noteList.delete(word);
        setVisible("none");
      } else {
        global.noteList.set(
          word,
          new Map([
            ["word", word],

            ["details", details],
          ])
        );

        pan.flattenOffset();
      }
    }, //Step 4
  });

  return (
    <View
      style={{
        ...styles.draggableContainer,
        display: visible,
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          pan.getLayout(),
          { ...styles.circle, backgroundColor: global.color },
        ]}
      >
        <TouchableOpacity
          onPress={alertMore}
          underlayColor={"#f2f2f2"}
          activeOpacity={0.8}
          style={{
            width: CIRCLE_RADIUS * 2,
            height: CIRCLE_RADIUS * 2,
            borderRadius: CIRCLE_RADIUS,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>{word}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

let CIRCLE_RADIUS = 46;
let Window = Dimensions.get("window");
const styles = StyleSheet.create({
  draggableContainer: {
    position: "absolute",
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS,
  },

  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },

  text: {
    textAlign: "center",
    color: "#f8f8f8",
  },
  hi: {
    flex: 1,
    backgroundColor: "red",
  },
  bye: {
    flex: 1,
    backgroundColor: "blue",
  },
});
