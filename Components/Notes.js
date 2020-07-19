import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Prompt from "react-native-prompt";
import Draggable from "react-native-draggable";

import { makeArr } from "./makeNotes";
import {
  getData,
  storeData,
  addInNoteList,
  deleteFromNoteList,
} from "./storage";

global.noteList = {};

const NOTELIST_KEY = "noteList";
const COLOR_KEY = "color";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptVisible: false,

      noteList: {},
    };
    // getData(NOTELIST_KEY)
    //   .then((value) => {
    //     if (value) {
    //       this.state.noteList = value;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // getData(COLOR_KEY)
    //   .then((value) => {
    //     if (value) {
    //       global.color = value;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  UNSAFE_componentWillMount() {
    getData(NOTELIST_KEY)
      .then((value) => {
        if (value) {
          this.setState({ noteList: value });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // console.log(global.noteList);

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ ...styles.dropZone, backgroundColor: global.color }}>
          <Text style={styles.text}></Text>
        </View>
        <View style={styles.noteContainer}>
          {makeArr(this.state.noteList).map((note) => {
            return (
              <Draggable
                key={note.word}
                renderText={note.word}
                renderSize={CIRCLE_RADIUS * 2}
                renderColor={global.color}
                onShortPressRelease={() => Alert.alert(note.word, note.details)}
                x={Math.round(Window.width / 2.5)}
                y={Math.round(Window.height / 2.6)}
                isCircle
                touchableOpacityProps={{ activeOpacity: 0.8 }}
                onDragRelease={(e, gesture, bounds) => {
                  // console.log(gesture.moveY);
                  if (gesture.moveY < Window.height / 10 + CIRCLE_RADIUS / 3) {
                    // console.log("hi");
                    delete this.state.noteList[note.word];
                    storeData(NOTELIST_KEY, this.state.noteList);
                    this.setState({});
                  }
                }}
              />
            );
          })}
        </View>

        {/* <TouchableOpacity
          style={styles.refresh}
          onPress={() => {
            storeData(NOTELIST_KEY, this.state.noteList);
            this.setState({});
          }}
        >
          <Ionicons
            name="ios-refresh"
            style={{ ...styles.refreshText, color: global.color }}
          ></Ionicons>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.addNote}
          onPress={() => {
            this.setState({ promptVisible: true });
          }}
        >
          <Ionicons
            name="ios-add"
            style={{ ...styles.addText, color: global.color }}
          ></Ionicons>
        </TouchableOpacity>

        <Prompt
          title="Memo"
          defaultValue=""
          placeholder="Memo"
          placeholderSecond="Details"
          visible={this.state.promptVisible}
          onCancel={() => this.setState({ promptVisible: false })}
          onSubmit={(value, valueSecond) => {
            if (value !== "") {
              //addInNoteList(value, valueSecond);

              // global.noteList.set(
              //   value,
              //   new Map([
              //     ["word", value],
              //     ["details", valueSecond],
              //   ])
              // );
              this.state.noteList[value] = {
                word: value,
                details: valueSecond,
              };
            }
            storeData(NOTELIST_KEY, this.state.noteList).catch((err) => {
              console.log(err);
            });
            this.setState({ promptVisible: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

let Window = Dimensions.get("window");
const CIRCLE_RADIUS = 46;
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    width: Window.width,
    height: Window.height,
  },
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
  dropZone: {
    flex: 0.12,
    alignItems: "center",
    justifyContent: "center",
  },
  noteContainer: {
    flex: 0.88,
    backgroundColor: "#f8f8f8",
    width: Window.width,
    height: Window.height,
  },
  text: {
    color: "#c1c1c1",
    fontWeight: "bold",
    fontSize: 26,
    top: 35,
  },

  addNote: {
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
  addText: {
    fontSize: 60,
  },
  refresh: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    right: 10,
    //bottom: -1 * Window.height + Window.height / 6,
    bottom: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  refreshText: {
    fontSize: 40,
  },
});
