import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

const NoteItem = ({ title, content }) => {
    return (
        <Card style={styles.card} elevation={16}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content.split('\n')[0]}</Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 16,
        padding: 16,
        backgroundColor: 'yellow',
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