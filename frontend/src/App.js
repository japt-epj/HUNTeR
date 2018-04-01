import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import logo from './logo.svg';
import './App.css';
import config from './config/config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            random: null
        };
    }

    componentDidMount() {
        fetch(config.baseurl + "test").then(response => {
            return response.json();
        }).then(data => this.setState(data));

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    Running against <code>{config.baseurl}</code>.
                </p>
                <p>
                    API Test: {this.state.random}
                </p>
                {/*<a href="/teacher">Teacher</a>*/}
                {/*<a href="/student">Student</a>*/}
                <Link to={"/teacher"}>Teacher</Link>
                <Link to={"/student"}>Student</Link>
            </div>

        );
    }
}

export default App;