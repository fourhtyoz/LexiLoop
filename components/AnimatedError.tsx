import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, Animated } from "react-native";


export default function AnimatedError({ message, onHide }: any) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => { if (onHide) onHide() });
        }, 3000);

        return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[s.errorContainer, { opacity: fadeAnim }]}>
        <Text style={s.errorText}>⚠️ {message}</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
    errorContainer: {
        backgroundColor: "#b22222",
        padding: 12,
        borderRadius: 8,
        alignSelf: "center",
        position: "absolute",
        top: 50,
        zIndex: 1,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    errorText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
