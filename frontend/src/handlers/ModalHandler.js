import React, {Component} from 'react';
import {Button, Icon, Modal, Image} from 'semantic-ui-react';


class ModalHandler extends Component {
    constructor(props) {
        super(props);
    }

    static getQRCodeModal(element) {
        return (
            <Modal size="fullscreen"
                   trigger={<Button basic color="orange" icon="qrcode" size="small"/>}
                   closeIcon>
                <Modal.Header>{'QR-Code für die Aufgabe ' + element.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Image src={'/qrCodes/qrcode-' + element.qrCodeID + '.png'}
                               centered={true}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <a href={'/qrCodes/qrcode-' + element.qrCodeID + '.png'} download>
                        <Button color="orange" inverted>
                            <Icon name="cloud download"/> QR-Code herunterladen
                        </Button>
                    </a>
                </Modal.Actions>
            </Modal>
        );
    }

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

export default ModalHandler