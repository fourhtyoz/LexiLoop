import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { toTitleCase } from "@/utils/helpFunctions";


export default function ProverbScreen() {
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
                <Text style={s.title}>Anlam:</Text>
                <Text style={s.content}>{meaning}.</Text>
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
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