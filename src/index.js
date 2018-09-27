import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import decode from 'jwt-decode';

import App from "./App";
import 'semantic-ui-css/semantic.css';
import rootReducer from './rootReducer';
import { userLoggedIn } from "./actions/auth";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.getItem('bookworm_token')) {
    const payload = decode(localStorage.getItem('bookworm_token'))
    const user = { token: localStorage.getItem('bookworm_token'), email: payload.email, confirmed: payload.confirmed };
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store} >
        <Route component={App} />
    </Provider>
    </BrowserRouter>
    , document.getElementById("root"));
registerServiceWorker();
