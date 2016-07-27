define(["require", "exports", "./Messages/SignalR", "./Ago"], function (require, exports, SignalR_1, Ago_1) {
    "use strict";
    exports.agoReducer = function (state, action) {
        state = Object.assign({}, state);
        switch (action.type) {
            case "@@redux/INIT": {
                break;
            }
            case 1 /* ChangeComposerText */: {
                state.newDraft = action.text;
                break;
            }
            case 2 /* CreateNewTask */: {
                var message = {
                    cleartext: action.text,
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
            case 3 /* PushErrorNotification */: {
                state.notifications.unshift({ message: action.message });
                break;
            }
            case 5 /* PushDebugNotification */: {
                state.notifications.unshift({ message: action.message });
                break;
            }
            case 4 /* PushTraceNotification */: {
                state.notifications.unshift({ message: action.message });
                break;
            }
            case 6 /* SetPassphrase */: {
                state.passphrase = action.passphrase;
                break;
            }
            case 7 /* ReplaceItems */: {
                var payload = action;
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
            case 8 /* MarkItemById */: {
                SignalR_1.$.connection.agoHub.server.markTask(action.id);
                break;
            }
            case 9 /* RemoveItemById */: {
                SignalR_1.$.connection.agoHub.server.removeTask(action.id);
                break;
            }
            case 10 /* SwapItemsByIds */: {
                var payload = action;
                SignalR_1.$.connection.agoHub.server.swapTasks(payload.id1, payload.id2);
                break;
            }
            case 11 /* ElectPivotItem */: {
                state.selectedItemId = action.id;
                break;
            }
            case 12 /* MoveAbove */: {
                break;
            }
            case 13 /* MoveBelow */: {
                break;
            }
            case 18 /* UpdateItemById */: {
                break;
            }
            case 15 /* UpdateBelowDraft */: {
                break;
            }
            case 14 /* UpdateAboveDraft */: {
                break;
            }
            case 21 /* Login */: {
                // TODO: When registering, generate a check word on client and encrypt it, save it with the user data, then verify here.
                state.isLoggedIn = true;
                SignalR_1.$.connection.agoHub.server.requestSync();
                break;
            }
            case 22 /* Logout */: {
                state.passphrase = null;
                state.isLoggedIn = false;
                state.cleartexts = {};
                break;
            }
            case 25 /* RequestEncryption */: {
                break;
            }
            case 24 /* RequestDecryption */: {
                break;
            }
            case 26 /* SaveEncryptedItem */: {
                var payload = action;
                SignalR_1.$.connection.agoHub.server.createNewTask(payload.cyphertext, payload.salt, payload.iv);
                break;
            }
            case 27 /* CacheDecryptedText */: {
                var payload = action;
                state.cleartexts[payload.id] = payload.cleartext;
                break;
            }
            case 28 /* NavigateToItemListPage */:
                state.selectedTab = "Items";
                break;
            case 29 /* NavigateToTaskListPage */:
                state.selectedTab = "Tasks";
                break;
            case 30 /* NavigateToNotificationListPage */:
                state.selectedTab = "Notifications";
                break;
            default: {
                throw new Error("Unknown action type " + action.type + ". " + JSON.stringify(action));
            }
        }
        return state;
    };
});
//# sourceMappingURL=AgoReducer.js.map