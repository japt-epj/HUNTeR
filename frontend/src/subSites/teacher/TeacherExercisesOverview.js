import React from 'react';

import {Button, Form, Modal, Table} from 'semantic-ui-react';

import Data from '../../data/Data';
import ModalHandler from '../../handlers/ModalHandler';
import TableHandler from '../../handlers/TableHandler';


export default class TeacherExercisesOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectmentChange = this.handleSelectmentChange.bind(this);
        this.state = {qrCodeCheckBox: ''};
    }

    handleSelectmentChange = (e, {value}) => this.setState({qrCodeCheckBox: value});

    render() {
        return (
            <Form>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            {TableHandler.getTableHeader(['', 'Titel', 'QR-Code', 'Quote'])}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Data.getExercises().map(element =>
                            <Table.Row key={'tableRow' + element.key}>
                                {TableHandler.getTableCell({
                                    element: (<Form.Radio value={element.qrCodeID}
                                                          checked={this.state.qrCodeCheckBox === element.qrCodeID}
                                                          onChange={this.handleSelectmentChange}/>),
                                    collapsed: true
                                })}
                                {TableHandler.getTableCell({element: element.title, collapsed: false})}
                                {TableHandler.getTableCell({
                                    element: ModalHandler.getQRCode(element),
                                    collapsed: false
                                })}
                                {TableHandler.getTableCell({element: element.score, collapsed: false})}
                            </Table.Row>
                        )}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell colSpan='3'>
                                <Button.Group>
                                    <Button color="green" icon="add square" positive/>
                                    <Button.Or text='/'/>
                                    <Modal size="fullscreen"
                                           trigger={<Button color="red" icon="minus square" negative/>}
                                           closeIcon>
                                        <Modal.Header>{'Aufgaben löschen'}</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                Sicher?
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color="green" icon="delete" label="Ja, Löschen"/>
                                        </Modal.Actions>
                                    </Modal>
                                </Button.Group>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Form>
        );
    }
}