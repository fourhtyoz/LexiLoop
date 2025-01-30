import React from "react";
import { View, Text } from "react-native";
import { useNetInfo } from '@react-native-community/netinfo';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WordOfTheDayScreen from "@/screens/WordOfTheDayScreen";
import ProverbOfTheDayScreen from "@/screens/ProverbOfTheDayScreen";
import WordSearchScreen from "@/screens/WordSearchScreen";


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
            <Tab.Screen name="WordSearchScreen" component={WordSearchScreen} />
            <Tab.Screen name="WordOfTheDayScreen" component={WordOfTheDayScreen} />
            <Tab.Screen name="ProverbOfTheDayScreen" component={ProverbOfTheDayScreen} />
        </Tab.Navigator>
    );
}
