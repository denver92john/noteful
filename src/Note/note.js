import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './note.css';

export default function Note(props) {
    return (
        <div className="Note">
            <h2 className="Note_title">
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>

            <button className="Note_delete" type="button">
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