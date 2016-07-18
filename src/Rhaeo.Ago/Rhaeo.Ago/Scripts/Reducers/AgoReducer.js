define(["require", "exports", "./../Messages/SignalR", "./../Helpers/Encryption"], function (require, exports, SignalR_1, Encryption_1) {
    "use strict";
    exports.agoReducer = function (state, action) {
        state = Object.assign({}, state);
        switch (action.type) {
            case "@@redux/INIT":
                {
                    break;
                }
            case 4 /* ChangeComposerText */:
                {
                    var payload = action.payload;
                    state.draftText = payload.text;
                    break;
                }
            case 0 /* CreateNewTask */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.createNewTask(Encryption_1.encrypt(payload.text, state.passphrase));
                    state.draftText = "";
                    break;
                }
            case 1 /* PushErrorNotification */:
                {
                    var payload = action.payload;
                    state.notifications.unshift({ message: payload.message });
                    break;
                }
            case 9 /* PushDebugNotification */:
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
            case 2 /* SetPassphrase */:
                {
                    var payload = action.payload;
                    state.passphrase = payload.passphrase;
                    break;
                }
            case 5 /* ReplaceItems */:
                {
                    var payload = action.payload;
                    state.items = payload.items;
                    break;
                }
            case 8 /* MarkItemById */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.markTask(payload.id);
                    break;
                }
            case 7 /* RemoveItemById */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.removeTask(payload.id);
                    break;
                }
            case 6 /* SwapItemsByIds */:
                {
                    var payload = action.payload;
                    SignalR_1.$.connection.agoHub.server.swapTasks(payload.id1, payload.id2);
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