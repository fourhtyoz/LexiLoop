import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNetInfo } from '@react-native-community/netinfo';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WordOfTheDayScreen from "@/screens/WordOfTheDayScreen";
import ProverbOfTheDayScreen from "@/screens/ProverbOfTheDayScreen";
import WordSearchScreen from "@/screens/WordSearchScreen";


const Tab = createMaterialTopTabNavigator();


export default function App() {
    const netInfo = useNetInfo();

    if (netInfo?.isConnected === false && netInfo?.isConnected != null) {
        return (
            <View style={s.container}>
                <Text style={s.errorMessage}>
                    {`Whoops, you need to be connected to the internet to use the app :(`}
                </Text>
                <Text style={[s.errorMessage, { marginTop: 20}]}>
                    Try again later...
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

const s = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#021B79'
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: 18, 
        color: "#FFF"
    }
})
