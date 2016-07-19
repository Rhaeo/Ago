/// <reference path="../Typings/react/react.d.ts"/>
/// <reference path="../Typings/react/react-dom.d.ts"/>
/// <reference path="../Typings/redux/redux.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";

import { $ } from "./Messages/SignalR";
import { IAgoProps, Ago } from "./Components/Ago";
import { agoReducer } from "./Reducers/AgoReducer";
import { pushErrorNotification, pushTraceNotification, pushDebugNotification, replaceItems, logout } from "./Actions/ActionCreators";

const initialState: IAgoProps = {
    passphrase: "",
    items: [],
    notifications: [],
    newDraft: "",
    aboveDrafts: { },
    belowDrafts: {},
    selectedItemId: null,
    isLoggedIn: false
};

export const store = Redux.createStore(agoReducer, initialState);

const render = () => {
    ReactDOM.render(React.createElement(Ago, store.getState(), null), document.getElementById("Ago"));
};

store.subscribe(render);

window.onerror = (message, filename, lineno, colno, error) => {
    alert(message + "\n" + error);
    pushErrorNotification(message, filename, lineno, colno, error);
}

window.onblur = (event: FocusEvent) => {
  logout();
};

const listen = () => {
    $.connection.agoHub.client.trace = (message) => pushTraceNotification(message);

    $.connection.agoHub.client.pong = (payload) => pushTraceNotification(`PONG invoked on server ${payload}`);

    $.connection.agoHub.client.sync = (items) => replaceItems(items);
};

$(() => {
    listen();
    $.connection.hub.start().done(() => {
        pushDebugNotification("SignalR OK.");
        $.connection.agoHub.server.ping(Math.random())
            .done(payload => pushDebugNotification(`PING succeeded ${JSON.stringify(payload)}`))
            .fail(error => pushErrorNotification(`PING succeeded ${JSON.stringify(error)}`));
        pushDebugNotification("PING invoked on client");
    });
});
