import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/noteListNav';
import NotePageNav from './NotePageNav/notePageNav';
import NoteListMain from './NoteListMain/noteListMain';
import NotePageMain from './NotePageMain/notePageMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import config from './config';
import './App.css';
import NotefulContext from './NotefulContext';
import ErrorBoundary from './ErrorBoundary';

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

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

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
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder,
    }

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <nav className="App_nav">
            <ErrorBoundary>
              {this.renderNavRoutes()}
            </ErrorBoundary>
          </nav>
          <header className="App_header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App_main">
            <ErrorBoundary>
              {this.renderMainRoutes()}
            </ErrorBoundary>
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
