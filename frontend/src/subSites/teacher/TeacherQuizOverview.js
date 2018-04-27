import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Dimmer, Form, Loader, Pagination, Table} from 'semantic-ui-react';
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
            loading: true,
            pageNumber: 1,
            minPage: 1,
            maxPageQuiz: '',
            limit: 5,
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handlePageChangeQuizzes = this.handlePageChangeQuizzes.bind(this);
        this.getQuizzes = this.getQuizzes.bind(this);
    }

    handlePageChangeQuizzes(event, element) {
        this.setState({
            pageNumber: element.activePage
        });
        this.getQuizzes(element.activePage, this.state.limit);
    }

    componentDidMount() {
        this.getQuizzes(this.state.pageNumber, this.state.limit)
    }

    getQuizzes(page, limit) {
        APIHandler.getQuizzes(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    quizzes: resData.data.content,
                    maxPageQuiz: resData.data.totalPages,
                    loading: false
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
                            {TableHandler.getTableHeader(['', 'Name'])}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {!this.state.loading && this.state.quizzes.map(element =>
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
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">
                                <Pagination totalPages={this.state.maxPageQuiz} activePage={this.state.pageNumber}
                                            onPageChange={this.handlePageChangeQuizzes}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <NavLink to={'/teacher/quiz?id=' + this.state.checkBox}><Button basic positive content="Quiz
                    öffnen"/></NavLink>
            </Form>
        );
    }
}