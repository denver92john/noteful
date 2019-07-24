import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/noteListNav';
import NotePageNav from './NotePageNav/notePageNav';
import NoteListMain from './NoteListMain/noteListMain';
import NotePageMain from './NotePageMain/notePageMain';
import dummyStore from './dummy-store';
import {getNotesForFolder, findNote, findFolder} from './notes-helpers';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact path={path}
            key={path}
            render={routeProps => (
              <NoteListNav 
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}

        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />
          }}
        />
      </>
    );
  }

  renderMainRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact path={path}
            key={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                notes,
                folderId
              );
              return (
                <NoteListMain 
                  {...routeProps}
                  notes={notesForFolder}
                />
              );
            }}
          />
        ))}

        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />
          }}
        />
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="App_nav">{this.renderNavRoutes()}</nav>
        <header className="App_header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <main className="App_main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
