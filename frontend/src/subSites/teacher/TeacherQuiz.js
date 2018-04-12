import Data from "../../data/Data";
import ModalHandler from "../../handlers/ModalHandler";
import TableHandler from "../../handlers/TableHandler";
import Modal from "semantic-ui-react/dist/es/modules/Modal/Modal";


export default function getQuiz() {
    return (
        <Form>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Input fluid label="Titel" placeholder="Bitte geben Sie einen Titel ein"/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Modal size="fullscreen"
                            trigger={<Button>Benutzer hinzufügen</Button>}
                               closeIcon>
                            <Modal.Content>
                                <Modal.Description>
                                    <Table>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan="4">Aufgaben im Quiz:</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {Data.getStudents().map((element, index) =>
                                                <Table.Row key={'TableRow' + index}>
                                                    <grid>
                                                    {TableHandler.getTableCell({
                                                        element: (<Form.Field control="input"
                                                                              type="checkbox"/>), collapsed: true
                                                    })}
                                                    {TableHandler.getTableCell({
                                                        element: (<Segment>{element.email}</Segment>), collapsed: false
                                                    })}
                                                    </grid>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="green" icon="add" label="Hinzufügen"/>
                            </Modal.Actions>
                        </Modal>
                        <Modal size="fullscreen"
                               trigger={<Button>Aufgaben hinzufügen</Button>}
                               closeIcon>
                            <Modal.Header>{'Aufgaben hinzufügen'}</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Table>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan="4">Aufgaben im Quiz:</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {Data.getExercises().map((element, index) =>
                                                <Table.Row key={'TableRow' + index}>
                                                    {TableHandler.getTableCell({
                                                        element: (<Form.Field control="input"
                                                                              type="checkbox"/>), collapsed: true
                                                    })}
                                                    {TableHandler.getTableCell({
                                                        element: (<Segment>{element.title}</Segment>), collapsed: false
                                                    })}
                                                    {TableHandler.getTableCell({
                                                        element: (
                                                            <NavLink to={'/exercise?id=' + element.key}>
                                                                <Button basic icon="edit" color="green"/></NavLink>),
                                                        collapsed: true
                                                    })}
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="green" icon="add" label="Hinzufügen"/>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Button>Submit</Form.Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    );
}