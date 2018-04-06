import React from 'react';

import {Form, Button, Grid} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';


export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state;
        this.setState();
        this.setState({url: '/API/exercise/send'});
        FormHandler.handleSubmit = FormHandler.handleSubmit.bind(this);
        FormHandler.handleChange = FormHandler.handleChange.bind(this);
    };

    render() {
        if (this.state !== null) {
            return (
                <Form onSubmit={FormHandler.handleSubmit}>
                    <Grid.Row>
                        {this.state.exercise.question}
                    </Grid.Row>
                    <Grid.Row>
                        {this.state.exercise.answers.map((element, index) => {
                            return (<Form.Field control="input" type="checkbox"
                                                label={'Antwort ' + (index + 1) + ' : ' + element.answer}
                                                name={'optionCheckbox' + index} onChange={FormHandler.handleChange}
                                                checked={this.state.exercise.answers[index].checked}/>
                            )
                        })}
                    </Grid.Row>
                    <Grid.Row>
                        <Button>Submit</Button>
                    </Grid.Row>
                </Form>
            );
        } else {
            return (<p>Bitte zuerst eine Aufgabe scannen.</p>)
        }
    }
}