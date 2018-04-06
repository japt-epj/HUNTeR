import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';

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
            exercise: ''
        };
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleScan(data) {
        if (data) {
            let portAPI = window.location.port === '3000' ? ':8080' : '';
            fetch(window.location.protocol + '//' + window.location.hostname + portAPI + '/api/exercise/' + data, {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json",
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                    return response.json();
                }
            ).then(responseData => {
                responseData.answers.forEach(function (element, index, arrayObject) {
                    arrayObject[index] = {answer: element, isCorrect: false};
                });
                this.setState({
                    result: data,
                    displayText: 'Starte',
                    iconName: 'right arrow',
                    linkLocation: '/exercise',
                    exercise: {
                        exerciseID: responseData.id,
                        title: responseData.title,
                        question: responseData.question,
                        answers: responseData.answers,
                    }
                })
                ;
            }).catch(err => {
                console.log("fetch error" + err);
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
                <NavLink to={{pathname: this.state.linkLocation, state: {exercise: this.state.exercise}}}>
                    <Button content={this.state.displayText + ' Aufgabe ' + this.state.result}
                            icon={this.state.iconName} labelPosition="right"/>
                </NavLink>
            </div>
        )
    }
}