import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import axios from "axios";
import { toTitleCase } from "@/utils/helpFunctions";
import SwipeHint from "@/components/SwipeHint";


export default function ProverbScreen({ navigation }: any) {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const { data } = await axios.get('https://sozluk.gov.tr/icerik')
                if (data?.atasoz && Array.isArray(data.atasoz) && data.atasoz.length > 0) {
                    const { madde, anlam } = data.atasoz[0]
                    if (madde) {
                        setWord(toTitleCase(madde))
                    } else {
                        setWord('Error: Proverb has not been found')
                        return
                    }
                    if (anlam) {
                        setMeaning(toTitleCase(anlam))
                    } else {
                        setMeaning('Error: Meaning has not been found')
                        return
                    }
                } else {
                    setError('Error while fetching data. Invalid data.')
                    return
                }
            } catch (e) {
                setError(`error: ${e}`)
                console.log('error', e)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()

    }, [])

    
    if (isLoading) {
        return (
            <SafeAreaView style={s.wrapper}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={s.wrapper}>
            {error && <Text>{error}</Text>}
            <View style={s.wordContanier}>
                <Text style={s.word}>{word}</Text>
            </View>
            <View style={s.section}>
                <Text style={s.title}>Meaning:</Text>
                <Text style={s.content}>{meaning}.</Text>
            </View>
            <SwipeHint text='Word of the day' position='left'  onPress={() => navigation.navigate('WordScreen')}/>
            <ImageBackground
                source={require("@/assets/images/bg1.png")}
                style={s.image}
                resizeMode="contain"
            />
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    image: {
        width: "100%", // Full width
        height: 150, // Adjust the height of the image
        position: "absolute",
        bottom: 0, // Pin it to the bottom
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#000'
    },
    wordContanier: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFF',
        borderBottomWidth: 5,
        borderTopWidth: 5,
        paddingVertical: 10
    },
    word: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        lineHeight: 40 * 1.5,
        color: '#fff',
    },
    content: {
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 16 * 1.5,
        color: '#fff'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 20 * 1.5,
        color: '#fff'
    },
    section: {
        width: '100%',
        marginTop: 20
    }
})