import React from "react";
import { View, Text } from "react-native";
import { useNetInfo } from '@react-native-community/netinfo';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WordScreen from "@/screens/WordScreen";
import ProverbScreen from "@/screens/ProverbScreen";
import SearchScreen from "@/screens/SearchScreen";


const Tab = createMaterialTopTabNavigator();


export default function App() {
    const netInfo = useNetInfo();

    if (!netInfo?.isConnected) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 18, color: "red" }}>
                No Internet Connection
                </Text>
            </View>
        )
    }

    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { display: "none" }, swipeEnabled: true }}>
            <Tab.Screen name="SearchScreen" component={SearchScreen} />
            <Tab.Screen name="WordScreen" component={WordScreen} />
            <Tab.Screen name="ProverbScreen" component={ProverbScreen} />
        </Tab.Navigator>
    );
}
