import React, { useState, useEffect, useMemo } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Chip, FAB, Searchbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { uniq } from 'lodash'

import NoteItem from './NoteItem'

const Notes = ({ navigation }) => {
    const [notes, setNotes] = useState([])
    const [query, setQuery] = useState('')
    const [selectedTag, setSelectedTag] = useState(null)

    const allTags = useMemo(() => uniq(notes.flatMap(note => note.tags).filter(tag => tag)), [notes])

    function filterNotes() {
        let filteredNotes = notes
        if (selectedTag !== null) {
            filteredNotes = filteredNotes.filter(note => note.tags?.includes(selectedTag))
        }
        if (query !== '') {
            filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) || note.content.toLowerCase().includes(query.toLowerCase()))
        }

        return filteredNotes
    }

    const filteredNotes = useMemo(() => {
        return filterNotes()
    }, [notes, query, selectedTag])

    function selectTag(tag) {
        setSelectedTag(selectedTag !== tag ? tag : null)
    }

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
        <View style={styles.container}>
            <Searchbar style={styles.searchbar} placeholder='Search' value={query} onChangeText={setQuery} />
            <View style={styles.tags}>
                {allTags.map(tag =>
                    <Chip
                        style={styles.tag}
                        onPress={() => selectTag(tag)}
                        selected={tag === selectedTag}>
                        {tag}
                    </Chip>
                )}
            </View>
            <ScrollView style={styles.container}>
                {filteredNotes.map(n =>
                    <NoteItem
                        key={n.id}
                        note={n}
                        navigation={navigation}
                        updateNote={updateNote}
                    />)}
            </ScrollView>
            <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Edit Note', { addNote })} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchbar: {
        margin: 16,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
    },
    tag: {
        marginHorizontal: 4,
        backgroundColor: 'orange',
    },
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