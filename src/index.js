import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { userLoggedIn } from "./actions/auth";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.getItem('bookworm_token')) {
    const user = { token: localStorage.getItem('bookworm_token') };
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
