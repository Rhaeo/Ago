/// <reference path="../Typings/react/react.d.ts"/>
/// <reference path="../Typings/react/react-dom.d.ts"/>
/// <reference path="../Typings/redux/redux.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";

import { $ } from "./Messages/SignalR";
import { Ago } from "./Components/Ago";
import { agoReducer } from "./AgoReducer";
import { pushErrorNotification, pushTraceNotification, pushDebugNotification, replaceItems, logout } from "./ActionCreators";
import { IState } from "./Models/IState";

export const store = Redux.createStore(agoReducer); // TODO: Redux dev tools.

const render = () => {
  ReactDOM.render(React.createElement(Ago, store.getState(), null), document.getElementById("Ago"));
};

store.subscribe(render);

window.onerror = (message, filename, lineno, colno, error) => {
  alert(message + "\n" + error);
  pushErrorNotification(message, filename, lineno, colno, error);
}

window.onblur = (event: FocusEvent) => {
  //logout();
};

const listen = () => {
  $.connection.agoHub.client.trace = (message) => pushTraceNotification(message);
  $.connection.agoHub.client.sync = (items) => replaceItems(items);
};

$(() => {
  listen();
  $.connection.hub.start();
});

