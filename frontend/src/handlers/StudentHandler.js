import React from 'react';
import {Form, Table} from 'semantic-ui-react';
import APIHandler from "./APIHandler";


export default class StudentHandler {
    static getStudentRows() {
        APIHandler.getStudents().then(resData => {
            if (resData.status === 200) {
                this.setState({
                    studentTable: (
                        resData.data.map(element =>
                            <Table.Row key={'TableRow' + element.id}>
                                {this.state.checkboxNeeded && (
                                    <Table.Cell collapsing content={<Form.Checkbox/>}/>
                                )}
                                <Table.Cell content={element.title}/>
                                <Table.Cell content={element.id} collapsing/>
                            </Table.Row>
                        )),
                    loading: false
                });
            }
        })
    }
}