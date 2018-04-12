import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Teacher from './subSites/teacher/TeacherStructure';
import Student from './subSites/student/StudentStructure';

import './index.css';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/teacher" component={Teacher}/>
            <Route path="/student" component={Student}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
