define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.agoReducer = function (originalState, originalAction) {
        if (originalState === void 0) { originalState = {
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
        }; }
        console.debug("state", originalState);
        console.debug("action", originalAction);
        var branches = (_a = {},
            _a["@@redux/INIT"] = function (state, action) { return state; },
            _a[27 /* CacheDecryptedText */] = function (state, action) { return state; },
            _a[1 /* ChangeComposerText */] = function (state, action) {
                return state.newDraft = action.text;
            },
            _a[3 /* PushErrorNotification */] = function (state, action) {
                return state.notifications.unshift({ message: action.message });
            },
            _a[5 /* PushDebugNotification */] = function (state, action) {
                return state.notifications.unshift({ message: action.message });
            },
            _a[4 /* PushTraceNotification */] = function (state, action) {
                return state.notifications.unshift({ message: action.message });
            },
            _a[6 /* SetPassphrase */] = function (state, action) {
                return state.passphrase = action.passphrase;
            },
            _a[7 /* ReplaceItems */] = function (state, action) {
                for (var _i = 0, _a = action.items; _i < _a.length; _i++) {
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
                    }
                }
                state.items = action.items;
            },
            _a[11 /* ElectPivotItem */] = function (state, action) {
                return state.selectedItemId = action.id;
            },
            _a[21 /* Login */] = function (state) {
                return state.isLoggedIn = true;
            },
            _a[22 /* Logout */] = function (state) {
                state.passphrase = null;
                state.isLoggedIn = false;
                state.cleartexts = {};
            },
            _a[27 /* CacheDecryptedText */] = function (state, action) {
                return state.cleartexts[action.id] = action.cleartext;
            },
            _a[28 /* NavigateToItemListPage */] = function (state, action) {
                return state.selectedTab = "Items";
            },
            _a[29 /* NavigateToTaskListPage */] = function (state, action) {
                return state.selectedTab = "Tasks";
            },
            _a[30 /* NavigateToNotificationListPage */] = function (state, action) {
                return state.selectedTab = "Notifications";
            },
            _a
        );
        if (branches[originalAction.type]) {
            // TODO: No depp clone, instead ImmutableJS.
            var state_1 = Object.assign({}, originalState);
            branches[originalAction.type](state_1, originalAction);
            return state_1;
        }
        var state = Object.assign({}, originalState);
        state.notifications.unshift({ message: "Unknown action " + originalAction.type + "." });
        return state;
        var _a;
    };
});
//# sourceMappingURL=AgoReducer.js.map