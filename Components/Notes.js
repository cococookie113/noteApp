import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Prompt from "react-native-prompt";
import AsyncStorage from "@react-native-community/async-storage";

import makeNotes from "./makeNotes";
import Note from "./Note";

global.noteList = new Map();
global.color = "#30D0B7";

const storeNoteList = async (value) => {
  try {
    const stringifiedNoteList = JSON.stringify(global.notelist);
    await AsyncStorage.setItem();
  } catch (error) {}
};

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptVisible: false,
      n: new Map(),
      noteArr: [],
      noteList: global.noteList,
      renderedMap: global.notelist,
    };
  }

  UNSAFE_componentWillUpdate() {
    console.log(global.noteList);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          <Text style={styles.text}>Delete</Text>
        </View>

        {this.state.noteArr.map((note) => {
          return note;
        })}

        <TouchableOpacity
          style={styles.addNote}
          onPress={() => {
            this.setState({ promptVisible: true });
          }}
        >
          <Ionicons name="ios-add" style={styles.addText}></Ionicons>
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
              global.noteList.set(
                value,
                new Map([
                  ["word", value],

                  ["details", valueSecond],
                ])
              );
              this.state.noteArr = makeNotes(dropZoneHeight);
            }
            this.setState({ promptVisible: false });
          }}
        />
      </View>
    );
  }
}

let Window = Dimensions.get("window");
const dropZoneHeight = Window.height / 10;
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  dropZone: {
    flex: 0.12,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "#2c3e50",
  },
  text: {
    color: "#c1c1c1",
    fontWeight: "bold",
    fontSize: 26,
    top: 30,
  },

  addNote: {
    position: "absolute",
    width: 76,
    height: 76,
    borderRadius: 38,
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
    color: "#30D0B7",
  },
});
