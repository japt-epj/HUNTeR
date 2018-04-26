import React from 'react';

import {Button, Icon, Modal} from 'semantic-ui-react';


export default class ModalHandler {
    static getDeleteModal(element) {
        return (
            <Modal size="fullscreen"
                   trigger={<Button basic negative content={element.buttonContent} icon="delete"/>}
                   closeIcon>
                <Modal.Header>element.title</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        element.description
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative icon="cancel" content="Nicht löschen"/>
                    <Button positive icon="checkmark" content="Löschen"/>
                </Modal.Actions>
            </Modal>
        );
    }
}