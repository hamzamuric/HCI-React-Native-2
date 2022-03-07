import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { FAB } from 'react-native-paper'
import uuid from 'react-native-uuid'

const EditNote = ({ navigation, route }) => {
    const [title, setTile] = useState('')
    const [content, setContent] = useState('')

    function save() {
        const note = { id: uuid.v4(), title, content }
        route?.params?.addNote(note)
        navigation.pop()
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.title} placeholder='Title' value={title} onChangeText={setTile} />
            <TextInput style={styles.content} placeholder='Content' multiline value={content} onChangeText={setContent} />
            <FAB style={styles.fab} icon="plus" onPress={save} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    title: {
        fontSize: 48,
        margin: 16,
    },
    content: {
        fontSize: 24,
        margin: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    }
})

export default EditNote