import React, {Component} from 'react';
import {Button, Modal, Header, Form, Icon} from 'semantic-ui-react';


class Setting extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Input label="Name" type="text" defaultValue={'Andi'}/>
                    <Form.Input label="Name" type="text" defaultValue={'Hörler'}/>
                    <Form.Input label="E-Mail" type="email" defaultValue='andi.hoerler@hsr.ch'/>
                    <Form.Input label="Lehranstalt" type="text" defaultValue={'HSR'}/>
                    <Form.Input label="Neues Passwort" type="password"/>
                    <Form.Input label="Neues Passwort erneut eingeben" type="password"/>
                </Form>
                <Modal style={{marginTop: 0}} size="fullscreen" trigger={<Form.Button>Daten ändern</Form.Button>}
                       closeIcon>
                    <Header icon="key" content="Daten ändern?"/>
                    <Modal.Content>
                        Daten wirklich ändern
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" inverted>
                            <Icon name="cancel"/> Nein
                        </Button>
                        <Button color="green" inverted>
                            <Icon name="checkmark"/> Ja
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Setting;