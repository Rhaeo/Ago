define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.agoReducer = (originalState = {
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
        }, originalAction) => {
        console.debug("state", originalState);
        console.debug("action", originalAction);
        const branches = {
            ["@@redux/INIT"]: (state, action) => state,
            [0 /* ChangeComposerText */]: (state, action) => state.newDraft = action.text,
            [1 /* PushErrorNotification */]: (state, action) => state.notifications.unshift({ message: action.message }),
            [3 /* PushDebugNotification */]: (state, action) => state.notifications.unshift({ message: action.message }),
            [2 /* PushTraceNotification */]: (state, action) => state.notifications.unshift({ message: action.message }),
            [4 /* SetPassphrase */]: (state, action) => state.passphrase = action.passphrase,
            [5 /* ReplaceItems */]: (state, action) => {
                for (const item of action.items) {
                    if (!state.cleartexts[item.item.id]) {
                        const message = {
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
            [6 /* ElectPivotItem */]: (state, action) => state.selectedItemId = action.id,
            [16 /* Login */]: (state) => state.isLoggedIn = true,
            [17 /* Logout */]: (state) => {
                state.passphrase = null;
                state.isLoggedIn = false;
                state.cleartexts = {};
            },
        };
        if (branches[originalAction.type]) {
            // TODO: No depp clone, instead ImmutableJS.
            const state = Object.assign({}, originalState);
            branches[originalAction.type](state, originalAction);
            return state;
        }
        const state = Object.assign({}, originalState);
        state.notifications.unshift({ message: `Unknown action ${originalAction.type}.` });
        return state;
    };
});
//# sourceMappingURL=AgoReducer.js.map