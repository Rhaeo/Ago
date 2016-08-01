import * as Redux from "redux";
import { IState } from "./Models/IState";
import { store } from "./Ago";
import { ActionTypes } from "./ActionTypes";

export const agoReducer: Redux.Reducer<IState> = (originalState: IState = {
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
}, originalAction: Redux.Action) => {
  console.debug("state", originalState);
  console.debug("action", originalAction);

  const branches = {
    ["@@redux/INIT"]: (state, action) => state,

    [ActionTypes.ChangeComposerText]: (state: IState, action: any) =>
      state.newDraft = action.text,

    [ActionTypes.PushErrorNotification]: (state: IState, action: any) =>
      state.notifications.unshift({ message: action.message }),

    [ActionTypes.PushDebugNotification]: (state: IState, action: any) => 
      state.notifications.unshift({ message: action.message }),

    [ActionTypes.PushTraceNotification]: (state: IState, action: any) =>
      state.notifications.unshift({ message: action.message }),

    [ActionTypes.SetPassphrase]: (state: IState, action: any) =>
      state.passphrase = action.passphrase,

    [ActionTypes.ReplaceItems]: (state: IState, action: any) => {
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

          // TODO: Move logic to action creator.
          //worker.postMessage({
          //  type: "decrypt",
          //  message
          //});
        }
      }

      state.items = action.items;
    },

    [ActionTypes.ElectPivotItem]: (state: IState, action: any) =>
      state.selectedItemId = action.id,

    [ActionTypes.Login]: (state: IState) =>
      state.isLoggedIn = true,

    [ActionTypes.Logout]: (state: IState) => {
      state.passphrase = null;
      state.isLoggedIn = false;
      state.cleartexts = {};
    },

  };

  if (branches[originalAction.type]) {
    // TODO: No depp clone, instead ImmutableJS.
    const state: IState = Object.assign({}, originalState);
    branches[originalAction.type](state, originalAction);
    return state;
  }

  const state: IState = Object.assign({}, originalState);
  state.notifications.unshift({ message: `Unknown action ${originalAction.type}.` });
  return state;
};
