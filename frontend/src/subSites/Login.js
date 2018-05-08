import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import {Form, Grid} from 'semantic-ui-react';

import StructureHandler from '../handlers/StructureHandler';
import FormHandler from '../handlers/FormHandler';
import APIHandler from '../handlers/APIHandler';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fireRedirect: window.localStorage.getItem('HUNTeR-Redirect') !== null
        };
        this.handleSubmit = FormHandler.handleLoginSubmit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postLoginData = APIHandler.postLoginData.bind(this);
        this.getRedirect = APIHandler.getRedirect.bind(this);
        this.getJSONHeader = APIHandler.getJSONHeader;
    }

    render() {
        return (
            <div>
                <Grid className="siteGrid" padded>
                    {StructureHandler.getLoginHeader()}
                    <Grid.Row className="gridContent" columns="equal">
                        <Grid.Column/>
                        <Grid.Column width={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input label="E-Mail-Adresse" type="email" name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange} required/>
                                <Form.Input label="Passwort" type="password" name="password" value={this.state.password}
                                            onChange={this.handleChange} required/>
                                <Form.Button content="Submit"/>
                            </Form>
                            <NavLink to={'/participant'}>Participant</NavLink>
                            <NavLink to={'/teacher'}>Teacher</NavLink>
                        </Grid.Column>
                        <Grid.Column/>
                    </Grid.Row>
                </Grid>
                {
                    this.state.fireRedirect && <Redirect to={window.localStorage.getItem('HUNTeR-Redirect')}/>
                }
            </div>
        )
    }
}