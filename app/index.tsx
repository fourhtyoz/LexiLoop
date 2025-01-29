import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WordScreen from "../screens/WordScreen";
import ProverbScreen from "../screens/ProverbScreen";
import SearchScreen from "@/screens/SearchScreen";


const Tab = createMaterialTopTabNavigator();


export default function App() {
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { display: "none" }, swipeEnabled: true }}>
            <Tab.Screen name="SearchScreen" component={SearchScreen} />
            <Tab.Screen name="WordScreen" component={WordScreen} />
            <Tab.Screen name="ProverbScreen" component={ProverbScreen} />
        </Tab.Navigator>
    );
}
