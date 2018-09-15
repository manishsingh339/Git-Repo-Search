import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';

import registerServiceWorker from './registerServiceWorker';
import rootReducers from './reducers';
import App from './components/App'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);


ReactDOM.render(
    <Provider store="createStoreWithMiddleware(rootReducers)">
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
