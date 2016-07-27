define(["require", "exports", "./Ago"], function (require, exports, Ago_1) {
    "use strict";
    exports.changeComposerText = function (text) {
        Ago_1.store.dispatch({
            type: 1 /* ChangeComposerText */,
            text: text
        });
    };
    exports.createNewTask = function (text) {
        Ago_1.store.dispatch({
            type: 2 /* CreateNewTask */,
            text: text
        });
    };
    exports.pushErrorNotification = function (message, filename, lineno, colno, error) {
        Ago_1.store.dispatch({
            type: 3 /* PushErrorNotification */,
            message: message,
            filename: filename,
            lineno: lineno,
            colno: colno,
            error: error
        });
    };
    exports.pushTraceNotification = function (message) {
        Ago_1.store.dispatch({
            type: 4 /* PushTraceNotification */,
            message: message
        });
    };
    exports.pushDebugNotification = function (message) {
        Ago_1.store.dispatch({
            type: 5 /* PushDebugNotification */,
            message: message
        });
    };
    exports.setPassphrase = function (passphrase) {
        Ago_1.store.dispatch({
            type: 6 /* SetPassphrase */,
            passphrase: passphrase
        });
    };
    exports.replaceItems = function (items) {
        Ago_1.store.dispatch({
            type: 7 /* ReplaceItems */,
            items: items
        });
    };
    exports.markItemById = function (id) {
        Ago_1.store.dispatch({
            type: 8 /* MarkItemById */,
            id: id
        });
    };
    exports.removeItemById = function (id) {
        Ago_1.store.dispatch({
            type: 9 /* RemoveItemById */,
            id: id
        });
    };
    exports.swapItemsByIds = function (id1, id2) {
        Ago_1.store.dispatch({
            type: 10 /* SwapItemsByIds */,
            id1: id1,
            id2: id2
        });
    };
    exports.electPivotItem = function (id) {
        Ago_1.store.dispatch({
            type: 11 /* ElectPivotItem */,
            id: id
        });
    };
    exports.moveAbove = function (id, counterId) {
        Ago_1.store.dispatch({
            type: 12 /* MoveAbove */,
            id: id,
            counterId: counterId
        });
    };
    exports.moveBelow = function (id, counterId) {
        Ago_1.store.dispatch({
            type: 13 /* MoveBelow */,
            id: id,
            counterId: counterId
        });
    };
    exports.updateAboveDraft = function (id, draft) {
        Ago_1.store.dispatch({
            type: 14 /* UpdateAboveDraft */,
            id: id,
            draft: draft
        });
    };
    exports.updateBelowDraft = function (id, draft) {
        Ago_1.store.dispatch({
            type: 15 /* UpdateBelowDraft */,
            id: id,
            draft: draft
        });
    };
    exports.commitAboveDraft = function (id) {
        Ago_1.store.dispatch({
            type: 16 /* CommitAboveDraft */,
            id: id
        });
    };
    exports.commitBelowDraft = function (id) {
        Ago_1.store.dispatch({
            type: 17 /* CommitBelowDraft */,
            id: id
        });
    };
    exports.updateItemById = function (id) {
        Ago_1.store.dispatch({
            type: 18 /* UpdateItemById */,
            id: id
        });
    };
    exports.updateNewDraft = function (draft) {
        Ago_1.store.dispatch({
            type: 19 /* UpdateNewDraft */,
            draft: draft
        });
    };
    exports.commitNewDraft = function () {
        Ago_1.store.dispatch({
            type: 20 /* CommitNewDraft */
        });
    };
    exports.login = function () {
        Ago_1.store.dispatch({
            type: 21 /* Login */
        });
    };
    exports.logout = function () {
        Ago_1.store.dispatch({
            type: 22 /* Logout */
        });
    };
    exports.processMessage = function (data) {
        Ago_1.store.dispatch({
            type: 23 /* ProcessMessage */,
            data: data
        });
    };
    exports.requestEncryption = function (cleartext, passphrase) {
        Ago_1.store.dispatch({
            type: 25 /* RequestEncryption */,
            cleartext: cleartext,
            passphrase: passphrase
        });
    };
    exports.requestDecryption = function (cyphertext, passphrase, salt, iv) {
        Ago_1.store.dispatch({
            type: 24 /* RequestDecryption */,
            cyphertext: cyphertext,
            passphrase: passphrase,
            salt: salt,
            iv: iv
        });
    };
    exports.saveEncryptedItem = function (cyphertext, salt, iv) {
        Ago_1.store.dispatch({
            type: 26 /* SaveEncryptedItem */,
            cyphertext: cyphertext,
            salt: salt,
            iv: iv
        });
    };
    exports.cacheDecryptedText = function (id, cleartext) {
        Ago_1.store.dispatch({
            type: 27 /* CacheDecryptedText */,
            id: id,
            cleartext: cleartext
        });
    };
    exports.navigateToItemListPage = function () {
        Ago_1.store.dispatch({
            type: 28 /* NavigateToItemListPage */
        });
    };
    exports.navigateToTaskListPage = function () {
        Ago_1.store.dispatch({
            type: 29 /* NavigateToTaskListPage */
        });
    };
    exports.navigateToNotificationListPage = function () {
        Ago_1.store.dispatch({
            type: 30 /* NavigateToNotificationListPage */
        });
    };
});
//# sourceMappingURL=ActionCreators.js.map