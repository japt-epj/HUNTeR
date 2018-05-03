import React from 'react';

import {Button, Modal} from 'semantic-ui-react';


export default {
    getAgreement() {
        return (
            <Modal open={this.state.showAgreement} closeOnEscape closeOnRootNodeClick={false}>
                <Modal.Header content="Berechtigungen einfordern"/>
                <Modal.Content
                    content="Wir würden gerne deine aktuelle Position bestimmen. Bitte bestätige darum das kommende Popup mit erlauben"/>
                <Modal.Actions>
                    <Button
                        positive
                        labelPosition='right'
                        icon='point'
                        content='OK, ich habe verstanden'
                        onClick={() => this.setState({showAgreement: false})}
                    />
                </Modal.Actions>
            </Modal>
        )
    },

    getFormError(errorText) {
        return (
            <Modal open>
                <Modal.Header content="Formular wurde noch nicht richtig ausgefüllt"/>
                <Modal.Content
                    content={errorText}/>
                <Modal.Actions>
                    <Button
                        positive
                        labelPosition='right'
                        icon='pencil'
                        content='OK, ich habe verstanden'
                        onClick={() => this.setState({formOK: true})}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}