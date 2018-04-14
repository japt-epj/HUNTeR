import React from 'react';
import {Button, Form, Header, Modal} from 'semantic-ui-react';


export default function getSetting() {
    return (
        <div>
            <Form>
                <Form.Input label="Name" type="text" defaultValue={'Andi'} required/>
                <Form.Input label="Name" type="text" defaultValue={'Hörler'} required/>
                <Form.Input label="E-Mail" type="email" defaultValue="andi.hoerler@hsr.ch" required/>
                <Form.Input label="Lehranstalt" type="text" defaultValue={'HSR'} required/>
                <Form.Input label="Neues Passwort" type="password"/>
                <Form.Input label="Neues Passwort erneut eingeben" type="password"/>

                <Modal style={{marginTop: 0}} size="fullscreen" trigger={<Form.Button>Daten ändern</Form.Button>}
                       closeIcon>
                    <Header icon="key" content="Daten ändern?"/>
                    <Modal.Content>
                        Daten wirklich ändern
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" inverted content="Nein" icon="cancel"/>
                        <Button color="green" inverted content="Ja" icon="checkmark"/>
                    </Modal.Actions>
                </Modal>
            </Form>
        </div>
    );
}