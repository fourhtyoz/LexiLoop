import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SwipeHint({ text, color = '#fff', position = 'right', onPress }: any) {
    const [bounceValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: 10,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [bounceValue]);

  return (
    <TouchableOpacity onPress={onPress} style={[s.container, {transform: [{translateX: position === 'right' ? 150 : -150 }]}]}>
      <Text style={[s.text, { color: color  }]}>{text}</Text>
      <Animated.View style={{ transform: [{ translateX: bounceValue }] }}>
        {position === 'right' 
        ? <Ionicons name="arrow-forward-circle-outline" size={50} color={color} style={s.arrow} />
        : <Ionicons name="arrow-back-circle-outline" size={50} color={color} style={s.arrow} />
        }
      </Animated.View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '90%',
    // left: '100%',
    transform: [{ translateX: 150 }],
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white'
  },
  arrow: {
    marginTop: 5,
  },
});
