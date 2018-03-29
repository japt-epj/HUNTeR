import React, {Component} from 'react';
import {Form, Button} from 'semantic-ui-react';
import Data from '../../data/Data';

class Exercise extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let exercise = Data.getExercise("0123456789");
        return (
            <Form>
                <div className="question">
                    {exercise.question}
                </div>
                <div className="answers">
                    <Form.Field label={'Antwort1:' + exercise.answer1} control="input" type="checkbox"/>
                    <Form.Field label={'Antwort2:' + exercise.answer2} control="input" type="checkbox"/>
                    <Form.Field label={'Antwort3:' + exercise.answer3} control="input" type="checkbox"/>
                    <Form.Field label={'Antwort4:' + exercise.answer4} control="input" type="checkbox"/>
                </div>
                <div className="sumbitButton">
                    <Button>Submit</Button>
                </div>
            </Form>
        );
    }
}

export default Exercise