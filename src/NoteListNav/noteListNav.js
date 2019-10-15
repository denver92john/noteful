import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import CircleButton from '../CircleButton/circleButton';
import NotefulContext from '../NotefulContext';
import { countNotesForFolder } from '../notes-helpers';
import PropTypes from 'prop-types';
import './noteListNav.css';

export default class NoteListNav extends React.Component {
    static contextType = NotefulContext;

    render() {
        const {folders, notes} = this.context;
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

NoteListNav.defaultProps = {
    folders: [],
    notes: [],
};

NoteListNav.propTypes = {
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