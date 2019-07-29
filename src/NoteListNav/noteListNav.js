import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import CircleButton from '../CircleButton/circleButton';
import NotefulContext from '../NotefulContext';
import { countNotesForFolder } from '../notes-helpers';
import './noteListNav.css';

/*
export default function NoteListNav(props) {
    return (
        <div className="NoteListNav">
            <ul className="NoteListNav_list">
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className="NoteListNav_folder-link"
                            to={`/folder/${folder.id}`}
                        >
                            <span className="NoteListNav_num-notes">
                                {countNotesForFolder(props.notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>

            <div className="NoteListNav_button-wrapper">
                <CircleButton
                    tag={Link}
                    to='/add-folder'
                    type="button"
                    className="NoteListNav_add-folder-button"
                >
                    Folder
                </CircleButton>
            </div>
        </div>
    );
}

NoteListNav.defaultProps = {
    folders: []
}
*/

export default class NoteListNav extends React.Component {
    static contextType = NotefulContext;

    render() {
        const {folders=[], notes=[]} = this.context;
        return (
            <div className="NoteListNav">
                <ul className="NoteListNav_list">
                    {folders.map(folder =>(
                        <li key={folder.id}>
                            <NavLink 
                                className="NoteListNav_folder-link"
                                to={`/folder/${folder.id}`}
                            >
                                <span className="NoteListNav_num-notes">
                                    {countNotesForFolder(notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="NoteListNav_button-wrapper">
                    <CircleButton 
                        tag={Link}
                        to="/add-folder"
                        type="button"
                        className="NoteListNav_add-folder-button"
                    >
                        Folder
                    </CircleButton>
                </div>
            </div>
        );
    }
}