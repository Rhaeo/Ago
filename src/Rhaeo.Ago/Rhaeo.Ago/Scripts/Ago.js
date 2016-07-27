define(["require", "exports", "react", "react-dom", "redux", "./Messages/SignalR", "./Components/Ago", "./AgoReducer", "./ActionCreators"], function (require, exports, React, ReactDOM, Redux, SignalR_1, Ago_1, AgoReducer_1, ActionCreators_1) {
    "use strict";
    // TODO: Replace with optional values on the reducer.
    var initialState = {
        passphrase: "",
        items: [],
        notifications: [],
        newDraft: "",
        aboveDrafts: {},
        belowDrafts: {},
        cleartexts: {},
        selectedItemId: null,
        isLoggedIn: false,
        selectedTab: "Tasks"
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
    window.onblur = function (event) {
        //logout();
    };
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
    exports.worker = new Worker("/Scripts/Workers/AgoWorker.js");
    exports.worker.onmessage = function (message) {
        switch (message.data.type) {
            case "CreateNewTaskEncryptStart":
                {
                    // TODO: Spinner.
                    break;
                }
            case "CreateNewTaskEncryptEnd":
                {
                    ActionCreators_1.saveEncryptedItem(message.data.cyphertext, message.data.salt, message.data.iv);
                    break;
                }
            case "ReplaceItemDecryptStart":
                {
                    // TODO: Spinner in state.cleartexts[isInProgress/value].
                    break;
                }
            case "ReplaceItemDecryptEnd":
                {
                    ActionCreators_1.cacheDecryptedText(message.data.id, message.data.cleartext);
                    break;
                }
            default:
                {
                    throw new Error("Unknown message type " + message.data.type + ". " + JSON.stringify(message.data));
                }
        }
    };
    exports.worker.onerror = function (error) { return ActionCreators_1.pushErrorNotification("Worker error " + error.type); };
});
//# sourceMappingURL=Ago.js.map