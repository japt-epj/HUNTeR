import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Dimmer, Form, Loader, Table} from 'semantic-ui-react';
import ModalHandler from '../../handlers/ModalHandler';
import TableHandler from '../../handlers/TableHandler';
import APIHandler from "../../handlers/APIHandler";


export default class TeacherQuizOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBox: '',
            quizzes: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loadingQuizzes: true,
            pageNumber: 1,
            minPage: 1,
            maxPageQuiz: '',
            limit: 5,
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handlePageChange(event, element) {
        this.setState({
            pageNumber: element.index,

        });
        APIHandler.getQuizzes(this.state.pageNumber, this.state.limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    quizzes: resData.data,
                    maxPageQuizzes: resData.data.totalPages,
                    loadingQuizzes: false
                })
            }
        });
    }

    componentDidMount() {
        APIHandler.getQuizzes(this.state.pageNumber, this.state.limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    quizzes: resData.data,
                    maxPageQuizzes: resData.data.totalPages,
                    loadingQuizzes: false
                })
            }
        });
    }

    handleSelectChange = (e, {value}) => this.setState({checkBox: value});

    render() {
        return (
            <Form>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            {TableHandler.getTableHeader(['Name'])}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {!this.state.loadingQuizzes && this.state.quizzes.map(element =>
                            <Table.Row key={'row' + element.name}>
                                <Table.Cell>
                                    <Form.Radio value={element.name}
                                                checked={this.state.checkBox === element.name}
                                                onChange={this.handleSelectChange}/>
                                </Table.Cell>
                                <Table.Cell>
                                    {element.name}
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <NavLink to={'/teacher/quiz?id=' + this.state.checkBox}><Button basic positive content="Quiz
                    öffnen"/></NavLink>
            </Form>
        );
    }
}