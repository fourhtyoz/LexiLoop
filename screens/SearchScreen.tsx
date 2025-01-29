import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CustomButton from '@/components/CustomButton';
import SwipeHint from '@/components/SwipeHint';
import { toTitleCase } from '@/utils/helpFunctions';
import AnimatedError from '@/components/AnimatedError';


export default function SearchScreen({ navigation }: any) {
    const [query, setQuery] = useState('');
    const [word, setWord] = useState('');
    const [meanings, setMeanings] = useState<any>([]);
    const [examples, setExamples] = useState<any>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetResult = () => {
        setQuery('')
        setWord('')
        setMeanings([])
        setExamples([])
        setError('')
        setIsLoading(false)
    }

    const handleSearch = () => {
        fetchWord()
    }
    const fetchWord = async () => {
        setIsLoading(true);

        setWord(toTitleCase(query));

        const newMeanings = [];
        const newExamples = [];
        try {
            const { data } = await axios.get(`https://sozluk.gov.tr/gts?ara=${query}`);
            const dataMeanings = data[0]?.anlamlarListe;
            for (let m of dataMeanings) {
                const meaning = toTitleCase(m.anlam.replace('► ', ''));
                newMeanings.push(meaning);

                const dataExamples = m?.orneklerListe;
                if (dataExamples && Array.isArray(dataExamples) && dataExamples.length > 0) {
                    for (let ex of dataExamples) {
                        const example = toTitleCase(ex.ornek.replace('► ', ''));
                        newExamples.push(example);
                    }
                }
            }

            setMeanings(newMeanings);
            setExamples(newExamples);
        } catch (e) {
            console.error('error', e);
            setError(`error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = query ? false : true

    return (
        <SafeAreaView style={s.wrapper}>
            {error && <AnimatedError message={error} onHide={() => setError('')} />}
            {!word && (
                <View style={[s.container]}>
                    <Text style={s.title}>What word is on your mind?</Text>
                    <TextInput
                        style={s.input}
                        placeholder="Enter a word..."
                        value={query}
                        onChangeText={setQuery}
                    />
                    <CustomButton title="Search" onPress={handleSearch} color='#FFF' disabled={isDisabled} />
                </View>
            )}

            {isLoading && <ActivityIndicator color='#FFF' />}

            {!isLoading && word && (
                <>
                    <Animated.View style={[s.wordContanier]}>
                        <Text style={s.word}>{word}</Text>
                    </Animated.View>
                    {meanings.length > 0 && (
                        <View style={[s.section]}>
                            <Text style={s.title}>{meanings.length > 1 ? 'Meanings:' : 'Meaning:'}</Text>
                            {meanings.map((item: string, index: number) => (
                                <Text key={index} style={s.content}>- {item}.</Text>
                            ))}
                        </View>
                    )}
                    {examples.length > 0 && (
                        <View style={[s.section]}>
                            <Text style={s.title}>{examples.length > 1 ? 'Examples:' : 'Example:'}</Text>
                            {examples.map((item: string, index: number) => (
                                <Text key={index} style={s.content}>- {item}</Text>
                            ))}
                        </View>
                    )}
                    <View style={s.buttonContainer}>
                        <CustomButton title='Search another one' color='#FFF' onPress={handleResetResult}/>
                    </View>
                </>
            )}
            <SwipeHint text="Word of the day" onPress={() => navigation.navigate('WordScreen')} />
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    buttonContainer: {
        marginTop: 20
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#021B79',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 20 * 1.5,
        color: '#fff'
    },

    word: {
        fontSize: 40,
        lineHeight: 40 * 1.5,
        fontWeight: 'bold',
        color: '#FFF',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        width: '100%',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    content: {
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 16 * 1.5,
        color: '#FFF',
    },
    section: {
        width: '100%',
        marginTop: 20,
    },
    wordContanier: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFF',
        borderBottomWidth: 5,
        borderTopWidth: 5,
        paddingVertical: 10,
    },
})
