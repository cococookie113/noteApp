import AsyncStorage from "@react-native-community/async-storage";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.removeItem(key);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};
