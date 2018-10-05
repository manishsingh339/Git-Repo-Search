import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';

import registerServiceWorker from './registerServiceWorker';
import rootReducers from './reducers';
import App from './components/App'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'font-awesome/css/font-awesome.min.css';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducers)}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
