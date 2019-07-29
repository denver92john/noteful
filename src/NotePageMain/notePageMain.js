import React from 'react';
import Note from '../Note/note';
import NotefulContext from '../NotefulContext';
import {findNote} from '../notes-helpers';
import './notePageMain.css';

/*
export default function NotePageMain(props) {
    return (
        <section className="NotePageMain">
            <Note 
                id={props.note.name}
                name={props.note.name}
                modified={props.note.modified}
            />

            <div className="NotePageMain_content">
                {props.note.content.split(/\n \r|\n/).map((para, i) =>
                    <p key={i}>{para}</p>
                )}
            </div>
        </section>
    );
}

NotePageMain.defaultProps = {
    note: {
        content: ''
    }
}
*/

export default class NotePageMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;

    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const {notes=[]} = this.context;
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