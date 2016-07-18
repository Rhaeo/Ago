define(["require", "exports", "./../Ago"], function (require, exports, Ago_1) {
    "use strict";
    exports.changeComposerText = function (text) {
        var action = {
            type: 4 /* ChangeComposerText */,
            payload: {
                text: text
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.createNewTask = function (text) {
        var action = {
            type: 0 /* CreateNewTask */,
            payload: {
                text: text
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.pushErrorNotification = function (message, filename, lineno, colno, error) {
        var action = {
            type: 1 /* PushErrorNotification */,
            payload: {
                message: message,
                filename: filename,
                lineno: lineno,
                colno: colno,
                error: error
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.pushTraceNotification = function (message) {
        var action = {
            type: 3 /* PushTraceNotification */,
            payload: {
                message: message
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.pushDebugNotification = function (message) {
        var action = {
            type: 9 /* PushDebugNotification */,
            payload: {
                message: message
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.setPassphrase = function (passphrase) {
        var action = {
            type: 2 /* SetPassphrase */,
            payload: {
                passphrase: passphrase
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.replaceItems = function (items) {
        var action = {
            type: 5 /* ReplaceItems */,
            payload: {
                items: items
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.markItemById = function (id) {
        var action = {
            type: 8 /* MarkItemById */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.removeItemById = function (id) {
        var action = {
            type: 7 /* RemoveItemById */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.swapItemsByIds = function (id1, id2) {
        var action = {
            type: 6 /* SwapItemsByIds */,
            payload: {
                id1: id1,
                id2: id2
            }
        };
        Ago_1.store.dispatch(action);
    };
});
//# sourceMappingURL=ActionCreators.js.map