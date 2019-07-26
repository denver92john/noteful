import React from 'react';

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    addNote: () => {},
    addFolder: () => {},
    deleteNote: () => {},
});

export default NotefulContext;