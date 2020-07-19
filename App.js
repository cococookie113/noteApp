import React, { useState, Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Notes from "./Components/Notes";
import Settings from "./Components/Settings";
import { storeData, getData } from "./Components/storage";

const COLOR_KEY = "color";
global.color = "#30D0B7";

const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      color: global.color,
    };
  }

  UNSAFE_componentWillMount() {
    getData(COLOR_KEY)
      .then((value) => {
        if (value) {
          global.color = value;
          this.setState({ color: value });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "ios-list";
              } else if (route.name === "Settings") {
                iconName = "ios-settings";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: this.state.color,
            inactiveTintColor: "#595B5A",
          }}
        >
          <Tab.Screen name="Home" component={Notes} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
