import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/note';
import CircleButton from '../CircleButton/circleButton';
import NotefulContext from '../NotefulContext';
import {getNotesForFolder} from '../notes-helpers';
import PropTypes from 'prop-types';
import './noteListMain.css';

/*
export default function NoteListMain(props) {
    return (
        <section className="NoteListMain">
            <ul>
                {props.notes.map(note => 
                    <li key={note.id}>
                        <Note 
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                        />
                    </li>
                )}
            </ul>

            <div className="NoteListMain_button-container">
                <CircleButton 
                    tag={Link}
                    to='/add-note'
                    type="button"
                    className="NoteListMain_add-note-button"
                >
                    Note
                </CircleButton>
            </div>
        </section>
    );
}

NoteListMain.defaultProps = {
    notes: []
}
*/

export default class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        },
        notes: []
    }

    static contextType = NotefulContext;

    render() {
        const {folderId} = this.props.match.params;
        //console.log(folderId);
        const {notes} = this.context;
        //console.log(notes);
        const notesForFolder = getNotesForFolder(notes, folderId);
        //console.log(getNotesForFolder(notes, 1));
        return (
            <section className="NoteListMain">
                <ul>
                    {notesForFolder.map(note => (
                        <li key={note.id}>
                            <Note 
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    ))}
                </ul>
                <div className="NoteListMain_button-container">
                    <CircleButton 
                        tag={Link}
                        to="/add-note"
                        type="button"
                        className="NoteListMain_add-note-button"
                    >
                        Note
                    </CircleButton>
                </div>
            </section>
        );
    }
}

NoteListMain.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired
    })),
    notes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        folderId: PropTypes.number,
        id: PropTypes.number,
        modified: PropTypes.string,
        name: PropTypes.string.isRequired
    }))
};