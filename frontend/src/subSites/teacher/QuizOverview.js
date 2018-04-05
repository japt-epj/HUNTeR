import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Form, Table} from 'semantic-ui-react';

import Data from '../../data/Data';
import ModalHandler from "../../handlers/ModalHandler";
import TableHandler from "../../handlers/TableHandler";


export default class QuizOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {checkBox: ''};
    }

    handleSelectChange = (e, {value}) => this.setState({checkBox: value});

    render() {
        return (
            <Form>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            {TableHandler.getTableHeader(['', 'Titel', 'Quote'])}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Data.getQuizzes().map(element =>
                            <Table.Row key={'row' + element.key}>
                                {TableHandler.getTableCell({
                                    element: (<Form.Radio value={element.key}
                                                          checked={this.state.checkBox === element.key}
                                                          onChange={this.handleSelectChange}/>),
                                    collapsed: true
                                })}
                                {TableHandler.getTableCell({element: element.title, collapsed: false})}
                                {TableHandler.getTableCell({element: element.score, collapsed: false})}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                {ModalHandler.getDeleteModal({
                    buttonContent: 'Quiz löschen',
                    title: /*Data.getQuiz(this.state.checkBox).text +*/' löschen',
                    description: 'Hallo'
                })}
                <NavLink to={'/teacher/quiz?id=' + this.state.checkBox}><Button basic positive>Quiz
                    öffnen</Button></NavLink>
            </Form>
        );
    }
}