import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';

import axios from 'axios';
import QrReader from 'react-qr-reader';


export default class ScanExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: '',
            displayText: 'Scanne',
            iconName: 'camera retro',
            linkLocation: '/scan',
            exerciseContent: ''
        };
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleScan(data) {
        if (data) {
            axios.get('http://' + window.location.hostname + ':8080/api/exercise/' + data)
                .then(response => {
                    let responseObject = response;
                    this.setState({
                        result: data,
                        displayText: 'Starte',
                        iconName: 'right arrow',
                        linkLocation: '/exercise',
                        exerciseContent: {
                            title: responseObject.title,
                            question: responseObject.question,
                            answerOptions: responseObject.answers,
                            explanation: '',
                        }
                    });
                    /*})
                        .catch(err => console.log(err));*/
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
                <NavLink to={{pathname: this.state.linkLocation, state: {exercise: this.state.exerciseContent}}}>
                    <Button content={this.state.displayText + ' Aufgabe ' + this.state.result}
                            icon={this.state.iconName} labelPosition="right"/>
                </NavLink>
            </div>
        )
    }
}