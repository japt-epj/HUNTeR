import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log(process.env);

if (process.env.NODE_ENV === 'development') {
    // set docker as server
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
