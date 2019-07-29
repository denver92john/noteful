import React from 'react';
import CircleButton from '../CircleButton/circleButton';
import NotefulContext from '../NotefulContext';
import {findNote, findFolder} from '../notes-helpers';
import './notePageNav.css';

/*
export default function NotePageNav(props) {
    return (
        <div className="NotePageNav">
            <CircleButton
                tag="button"
                role="link"
                onClick={() => props.history.goBack()}
                className="NotePageNav_back-button"
            >
                Back
            </CircleButton>
            {props.folder && (
                <h3 className="NotePageNav_folder-name">
                    {props.folder.name}
                </h3>
            )}
        </div>
    );
}

NotePageNav.defaultProps = {
    history: {
        goBack: () => {}
    }
}
*/

export default class NotePageNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext;

    render() {
        const {notes, folders} = this.context;
        const {noteId} = this.props.match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);
        return (
            <div className="NotePageNav">
                <CircleButton 
                    tag="button"
                    role="link"
                    onClick={() => this.props.history.goBack()}
                    className="NotePageNav_back-button"
                >
                    Back
                </CircleButton>
                {folder && (
                    <h3 className="NotePageNav_folder-name">
                        {folder.name}
                    </h3>
                )}
            </div>
        );
    }
}