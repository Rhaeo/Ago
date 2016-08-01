var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
define(["require", "exports", "./Messages/SignalR", "./Ago", "./Helpers/AsyncCrypto"], function (require, exports, SignalR_1, Ago_1, AsyncCrypto_1) {
    "use strict";
    exports.changeComposerText = (text) => {
        Ago_1.store.dispatch({
            type: 0 /* ChangeComposerText */,
            text: text
        });
    };
    exports.createNewTask = (text, passphrase) => {
        const message = {
            cleartext: text,
            passphrase: passphrase,
            startMessage: { type: "CreateNewTaskEncryptStart" },
            endMessage: { type: "CreateNewTaskEncryptEnd" }
        };
        //worker.postMessage({ type: "encrypt", message });
        // TODO: Await worker.
        const cyphertext = "";
        const salt = "";
        const iv = "";
        SignalR_1.$.connection.agoHub.server.createNewTask(cyphertext, salt, iv);
        Ago_1.store.dispatch({ type: exports.changeComposerText, text: "" });
    };
    exports.pushErrorNotification = (message, filename, lineno, colno, error) => {
        Ago_1.store.dispatch({
            type: 1 /* PushErrorNotification */,
            message: message,
            filename: filename,
            lineno: lineno,
            colno: colno,
            error: error
        });
    };
    exports.pushTraceNotification = (message) => {
        Ago_1.store.dispatch({
            type: 2 /* PushTraceNotification */,
            message: message
        });
    };
    exports.pushDebugNotification = (message) => {
        Ago_1.store.dispatch({
            type: 3 /* PushDebugNotification */,
            message: message
        });
    };
    exports.setPassphrase = (passphrase) => {
        Ago_1.store.dispatch({
            type: 4 /* SetPassphrase */,
            passphrase: passphrase
        });
    };
    exports.replaceItems = (items) => {
        Ago_1.store.dispatch({
            type: 5 /* ReplaceItems */,
            items: items
        });
    };
    exports.markItemById = (id) => {
        // TODO: Dispatch working…
        // TODO: Async/await.
        SignalR_1.$.connection.agoHub.server.markTask(id);
        // TODO: Dispatch finished.
    };
    exports.removeItemById = (id) => {
        // TODO: Dispatch working and success/failure and call using async/await wrapped in a promise.
        SignalR_1.$.connection.agoHub.server.removeTask(id);
    };
    exports.swapItemsByIds = (id1, id2) => {
        // TODO: Dispatch working and success/failure and call using async/await wrapped in a promise.
        SignalR_1.$.connection.agoHub.server.swapTasks(id1, id2);
    };
    exports.electPivotItem = (id) => {
        Ago_1.store.dispatch({
            type: 6 /* ElectPivotItem */,
            id: id
        });
    };
    exports.moveAbove = (id, counterId) => {
        Ago_1.store.dispatch({
            type: 7 /* MoveAbove */,
            id: id,
            counterId: counterId
        });
    };
    exports.moveBelow = (id, counterId) => {
        Ago_1.store.dispatch({
            type: 8 /* MoveBelow */,
            id: id,
            counterId: counterId
        });
    };
    exports.updateAboveDraft = (id, draft) => {
        Ago_1.store.dispatch({
            type: 9 /* UpdateAboveDraft */,
            id: id,
            draft: draft
        });
    };
    exports.updateBelowDraft = (id, draft) => {
        Ago_1.store.dispatch({
            type: 10 /* UpdateBelowDraft */,
            id: id,
            draft: draft
        });
    };
    exports.commitAboveDraft = (id) => {
        Ago_1.store.dispatch({
            type: 11 /* CommitAboveDraft */,
            id: id
        });
    };
    exports.commitBelowDraft = (id) => {
        Ago_1.store.dispatch({
            type: 12 /* CommitBelowDraft */,
            id: id
        });
    };
    exports.updateItemById = (id) => {
        Ago_1.store.dispatch({
            type: 13 /* UpdateItemById */,
            id: id
        });
    };
    exports.updateNewDraft = (draft) => {
        Ago_1.store.dispatch({
            type: 14 /* UpdateNewDraft */,
            draft: draft
        });
    };
    exports.commitNewDraft = () => {
        //store.dispatch({
        //  type: ActionTypes.CommitNewDraft
        //} as ICommitNewDraftAction);
    };
    exports.login = () => {
        // TODO: Async and all that.
        // TODO: When registering, generate a check word on client and encrypt it, save it with the user data, then verify here.
        SignalR_1.$.connection.agoHub.server.requestSync();
        Ago_1.store.dispatch({ type: 16 /* Login */ });
    };
    exports.logout = () => {
        Ago_1.store.dispatch({ type: 17 /* Logout */ });
    };
    const route = (route) => {
        history.pushState(null, null, route);
        Ago_1.store.dispatch({ type: 18 /* Route */ });
    };
    exports.navigateToItemListPage = () => {
        route("/items");
    };
    exports.navigateToTaskListPage = () => {
        route("/tasks");
    };
    exports.navigateToNotificationListPage = () => {
        route("/notifications");
    };
    exports.navigateToBudgetListPage = () => __awaiter(this, void 0, void 0, function* () {
        route("/budgets");
        const encryption = yield AsyncCrypto_1.AsyncCrypto.encrypt("test", "yoyoyo");
        console.debug("encryption", encryption);
        const decryption = yield AsyncCrypto_1.AsyncCrypto.decrypt(encryption.cyphertext, "yoyoyo", encryption.salt, encryption.iv);
        console.debug("decryption", decryption);
    });
});
//# sourceMappingURL=ActionCreators.js.map