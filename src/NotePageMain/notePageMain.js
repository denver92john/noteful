import React from 'react';
import Note from '../Note/note';
import NotefulContext from '../NotefulContext';
import {findNote} from '../notes-helpers';
import PropTypes from 'prop-types';
import './notePageMain.css';

export default class NotePageMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        },
        notes: []
    }

    static contextType = NotefulContext;

    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const {notes} = this.context;
        const {noteId} = this.props.match.params;
        const note = findNote(notes, noteId) || {context: ''}

        return (
            <section className="NotePageMain">
                <Note 
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className="NotePageMain_content">
                    {note.content.split(/\n \r|\n/).map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </section>
        );
    }
}

NotePageMain.propTypes = {
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