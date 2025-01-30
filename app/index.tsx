import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WordOfTheDayScreen from "@/screens/WordOfTheDayScreen";
import ProverbOfTheDayScreen from "@/screens/ProverbOfTheDayScreen";
import WordSearchScreen from "@/screens/WordSearchScreen";


const Tab = createMaterialTopTabNavigator();


export default function App() {
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { display: "none" }, swipeEnabled: true }}>
            <Tab.Screen name="WordSearchScreen" component={WordSearchScreen} />
            <Tab.Screen name="WordOfTheDayScreen" component={WordOfTheDayScreen} />
            <Tab.Screen name="ProverbOfTheDayScreen" component={ProverbOfTheDayScreen} />
        </Tab.Navigator>
    );
}
