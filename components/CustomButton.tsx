import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";


export default function CustomButton({ title, onPress, disabled, color = '#000'}: any) {
    return (
        <TouchableOpacity style={[s.container, { borderColor: color, opacity: disabled ? 0.3 : 1 }]} onPress={onPress} disabled={disabled}>
            <Text style={[s.title, { color: color }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    container: {
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    title: {
        fontSize: 16
    }
})