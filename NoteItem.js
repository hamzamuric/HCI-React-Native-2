import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Chip } from 'react-native-paper'

const NoteItem = ({ note, navigation, updateNote }) => {
    function onCardPress() {
        navigation.navigate('Edit Note', { note, updateNote })
    }

    return (
        <Card style={styles.card} elevation={16} onPress={onCardPress}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.content}>{note.content.split('\n')[0]}</Text>
            <View style={styles.chips}>
                {note.tags && note.tags.map(tag =>
                    <Chip key={tag} style={styles.chip}>{tag}</Chip>
                )}
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 16,
        padding: 16,
        backgroundColor: 'yellow',
    },
    chips: {
        flexDirection: 'row',
    },
    chip: {
        margin: 6,
        backgroundColor: 'orange',
    },
    title: {
        fontSize: 32,
        marginBottom: 8,
        color: 'teal',
    },
    content: {
        fontSize: 24,
    },
})

export default NoteItem