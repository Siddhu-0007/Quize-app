import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Welcome from "../Screens/welcome";
import Home from "./Home";
import Profile1  from "../Screens/profile";
import Question from "../Screens/questions";
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#7965C1",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Browser":
              iconName = "search-outline";
              break;
            case "Discover":
              iconName = "compass-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFF2E0",
        tabBarInactiveTintColor: "white",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
       <Tab.Screen name="Browser" component={Welcome} />
       <Tab.Screen name="Discover" component={Question} /> 
      <Tab.Screen name="Profile" component={Profile1} />
    </Tab.Navigator>
  );
}
