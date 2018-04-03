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
            /*axios.get('/API/exercise', {
                    params: {
                        ID: data,
                        check: true
                    }
                }
            ).then(response => {*/
            this.setState({
                result: data,
                displayText: 'Starte',
                iconName: 'right arrow',
                linkLocation: '/exercise',
                exerciseContent: {
                    title: 'IPv4',
                    question: 'Was ist ein privater IPv4 Range für Firmen',
                    answerOptions: [
                        {text: '10.0.0.0/8', correct: false},
                        {text: '127.0.0.1', correct: false},
                        {text: '172.16.0.0/12', correct: false},
                        {text: '192.168.0.0/16', correct: false}
                    ],
                    explanation: 'Siehe RFC 1918',
                }
            });
            /*})
                .catch(err => console.log(err));*/
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