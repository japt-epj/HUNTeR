import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './style/index.css';

import registerServiceWorker from './registerServiceWorker';
import Login from './subSites/Login';
import Teacher from './subSites/teacher/TeacherStructure';
import Student from './subSites/student/StudentStructure';


ReactDOM.render(
    <BrowserRouter basename="/">
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/teacher" component={Teacher}/>
            <Route path="/student" component={Student}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
