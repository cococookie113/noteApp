import React, { useState, Component } from "react";
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

import { deleteFromNoteList } from "./storage";
import { deleteItemAsync } from "expo-secure-store";
import { unmountComponentAtNode } from "react-dom";

export default class Note extends Component {
  constructor(props) {
    super(props);
    const { noteData } = props;

    this.state = {
      visible: "flex",
      word: noteData.word,
      details: noteData.details,
      pan: new Animated.ValueXY(),
    };

    this.panResponder = PanResponder.create({
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
        if (gesture.moveY + CIRCLE_RADIUS / 3 < dropZoneHeight) {
          this.setState({ visible: "none" });
        }

        this.state.pan.flattenOffset();
        unmountComponentAtNode;
      }, //Step 4
    });
  }

  componentDidUpdate() {
    // if (this.state.visible === "none") {
    //   deleteFromNoteList(this.state.word);
    // }
    // if (
    //   this.state.pan.x > Window.width / 2 + CIRCLE_RADIUS ||
    //   this.state.pan.x < -1 * (Window.width / 2 + CIRCLE_RADIUS) ||
    //   this.state.pan.y > Window.height / 2 + CIRCLE_RADIUS ||
    //   this.state.pan.y < -1 * (Window.height / 2 + CIRCLE_RADIUS)
    // ) {
    //   this.state.pan.setValue({ x: 0, y: 0 });
    //   console.log("check");
    // }
  }

  alertDetails = () => {
    Alert.alert(
      this.state.word,
      this.state.details ? this.state.details : null
    );
  };

  render() {
    // if (this.state.visible === "none") {
    //   deleteFromNoteList(this.state.word);
    // }

    // console.log(this.state.word, " pan: ", this.state.pan.x, this.state.pan.y);

    return (
      <View
        style={{
          ...styles.draggableContainer,
          display: this.state.visible,
        }}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            this.state.pan.getLayout(),
            { ...styles.circle, backgroundColor: global.color },
          ]}
        >
          <TouchableOpacity
            onPress={this.alertDetails}
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
            <Text style={styles.text}>{this.state.word}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

// function Note({ noteData }) {
//   const [visible, setVisible] = useState("flex");
//   const [refresh, setRefresh] = useState(0);

//   let word = noteData.word,
//     details = noteData.details;

//   const alertMore = () => Alert.alert(word, details ? details : null);

//   let pan = new Animated.ValueXY(); //Step 1

//   let panResponder = PanResponder.create({
//     //Step 2
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: () => {
//       pan.setOffset({
//         x: pan.x._value,
//         y: pan.y._value,
//       });
//     },
//     onPanResponderMove: Animated.event(
//       [
//         null,
//         {
//           //Step 3
//           dx: pan.x,
//           dy: pan.y,
//         },
//       ],
//       { useNativeDriver: false }
//     ),

//     onPanResponderRelease: (e, gesture) => {
//       if (gesture.moveY + CIRCLE_RADIUS / 3 < dropZoneHeight) {
//         setVisible("none");
//       }

//       pan.flattenOffset();
//     }, //Step 4
//   });
//   if (visible === "none") {
//     delete global.noteList[word];
//   }

//   return (
//     <View
//       style={{
//         ...styles.draggableContainer,
//         display: visible,
//       }}
//     >
//       <Animated.View
//         {...panResponder.panHandlers}
//         style={[
//           pan.getLayout(),
//           { ...styles.circle, backgroundColor: global.color },
//         ]}
//       >
//         <TouchableOpacity
//           onPress={alertMore}
//           underlayColor={"#f2f2f2"}
//           activeOpacity={0.8}
//           style={{
//             width: CIRCLE_RADIUS * 2,
//             height: CIRCLE_RADIUS * 2,
//             borderRadius: CIRCLE_RADIUS,
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text style={styles.text}>{word}</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

let CIRCLE_RADIUS = 46;
let Window = Dimensions.get("window");
const dropZoneHeight = Window.height / 10;
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
