/// <reference path="../Typings/react/react.d.ts"/>
/// <reference path="../Typings/react/react-dom.d.ts"/>
/// <reference path="../Typings/redux/redux.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";

import {
  handleState,
  handleTrace,
  getTransportInfo,
  start
} from "./Messages/SignalR";
import { Ago } from "./Components/Ago";
import { agoReducer } from "./AgoReducer";
import {
  pushErrorNotification,
  pushTraceNotification,
  pushDebugNotification,
  updateTransportInfo,
  logout } from "./ActionCreators";
import { IState } from "./Models/IState";
import { IAction } from "./ActionTypes";

const store = Redux.createStore(agoReducer); // TODO: Redux dev tools.

export function dispatch<TAction extends IAction>(action: TAction) {
  store.dispatch(action);
}

const render = () => {
  ReactDOM.render(React.createElement(Ago, store.getState(), null), document.getElementById("Ago"));
};

store.subscribe(render);

window.onerror = (message, filename, lineno, colno, error) => {
  alert(message + "\n" + error);
  pushErrorNotification(message, filename, lineno, colno, error);
}

// TODO: Replace with page visibility API.
window.onblur = (event: FocusEvent) => {
  //logout();
};

async function setup() {
  handleState((oldState, newState) => updateTransportInfo(getTransportInfo()));
  handleTrace(message => pushTraceNotification(message));
  await start();
}

setup();
