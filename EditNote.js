import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text} from 'react-native'
import { Chip, FAB, TouchableRipple, TextInput as PaperInput, Provider, Portal, Dialog, Button } from 'react-native-paper'
import uuid from 'react-native-uuid'

const EditNote = ({ navigation, route }) => {
    const [title, setTile] = useState(route?.params?.note?.title ?? '')
    const [content, setContent] = useState(route?.params?.note?.content ?? '')
    const [tags, setTags] = useState(route?.params?.note?.tags ?? [])
    const [visible, setVisible] = useState(false)
    const [tagText, setTagText] = useState('')

    function save() {
        if (route?.params?.addNote) {
            const note = { id: uuid.v4(), title, content }
            route?.params?.addNote(note)
        } else if (route?.params?.updateNote) {
            const note = { ...route?.params?.note, title, content, tags }
            route?.params?.updateNote(note)
        }
        navigation.pop()
    }

    function dismissDialog() {
        setVisible(false)
        setTagText('')
    }

    function addTag() {
        setVisible(false)
        setTags([...tags, tagText])
        setTagText('')
    }

    return (
        <Provider>
            <Portal>
                <Dialog visible={visible} onDismiss={dismissDialog}>
                    <Dialog.Title>Add Tag</Dialog.Title>
                    <Dialog.Content>
                        <PaperInput
                            label="Tag text"
                            mode="outlined"
                            value={tagText}
                            onChangeText={t => setTagText(t)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={dismissDialog}>Done</Button>
                        <Button onPress={addTag}>Add</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={styles.container}>
                <TextInput style={styles.title} placeholder='Title' value={title} onChangeText={setTile} />
                <View style={styles.chips}>
                    <TouchableRipple style={styles.tagPlus} onPress={() => setVisible(true)}>
                        <Text style={styles.tagPlusText}>+</Text>
                    </TouchableRipple>
                    {tags.map(tag => 
                        <Chip style={styles.chip}>{tag}</Chip>
                    )}
                </View>
                <TextInput style={styles.content} placeholder='Content' multiline value={content} onChangeText={setContent} />
                <FAB style={styles.fab} icon="plus" onPress={save} />
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    tagPlus: {
        padding: 8,
    },
    tagPlusText: {
        fontSize: 20,
    },
    chips: {
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    chip: {
        margin: 6,
        backgroundColor: 'orange',
    },
    title: {
        fontSize: 48,
        margin: 16,
        color: 'teal',
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