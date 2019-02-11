import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <App />
    </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
