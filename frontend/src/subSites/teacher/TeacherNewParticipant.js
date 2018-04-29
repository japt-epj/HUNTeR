import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import APIHandler from '../../handlers/APIHandler';


export default class TeacherNewParticipant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            firstName: '',
            lastName: '',
            email: '',
        };
        this.handleSubmit = FormHandler.handleNewParticipantSubmit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input fluid label="E-Mail" name="email" value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Bitte geben Sie die E-Mail des Schülers ein" required/>
                <Form.Input fluid label="Vorname" name="firstName" value={this.state.firstName}
                            onChange={this.handleChange}
                            placeholder="Bitte geben Sie den Vornamen des Schülers ein" required/>
                <Form.Input fluid label="Nachname" name="lastName" value={this.state.lastName}
                            onChange={this.handleChange}
                            placeholder="Bitte geben Sie den Nachnamen des Schülers ein" required/>
                <Form.Button content="Submit"/>
                {
                    this.state.fireRedirect && (
                        <Redirect to={{pathname: '/', state: {person: this.state}}}/>
                    )
                }
            </Form>
        );
    }
}