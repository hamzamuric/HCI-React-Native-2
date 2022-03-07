import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'

import NoteItem from './NoteItem'

const Notes = ({ navigation }) => {
    const [notes, setNotes] = useState([
        { id: 1, title: 'jedan', content: 'broj jedan' },
        { id: 2, title: 'jedan', content: 'broj jedan' },
        { id: 3, title: 'jedan', content: 'broj jedan' },
        { id: 4, title: 'jedan', content: 'broj jedan' },
        { id: 5, title: 'jedan', content: 'broj jedan' },
        { id: 6, title: 'jedan', content: 'broj jedan' },
        { id: 7, title: 'jedan', content: 'broj jedan' },
        { id: 8, title: 'jedan', content: 'broj jedan' },
        { id: 9, title: 'jedan', content: 'broj jedan' },
    ])

    function addNote(note) {
        setNotes([note, ...notes])
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {notes.map(n =>
                    <NoteItem
                        key={n.id}
                        title={n.title}
                        content={n.content}
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