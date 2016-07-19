define(["require", "exports", "react", "react-dom", "redux", "./Messages/SignalR", "./Components/Ago", "./Reducers/AgoReducer", "./Actions/ActionCreators"], function (require, exports, React, ReactDOM, Redux, SignalR_1, Ago_1, AgoReducer_1, ActionCreators_1) {
    "use strict";
    var initialState = {
        passphrase: "",
        items: [],
        notifications: [],
        newDraft: "",
        aboveDrafts: {},
        belowDrafts: {},
        selectedItemId: null,
    };
    exports.store = Redux.createStore(AgoReducer_1.agoReducer, initialState);
    var render = function () {
        ReactDOM.render(React.createElement(Ago_1.Ago, exports.store.getState(), null), document.getElementById("Ago"));
    };
    exports.store.subscribe(render);
    window.onerror = function (message, filename, lineno, colno, error) {
        alert(message + "\n" + error);
        ActionCreators_1.pushErrorNotification(message, filename, lineno, colno, error);
    };
    ActionCreators_1.setPassphrase(prompt("Passphrase:"));
    var listen = function () {
        SignalR_1.$.connection.agoHub.client.trace = function (message) { return ActionCreators_1.pushTraceNotification(message); };
        SignalR_1.$.connection.agoHub.client.pong = function (payload) { return ActionCreators_1.pushTraceNotification("PONG invoked on server " + payload); };
        SignalR_1.$.connection.agoHub.client.sync = function (items) { return ActionCreators_1.replaceItems(items); };
    };
    SignalR_1.$(function () {
        listen();
        SignalR_1.$.connection.hub.start().done(function () {
            ActionCreators_1.pushDebugNotification("SignalR OK.");
            SignalR_1.$.connection.agoHub.server.ping(Math.random())
                .done(function (payload) { return ActionCreators_1.pushDebugNotification("PING succeeded " + JSON.stringify(payload)); })
                .fail(function (error) { return ActionCreators_1.pushErrorNotification("PING succeeded " + JSON.stringify(error)); });
            ActionCreators_1.pushDebugNotification("PING invoked on client");
        });
    });
});
//# sourceMappingURL=Ago.js.map