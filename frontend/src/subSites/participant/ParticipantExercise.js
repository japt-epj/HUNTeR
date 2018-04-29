import React from 'react';
import {Redirect} from 'react-router';
import {NavLink} from 'react-router-dom';

import {Form, Grid, Header, Message} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import APIHandler from '../../handlers/APIHandler';


export default class ParticipantExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.exercise.id,
            name: this.props.location.state.exercise.name,
            question: this.props.location.state.exercise.question,
            checked0: false,
            answer0: this.props.location.state.exercise.answers[0].text,
            checked1: false,
            answer1: this.props.location.state.exercise.answers[1].text,
            checked2: false,
            answer2: this.props.location.state.exercise.answers[2].text,
            checked3: false,
            answer3: this.props.location.state.exercise.answers[3].text,
            fireRedirect: false
        };
        this.handleSubmit = FormHandler.handleExerciseSubmit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
    };

    render() {
        if (this.state !== null) {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Grid.Row>
                        <Header content={this.state.name}/>
                        {this.state.question}
                    </Grid.Row>
                    <Grid.Row>
                        {new Array(4).fill().map((element, index) => {
                            return (<Form.Field control="input" type="checkbox"
                                                label={'Antwort ' + (index + 1) + ' : ' + this.state['answer' + index]}
                                                name={'checked' + index} onChange={this.handleChange}
                                                checked={this.state['checked' + index]}/>
                            )
                        })}
                    </Grid.Row>
                    <Grid.Row>
                        <Form.Button content="Submit"/>
                    </Grid.Row>
                    {this.state.fireRedirect && (<Redirect to="/"/>)}
                </Form>
            );
        } else {
            return (
                <NavLink to="/scan">
                    <Message icon="camera retro" size="mini"
                             header="Bitte zuerst eine Aufgabe mit der Scan Funktion scannen." error/>
                </NavLink>
            );
        }
    }
}