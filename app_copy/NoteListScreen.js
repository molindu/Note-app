import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StatusBar, StyleSheet, Keyboard, Dimensions } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icons from './Icons';
import { TouchableWithoutFeedback } from 'react-native';
import colors from './colors';
import RootNavigation from './RootNavigation';

const width = Dimensions.get('window').width - 20;
const squre = Dimensions.get('window').width;

const NoteListScreen = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        initializeDatabase();
        loadNotes();
    }, []);

    useEffect(() => {
        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(filtered);
    }, [searchQuery, notes]);

    const initializeDatabase = () => {
        const db = SQLite.openDatabase({
            name: 'notesDB',
            location: 'default',
        });

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)',
                [],
                () => { },
                error => {
                    console.error('Error creating table: ', error);
                }
            );
        });
    };

    const loadNotes = () => {
        const db = SQLite.openDatabase({ name: 'notesDB', location: 'default' });

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM notes',
                [],
                (_, result) => {
                    setNotes(result.rows.raw());
                },
                error => {
                    console.error('Error loading notes: ', error);
                }
            );
        });
    };

    const handleAddNote = () => {
        RootNavigation.navigate('NoteDetail', { onUpdate: loadNotes });
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const TwoColumnNoteDetail = ({ note1, note2 }) => {
        return (
            <View style={styles.twoColumnContainer}>
                <TouchableOpacity
                    onPress={() =>
                        RootNavigation.navigate('NoteDetail', { note: note1, onUpdate: loadNotes })
                    }
                    style={[styles.noteLoad, styles.twoColumnItem]}
                >
                    <Text style={styles.title} numberOfLines={2}>{note1.title}</Text>
                    <Text style={styles.desc} numberOfLines={3}>{note1.content}</Text>
                </TouchableOpacity>
                {note2 && (
                    <TouchableOpacity
                        onPress={() =>
                            RootNavigation.navigate('NoteDetail', { note: note2, onUpdate: loadNotes })
                        }
                        style={[styles.noteLoad, styles.twoColumnItem]}
                    >
                        <Text style={styles.title} numberOfLines={2}>{note2.title}</Text>
                        <Text style={styles.desc} numberOfLines={3}>{note2.content}</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={colors.PRIMARY} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {notes.length === 0 ? (
                        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                            <Text style={styles.emptyHeader}>ADD NOTES</Text>
                        </View>
                    ) : (
                        <>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginTop: 5 }}>
                                <TextInput
                                    placeholder="Search Notes..."
                                    value={searchQuery}
                                    onChangeText={text => setSearchQuery(text)}
                                    style={styles.searchBar}
                                />
                                {searchQuery !== '' && (
                                    <TouchableOpacity onPress={handleClearSearch} style={styles.clearIcon}>
                                        <Icons name="cross" />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>

                            {filteredNotes.length === 0 ? (
                                <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                                    <Icons name="notfound" />
                                    <Text style={styles.emptyHeader}>NOT FOUND</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={filteredNotes}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item, index }) => {
                                        if (index % 2 === 0) {
                                            const note1 = item;
                                            const note2 = filteredNotes[index + 1] || null;
                                            return (
                                                <TwoColumnNoteDetail
                                                    note1={note1}
                                                    note2={note2}
                                                />
                                            );
                                        }
                                        return null;
                                    }}
                                    style={{ marginTop: 15 }}
                                />
                            )}
                        </>
                    )}
                    <TouchableOpacity
                        style={styles.plusContainer}
                        onPress={handleAddNote}
                    >
                        <Icons name="plus" />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
        backgroundColor: colors.LIGHT,
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    searchBar: {
        flex: 1,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 18,
        backgroundColor: colors.LPRIMARY,
        color: colors.DARK,
        width: width,
    },
    clearIcon: {
        position: 'absolute',
        right: 25,
    },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Italic',
        opacity: 0.3,
    },
    noteLoad: {
        width: width / 2 - 20,
        padding: 8,
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        borderRadius: 10,
        margin: 5,

    },
    title: {
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: colors.DARK,
    },
    desc: {
        fontSize: 16,
    },
    plusContainer: {
        position: 'absolute',
        right: 10,
        bottom: 15,
        zIndex: 1,
        width: squre / 3.5,
        height: squre / 3.5,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 0,
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    twoColumnItem: {
        flex: 1,
    },
});

export default NoteListScreen;
