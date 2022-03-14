import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import NoteItem from './NoteItem'

const Notes = ({ navigation }) => {
    const [notes, setNotes] = useState([])

    async function saveData() {
        try {
            const data = JSON.stringify({ notes })
            await AsyncStorage.setItem('notes', data)
        } catch {}
    }

    async function getData() {
        try {
            const data = await AsyncStorage.getItem('notes')
            if (data !== null) {
                setNotes(JSON.parse(data).notes)
            }
        } catch {}
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        saveData()
    }, [notes, setNotes])

    function addNote(note) {
        setNotes([note, ...notes])
    }

    function updateNote(note) {
        const { id } = note
        setNotes(notes.map(n => n.id === id ? note : n))
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {notes.map(n =>
                    <NoteItem
                        key={n.id}
                        note={n}
                        navigation={navigation}
                        updateNote={updateNote}
                    />)}
            </ScrollView>
            <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Edit Note', { addNote })} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'khaki',
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
})

export default Notes