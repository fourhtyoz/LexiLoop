import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import axios from "axios";
import { toTitleCase } from "@/utils/helpFunctions";
import SwipeHint from "@/components/SwipeHint";


export default function WordScreen({ navigation }: any) {
    const [word, setWord] = useState('');
    const [meanings, setMeanings] = useState<any>([]);
    const [examples, setExamples] = useState<any>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchWord = async () => {
            setIsLoading(true)
            try {
                const { data } = await axios.get('https://sozluk.gov.tr/icerik')
                if (data?.kelime && Array.isArray(data.kelime) && data.kelime.length > 0) {
                    const allMeanings = data.kelime.map((item: any) => item.anlam)
                    setMeanings(allMeanings)
                    
                    const { madde } = data.kelime[0]
                    if (madde) {
                        setWord(toTitleCase(madde))
                        const { data } = await axios.get(`https://sozluk.gov.tr/gts?ara=${madde}`)
                        const exampleSentences = data[0].anlamlarListe
                        if (exampleSentences) {
                            const newExamples = []
                            for (let i of exampleSentences) {
                                const examplesArray = i?.orneklerListe
                                if (examplesArray) {
                                    for (let j of examplesArray) {
                                        if (j.ornek) {
                                            newExamples.push(toTitleCase(j.ornek))
                                        }
                                    }
                                }
                            }
                            setExamples(newExamples)
                        }
                    } else {
                        setWord('Error: Word has not been found')
                        return
                    }
                } else {
                    setError('Error while fetching data. Invali data.')
                    return
                }
            } catch (e) {
                setError(`error: ${e}`)
                console.log('error', e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchWord()
    }, [])

    
    if (isLoading) {
        return (
            <SafeAreaView style={s.wrapper}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }
    return (
        <>
        <SafeAreaView style={s.wrapper}>
            {error && <Text>{error}</Text>}
            <View style={s.wordContanier}>
                <Text style={s.word}>{word}</Text>
            </View>
            {meanings.length > 0 && (
                <View style={s.section}>
                    <Text style={s.title}>{meanings.length > 1 ? 'Meanings' : 'Meaning'}:</Text>
                    {meanings.map((item: string, index: number) => (
                        <Text key={index} style={s.content}>{index+1}. {item}.</Text>
                    ))}
                </View>
            )}
            {examples.length > 0 && (
                <View style={s.section}>
                    <Text style={s.title}>{examples.length > 1 ? 'Examples' : 'Example'}:</Text>
                    {examples.map((item: string, index: number) => (
                        <Text key={index} style={s.content}>- {item}</Text>
                    ))}
                </View>
            )}
            <SwipeHint text='Proverb of the day' color='#000' onPress={() => navigation.navigate('ProverbScreen')} />
            {/* <SwipeHint text='Search' color='#000' position='left' onPress={() => navigation.navigate('SearchScreen')} /> */}
        </SafeAreaView>
        <ImageBackground
            source={require("@/assets/images/bg1.png")}
            style={s.image}
            resizeMode="contain"
        />
        </>
    )
}

const s = StyleSheet.create({
    image: {
        width: "100%", // Full width
        height: 100, // Adjust the height of the image
        position: "absolute",
        bottom: 0, // Pin it to the bottom
        zIndex: 1
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#FFF'
    },
    wordContanier: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderBottomWidth: 5,
        borderTopWidth: 5,
        paddingVertical: 10
    },
    word: {
        fontSize: 40,
        lineHeight: 40 * 1.5,
        fontWeight: 'bold',
    },
    content: {
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 20 * 1.5,
    },
    section: {
        width: '100%',
        marginTop: 20
    },
})