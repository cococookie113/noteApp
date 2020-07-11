import React, { Component } from "react";
import { View } from "react-native";

export default class RenderedNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArr: props.noteArr,
    };
  }

  render() {
    return (
      <View>
        {this.state.noteArr.map((note) => {
          console.log(note);
          return note;
        })}
      </View>
    );
  }
}
