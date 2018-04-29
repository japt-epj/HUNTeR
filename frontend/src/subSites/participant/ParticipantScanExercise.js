import React from 'react';
import {Redirect} from 'react-router';

import {Button, Message, Modal} from 'semantic-ui-react';

import APIHandler from '../../handlers/APIHandler';
import QrReader from 'react-qr-reader';


export default class ParticipantScanExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: '',
            displayText: 'Scanne QR-Code ein.',
            exercise: '',
            scanError: false,
            loading: true,
            fireRedirect: false,
            locationPermission: undefined,
            position: {
                latitude: '',
                longitude: ''
            }
        };
    }

    handleScan = data => {
        if (data) {
            APIHandler.getExerciseArray(data, 'exercise').then(resData => {
                if (resData.status === 200) {
                    let exercise = resData.data[0];
                    exercise.answers.forEach(
                        function (element, index, arrayObject) {
                            arrayObject[index] = {text: element, checked: false};
                        }
                    );
                    this.setState({
                        exercise: {
                            id: exercise.id,
                            name: exercise.name,
                            question: exercise.question,
                            answers: exercise.answers,
                        }
                    });
                    this.setState({fireRedirect: true});
                } else {
                    this.setState({scanError: true});
                    this.setState({displayText: 'Ungültige Aufgabe. Bitte scanne einen anderen QR-Code ein.'});
                }
            });
        }
    };

    handleError = err => {
        console.error(err);
    };

    render() {
        return (
            <div>
                {this.state.loading &&
                <Modal open={this.state.loading} closeOnEscape={true} closeOnRootNodeClick={false}
                       onClose={this.state.close}>
                    <Modal.Header>
                        Berechtigungen einfordern
                    </Modal.Header>
                    <Modal.Content>
                        <p>Wir würden gerne deine aktuelle Position bestimmen. Bitte bestätige darum das kommende Popup
                            mit erlauben</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive labelPosition='right' icon='point' content='OK, ich habe verstanden'
                                onClick={() => this.setState({loading: false})}/>
                    </Modal.Actions>
                </Modal>
                }

                {!this.state.loading && <div>
                    {navigator.geolocation.getCurrentPosition(position => this.setState({
                            position: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        }
                    ))}
                    <QrReader delay={this.state.delay} onError={this.handleError} onScan={this.handleScan}/>
                    <Message icon="camera retro" size="mini" header={this.state.displayText}
                             error={this.state.scanError}/>
                </div>
                }

                {this.state.fireRedirect &&
                <Redirect to={{pathname: 'exercise', state: {exercise: this.state.exercise}}}/>
                }
            </div>
        )
    }
}