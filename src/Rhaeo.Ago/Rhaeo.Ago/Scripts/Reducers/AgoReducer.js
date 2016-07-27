define(["require", "exports", "./../Messages/SignalR", "./../Ago"], function (require, exports, SignalR_1, Ago_1) {
    "use strict";
    exports.agoReducer = function (state, action) {
        state = Object.assign({}, state);
        switch (action.type) {
            case "@@redux/INIT":
                {
                    break;
                }
            case 5 /* ChangeComposerText */:
                {
                    var payload = action.payload;
                    state.newDraft = payload.text;
                    break;
                }
            case 1 /* CreateNewTask */:
                {
                    var payload = action.payload;
                    var message = {
                        cleartext: payload.text,
                        passphrase: state.passphrase,
                        startMessage: { type: "CreateNewTaskEncryptStart" },
                        endMessage: { type: "CreateNewTaskEncryptEnd" }
                    };
                    Ago_1.worker.postMessage({
                        type: "encrypt",
                        message: message
                    });
                    state.newDraft = "";
                    break;
                }
            case 2 /* PushErrorNotification */:
                {
                    var payload = action.payload;
                    state.notifications.unshift({ message: payload.message });
                    break;
                }
            case 4 /* PushDebugNotification */:
                {
                    var payload = action.payload;
                    state.notifications.unshift({ message: payload.message });
                    break;
                }
            case 3 /* PushTraceNotification */:
                {
                    var payload = action.payload;
                    state.notifications.unshift({ message: payload.message });
                    break;
                }
            case 0 /* SetPassphrase */:
                {
                    var payload = action.payload;
                    state.passphrase = payload.passphrase;
                    break;
                }
            case 6 /* ReplaceItems */:
                {
                    var payload = action.payload;
                    for (var _i = 0, _a = payload.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!state.cleartexts[item.item.id]) {
                            var message = {
                                cyphertext: item.item.cyphertext,
                                passphrase: state.passphrase,
                                salt: item.item.salt,
                                iv: item.item.iV,
                                startMessage: { type: "ReplaceItemDecryptStart", id: item.item.id },
                                endMessage: { type: "ReplaceItemDecryptEnd", id: item.item.id }
                            };
                            Ago_1.worker.postMessage({
                                type: "decrypt",
                                message: message
                            });
                        }
                    }
                    state.items = payload.items;
                    break;
                }
            case 9 /* MarkItemById */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.markTask(payload.id);
                    break;
                }
            case 8 /* RemoveItemById */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.removeTask(payload.id);
                    break;
                }
            case 7 /* SwapItemsByIds */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.swapTasks(payload.id1, payload.id2);
                    break;
                }
            case 10 /* ElectPivotItem */:
                {
                    var payload = action.payload;
                    state.selectedItemId = payload.id;
                    break;
                }
            case 11 /* MoveAbove */:
                {
                    var payload = action.payload;
                    break;
                }
            case 12 /* MoveBelow */:
                {
                    var payload = action.payload;
                    break;
                }
            case 13 /* UpdateItemById */:
                {
                    var payload = action.payload;
                    break;
                }
            case 14 /* UpdateBelowDraft */:
                {
                    var payload = action.payload;
                    break;
                }
            case 15 /* UpdateAboveDraft */:
                {
                    var payload = action.payload;
                    break;
                }
            case 20 /* Login */:
                {
                    //const payload = (action as Actions.ILoginAction).payload;
                    // TODO: When registering, generate a check word on client and encrypt it, save it with the user data, then verify here.
                    state.isLoggedIn = true;
                    SignalR_1.$.connection.agoHub.server.requestSync();
                    break;
                }
            case 21 /* Logout */:
                {
                    state.passphrase = null;
                    state.isLoggedIn = false;
                    state.cleartexts = {};
                    break;
                }
            case 24 /* RequestEncryption */:
                {
                    break;
                }
            case 23 /* RequestDecryption */:
                {
                    break;
                }
            case 25 /* SaveEncryptedItem */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.createNewTask(payload.cyphertext, payload.salt, payload.iv);
                    break;
                }
            case 26 /* CacheDecryptedText */:
                {
                    var payload = action.payload;
                    state.cleartexts[payload.id] = payload.cleartext;
                    break;
                }
            default:
                {
                    throw new Error("Unknown action type " + action.type + ". " + JSON.stringify(action));
                }
        }
        return state;
    };
});
//# sourceMappingURL=AgoReducer.js.map