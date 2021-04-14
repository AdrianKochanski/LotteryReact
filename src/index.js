import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './components/App';
import reducers from './reducers/index';

const store = createStore(
    reducers,
    {
        lottery: {
            manager: '',
            players: [],
            balance: 0,
            transactionFinished: true
        }
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);