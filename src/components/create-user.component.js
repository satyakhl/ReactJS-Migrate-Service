// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';

import LoadingSpinner from "./LoadingSpinner";

export default class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.onChangeFilePath = this.onChangeFilePath.bind(this);
        this.onChangeFindValue = this.onChangeFindValue.bind(this);
        this.onChangeReplaceValue = this.onChangeReplaceValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            filePath: '',
            findValue: '',
            replaceValue: '',
            successMsg: '',
            loading: false

        }

    }

    onChangeFilePath(e) {
        this.setState({ filePath: e.target.value })
    }
    onChangeFindValue(e) {
        this.setState({ findValue: e.target.value })
    }
    onChangeReplaceValue(e) {
        this.setState({ replaceValue: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            filePath: this.state.filePath,
            findValue: this.state.findValue,
            replaceValue: this.state.replaceValue

        };
        const header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Accept', 'application/json');
        header.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Access-Control-Allow-Headers', 'Referer,Accept,Origin,User-Agent,Content-Type');
        this.setState({ loading: true }, () => {
            axios.post('http://localhost:8080/health-check-service/replace/service', userObject)
                .then((res) => {

                    if (res.status == '200') {
                        this.setState({loading: false})
                        this.setState({successMsg: 'Files are successfully Migrated'});
                    }
                    console.log(res.data)
                }).catch((error) => {
                this.setState({loading: false})
                this.setState({successMsg: 'Request failed with status code 500'});
                console.log(error)
            });
        });
        this.setState({ filePath: '', findValue: '', replaceValue: '' })
    }
    render() {
        const {loading } = this.state;
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    {/*<div>
                        <input
                            id="file"
                            type="file"
                            name="selectedFile"
                            onChange={ (event) => this.onChange(event) }
                        /> { /* Updated this to an arrow function
                        <label htmlFor="file">{file}</label>
                    </div>*/ }
                    {/*<div className="form-group">
                        <label>File Path</label>
                        <input type="file" directory="" webkitdirectory="" value={this.state.filePath} onChange={this.onChangeFilePath} className="form-control" />
                    </div>*/}
                    <div className="form-group">
                        <label>Folder/File Location</label>
                        <input type="text" value={this.state.filePath} onChange={this.onChangeFilePath} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Find Value</label>
                        <input type="text" value={this.state.findValue} onChange={this.onChangeFindValue} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Replace Value</label>
                        <input type="text" value={this.state.replaceValue} onChange={this.onChangeReplaceValue} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Migrate" className="btn btn-success btn-block" />
                    </div>
                    <div className="form-group">
                        {loading ? <LoadingSpinner /> : <div results={ this.state.successMsg} />}
                            { this.state.successMsg}

                    </div>
                </form>
            </div>
        )
    }
}
