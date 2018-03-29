import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Route, HashRouter, Switch} from 'react-router-dom';


import Teacher from './subSites/teacher/Structure';
import Student from './subSites/student/Structure';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/teacher" component={Teacher}/>
            <Route path="/student" component={Student}/>
        </Switch>
    </HashRouter>
    , document.getElementById('root'));
registerServiceWorker();
