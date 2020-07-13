import * as SecureStore from "expo-secure-store";

export const storeData = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
    // console.log("done");
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key) => {
  try {
    await SecureStore.getItemAsync(key).then((value) => {
      jsonValue = value;
    });
    // console.log(JSON.parse(jsonValue));
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromNoteList = (word) => {
  delete global.noteList[word];
};

export const addInNoteList = (word, details) => {
  addNoteList(word, details);
};

const addNoteList = (word, details) => {
  global.noteList[word] = {
    word: word,
    details: details,
  };
};
