import React from 'react';

import {Button, Icon, Modal} from 'semantic-ui-react';


export default class ModalHandler {
    static getDeleteModal(element) {
        return (
            <Modal size="fullscreen"
                   trigger={<Button basic negative content={element.buttonContent} icon="delete" size="small"/>}
                   closeIcon>
                <Modal.Header>element.title</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        element.description
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>
                        <Icon name='cancel'/> Nicht löschen
                    </Button>
                    <Button color='green'>
                        <Icon name='checkmark'/> Löschen
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}