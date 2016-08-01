define(["require", "exports", "react", "react-dom", "redux", "./Messages/SignalR", "./Components/Ago", "./AgoReducer", "./ActionCreators"], function (require, exports, React, ReactDOM, Redux, SignalR_1, Ago_1, AgoReducer_1, ActionCreators_1) {
    "use strict";
    exports.store = Redux.createStore(AgoReducer_1.agoReducer); // TODO: Redux dev tools.
    const render = () => {
        ReactDOM.render(React.createElement(Ago_1.Ago, exports.store.getState(), null), document.getElementById("Ago"));
    };
    exports.store.subscribe(render);
    window.onerror = (message, filename, lineno, colno, error) => {
        alert(message + "\n" + error);
        ActionCreators_1.pushErrorNotification(message, filename, lineno, colno, error);
    };
    window.onblur = (event) => {
        //logout();
    };
    const listen = () => {
        SignalR_1.$.connection.agoHub.client.trace = (message) => ActionCreators_1.pushTraceNotification(message);
        SignalR_1.$.connection.agoHub.client.sync = (items) => ActionCreators_1.replaceItems(items);
    };
    SignalR_1.$(() => {
        listen();
        SignalR_1.$.connection.hub.start();
    });
});
//# sourceMappingURL=Ago.js.map