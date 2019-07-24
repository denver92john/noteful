import React from 'react';
import CircleButton from '../CircleButton/circleButton';
import './notePageNav.css';

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