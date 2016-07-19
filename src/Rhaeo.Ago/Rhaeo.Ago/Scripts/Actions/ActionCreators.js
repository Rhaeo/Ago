define(["require", "exports", "./../Ago"], function (require, exports, Ago_1) {
    "use strict";
    exports.changeComposerText = function (text) {
        var action = {
            type: 5 /* ChangeComposerText */,
            payload: {
                text: text
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.createNewTask = function (text) {
        var action = {
            type: 1 /* CreateNewTask */,
            payload: {
                text: text
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.pushErrorNotification = function (message, filename, lineno, colno, error) {
        var action = {
            type: 2 /* PushErrorNotification */,
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
            type: 4 /* PushDebugNotification */,
            payload: {
                message: message
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.setPassphrase = function (passphrase) {
        var action = {
            type: 0 /* SetPassphrase */,
            payload: {
                passphrase: passphrase
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.replaceItems = function (items) {
        var action = {
            type: 6 /* ReplaceItems */,
            payload: {
                items: items
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.markItemById = function (id) {
        var action = {
            type: 9 /* MarkItemById */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.removeItemById = function (id) {
        var action = {
            type: 8 /* RemoveItemById */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.swapItemsByIds = function (id1, id2) {
        var action = {
            type: 7 /* SwapItemsByIds */,
            payload: {
                id1: id1,
                id2: id2
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.electPivotItem = function (id) {
        var action = {
            type: 10 /* ElectPivotItem */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.moveAbove = function (id, counterId) {
        var action = {
            type: 11 /* MoveAbove */,
            payload: {
                id: id,
                counterId: counterId
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.moveBelow = function (id, counterId) {
        var action = {
            type: 12 /* MoveBelow */,
            payload: {
                id: id,
                counterId: counterId
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.updateAboveDraft = function (id, draft) {
        var action = {
            type: 15 /* UpdateAboveDraft */,
            payload: {
                id: id,
                draft: draft
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.updateBelowDraft = function (id, draft) {
        var action = {
            type: 14 /* UpdateBelowDraft */,
            payload: {
                id: id,
                draft: draft
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.commitAboveDraft = function (id) {
        var action = {
            type: 17 /* CommitAboveDraft */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.commitBelowDraft = function (id) {
        var action = {
            type: 18 /* CommitBelowDraft */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.updateItemById = function (id) {
        var action = {
            type: 13 /* UpdateItemById */,
            payload: {
                id: id
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.updateNewDraft = function (draft) {
        var action = {
            type: 16 /* UpdateNewDraft */,
            payload: {
                draft: draft
            }
        };
        Ago_1.store.dispatch(action);
    };
    exports.commitNewDraft = function () {
        var action = {
            type: 19 /* CommitNewDraft */
        };
        Ago_1.store.dispatch(action);
    };
});
//# sourceMappingURL=ActionCreators.js.map