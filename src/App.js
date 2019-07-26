import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/noteListNav';
import NotePageNav from './NotePageNav/notePageNav';
import NoteListMain from './NoteListMain/noteListMain';
import NotePageMain from './NotePageMain/notePageMain';
import config from './config';
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
    //setTimeout(() => this.setState(dummyStore), 600);
    console.log(`componentDidMount is running`);
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        console.log(`first then statement runs`);
        if (!notesRes.ok) {
          console.log(`notesRes isn't working`);
          //throw new Error(notesRes.statusText);
          return notesRes.json().then(e => Promise.reject(e));
        }
        if (!foldersRes.ok) {
          console.log(`foldersRes isn't working`);
          //throw new Error(foldersRes.statusText);
          return foldersRes.json().then(e => Promise.reject(e));
        }
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.log(`error is: ${error}`);
      });
    
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
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,

    }
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
