import React from 'react';

import {Button, Modal} from 'semantic-ui-react';


export default {
    getAgreement() {
        return (
            <Modal open={this.state.showAgreement} closeOnEscape closeOnRootNodeClick={false}>
                <Modal.Header>
                    Berechtigungen einfordern
                </Modal.Header>
                <Modal.Content>
                    <p>Wir würden gerne deine aktuelle Position bestimmen. Bitte bestätige darum das kommende Popup
                        mit erlauben</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive labelPosition='right' icon='point' content='OK, ich habe verstanden'
                            onClick={() => this.setState({showAgreement: false})}/>
                </Modal.Actions>
            </Modal>
        )
    }
}