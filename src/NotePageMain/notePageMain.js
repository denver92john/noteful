import React from 'react';
import Note from '../Note/note';
import './notePageMain.css';

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