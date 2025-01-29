import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { toTitleCase } from "@/utils/helpFunctions";
import AnimatedError from "@/components/AnimatedError";
import CustomButton from "@/components/CustomButton";


export default function ResultScreen({ navigation, route }: any) {
    const query = route?.params?.query
    
    if (!query) {
        return (
            <SafeAreaView style={s.wrapper}>
                <Text style={s.title}>Whoops...</Text>
                <Text style={s.title}>There are no more screens :(</Text>
            </SafeAreaView>
        )
    }

    const [word, setWord] = useState('');
    const [meanings, setMeanings] = useState<any>([]);
    const [examples, setExamples] = useState<any>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const resetAllFields = () => {
        setWord('')
        setMeanings('')
        setExamples('')
    }

    useEffect(() => {
        const fetchWord = async () => {
            setIsLoading(true)

            setWord(toTitleCase(query))

            const newMeanings = []
            const newExamples = []

            try {   
                const { data } = await axios.get(`https://sozluk.gov.tr/gts?ara=${query}`)

                const dataMeanings = data[0]?.anlamlarListe
                for (let m of dataMeanings) {
                    const meaning = toTitleCase(m.anlam.replace('► ', ''))
                    newMeanings.push(meaning)

                    const dataExamples = m?.orneklerListe
                    if (dataExamples && Array.isArray(dataExamples) && dataExamples.length > 0) {
                        for (let ex of dataExamples) {
                            const example = toTitleCase(ex.ornek.replace('► ', ''))
                            newExamples.push(example)
                        }
                    }
                }

                setMeanings(newMeanings)
                setExamples(newExamples)
            } catch (e) {
                console.error('error', e)
                setError(`error: ${e}`)
                resetAllFields()
            } finally {
                setIsLoading(false)
            }
        }

        fetchWord()
    }, [query])

    
    if (isLoading) {
        return (
            <SafeAreaView style={s.wrapper}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={s.wrapper}>
            {error && <AnimatedError message={error} onHide={() => setError('')} />}
            <View style={s.wordContanier}>
                <Text style={s.word}>{word}</Text>
            </View>
            {meanings.length > 0 && (
                <View style={s.section}>
                    <Text style={s.title}>{meanings.length > 1 ? 'Meanings' : 'Meaning'}:</Text>
                    {meanings.map((item: string, index: number) => (
                        <Text key={index} style={s.content}>- {item}.</Text>
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
            <View style={s.buttonSection}>
                <CustomButton title='Search for something else...' onPress={() => navigation.navigate('SearchScreen')} />
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    buttonSection: {
        marginTop: 100
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#e5eaf5'
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
    }
})