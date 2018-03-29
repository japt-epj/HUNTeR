import React, {Component} from 'react';
import QrReader from 'react-qr-reader';
import {Button} from 'semantic-ui-react';


class ScanExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: '',
            displayText: 'Scanne'
        };
        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {
        if (data) {
            this.setState({
                result: data,
                displayText: 'Starte',
            });
        }
    }

    handleError(err) {
        console.error(err)
    }

    createStartButton() {
        let returnLines = [];
        returnLines.push(<Button content={this.state.displayText + ' Aufgabe ' + this.state.result} icon="right arrow"
                                 labelPosition="right"/>);
        return returnLines;
    }

    render() {
        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{width: '100%'}}
                />
                {this.createStartButton()}
            </div>
        )
    }
}

export default ScanExercise;