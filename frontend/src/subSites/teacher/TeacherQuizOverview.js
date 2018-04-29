import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Dimmer, Form, Loader} from 'semantic-ui-react';
import QuizHandler from '../../handlers/QuizHandler';
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
            loadingQuiz: true,
            pageNumber: 1,
            minPage: 1,
            maxPageQuiz: '',
            limit: 5,
        };
        this.getQuizTable = QuizHandler.getQuizTable.bind(this);
    }

    componentDidMount() {
        this.getQuizzes(this.state.pageNumber, this.state.limit);
    }

    handlePageChangeQuizzes = (event, element) => {
        this.setState({
            pageNumber: element.activePage
        });
        this.getQuizzes(element.activePage, this.state.limit);
    };

    getQuizzes = (page, limit) => {
        APIHandler.getQuizzes(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    quizzes: resData.data.content,
                    maxPageQuiz: resData.data.totalPages,
                    loadingQuiz: false
                })
            }
        });
    };

    handleSelectChange = (event, {value}) => this.setState({checkBox: value});

    render() {
        return (
            <Form>
                {this.state.loadingQuiz && this.state.loadingScreen}
                {!this.state.loadingQuiz && this.getQuizTable(false)}
                <NavLink to={'/quiz'}>
                    <Button basic positive content="Neues Quiz eröffnen"/>
                </NavLink>
            </Form>
        );
    }
}