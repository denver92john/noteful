import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/noteListNav';
import NotePageNav from './NotePageNav/notePageNav';
import NoteListMain from './NoteListMain/noteListMain';
import NotePageMain from './NotePageMain/notePageMain';
import config from './config';
import './App.css';
import NotefulContext from './NotefulContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }

  componentDidMount() {
    console.log(`componentDidMount is running`);
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) {
          console.log(`notesRes isn't working`);
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

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }  

  /*
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
  */

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            path={path}
            key={path}
            component={NoteListNav}
          />
        ))}

        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  /*
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
  */

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            path={path}
            key={path}
            component={NoteListMain}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    }

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <nav className="App_nav">{this.renderNavRoutes()}</nav>
          <header className="App_header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App_main">{this.renderMainRoutes()}</main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
