import React from 'react';
//import {Redirect} from 'react-router';

import {Message} from 'semantic-ui-react';

import APIHandler from '../../handlers/APIHandler';
import QrReader from 'react-qr-reader';


export default class StudentScanExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: '',
            displayText: 'Scanne QR-Code ein.',
            exercise: '',
            scanError: false,
            fireRedirect: false
        };
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleScan(data) {
        if (data) {
            APIHandler.getExerciseData(data, 'exercise').then(resData => {
                if (resData.id !== undefined) {
                    resData.answers.forEach(
                        function (element, index, arrayObject) {
                            arrayObject[index] = {text: element, checked: false};
                        }
                    );
                    this.setState({
                        exercise: {
                            exerciseID: resData.id,
                            title: resData.title,
                            question: resData.question,
                            answers: resData.answers,
                        }
                    });
                    this.setState({fireRedirect: true});
                } else {
                    this.setState({scanError: true});
                    this.setState({displayText: 'Ungültige Aufgabe. Bitte scanne einen anderen QR-Code ein.'});
                }
            });
        }
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        return (
            <div>
                <QrReader delay={this.state.delay} onError={this.handleError} onScan={this.handleScan}/>
                <Message
                    icon='camera retro' size="mini"
                    header={this.state.displayText}
                    error={this.state.scanError}/>
                {this.state.fireRedirect /* && (
                    <Redirect to={{pathname: 'exercise', state: {exercise: this.state.exercise}}}/>
                )*/}
            </div>
        )
    }
}