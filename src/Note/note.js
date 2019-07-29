import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './note.css';

/*
export default function Note(props) {
    return (
        <div className="Note">
            <h2 className="Note_title">
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>

            <button 
                className="Note_delete" 
                type="button"
            >
                remove
            </button>

            <div className="Note_dates">
                <div className="Note_dates-modified">
                    Modified
                    {' '}
                    <span className="Date">
                        {format(props.modified, 'Do MMM YYYY')}
                    </span>
                </div>
            </div>
        </div>
    );
}
*/

class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => {},
    };

    static contextType = NotefulContext;

    handleClickDelete = e => {
        e.preventDefault();
        const noteId = this.props.id;

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE', 
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
        .then(() => {
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.log({error})
        })
    }

    render() {
        const {name, id, modified} = this.props;
        return (
            <div className="Note">
                <h2 className="Note_title">
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>

                <button 
                    className="Note_delete" 
                    type="button"
                    onClick={this.handleClickDelete}
                >
                    remove
                </button>

                <div className="Note_dates">
                    <div className="Note_dates-modified">
                        Modified
                        {' '}
                        <span className="Date">
                            {format(modified, 'Do MMM YYYY')}
                        </span>
                    </div>
                </div>
            </div>            
        );
    }
}

export default Note;