import React, {Component} from 'react';
import NotefulContext from '../NotefulContext';
import config from '../config';
import NotefulForm from '../NotefulForm/notefulForm';
import './AddFolder.css';

class AddFolder extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    };

    static contextType = NotefulContext;

    handleSubmit = e => {
        e.preventDefault();
        const newFolder = {
            name: e.target['folder-name'].value
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newFolder),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
                return res.json();
            })
            .then(folder => {
                this.context.addFolder(folder);
                this.props.history.push(`/folder/${folder.id}`);
            })
            .catch(error => {
                console.log({error});
            })
    }

    render() {
        return (
            <section className="AddFolder">
                <h2>Create a folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label htmlFor="folder-name-input">
                            Name
                        </label>
                        <input type="text" id="folder-name-input" name="folder-name" />
                    </div>

                    <div className="buttons">
                        <button type="submit">
                            Add folder
                        </button>
                    </div>
                </NotefulForm>
            </section>
        );
    }
}

export default AddFolder;