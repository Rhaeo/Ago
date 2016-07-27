import * as Redux from "redux";
import { $ } from "./Messages/SignalR";
import { IState } from "./Models/IState";
import { worker, store } from "./Ago";
import {
  ActionTypes,
  ICreateNewTaskAction,
  IChangeComposerTextAction,
  ISaveEncryptedItemAction,
  IUpdateAboveDraftAction,
  IUpdateBelowDraftAction,
  IPushErrorNotificationAction,
  IPushDebugNotificationAction,
  IPushTraceNotificationAction,
  ISetPassphraseAction,
  IReplaceItemsAction,
  IMarkItemByIdAction,
  IRemoveItemByIdAction,
  ISwapItemsByIdsAction,
  IElectPivotItemAction,
  IMoveAboveAction,
  IMoveBelowAction,
  IUpdateItemByIdAction,
  ICacheDecryptedTextAction
} from "./ActionCreators";

export const agoReducer: Redux.Reducer<IState> = (state: IState, action: Redux.Action) => {
  state = Object.assign({}, state);
  switch (action.type) {
    case "@@redux/INIT": {
      break;
    }
    case ActionTypes.ChangeComposerText: {
      state.newDraft = (action as IChangeComposerTextAction).text;
      break;
    }
    case ActionTypes.CreateNewTask: {
      const message = {
        cleartext: (action as ICreateNewTaskAction).text,
        passphrase: state.passphrase,
        startMessage: { type: "CreateNewTaskEncryptStart" },
        endMessage: { type: "CreateNewTaskEncryptEnd" }
      };

      worker.postMessage({
        type: "encrypt",
        message
      });

      state.newDraft = "";
      break;
    }
    case ActionTypes.PushErrorNotification: {
      state.notifications.unshift({ message: (action as IPushErrorNotificationAction).message });
      break;
    }
    case ActionTypes.PushDebugNotification: {
      state.notifications.unshift({ message: (action as IPushDebugNotificationAction).message });
      break;
    }
    case ActionTypes.PushTraceNotification: {
      state.notifications.unshift({ message: (action as IPushTraceNotificationAction).message });
      break;
    }
    case ActionTypes.SetPassphrase: {
      state.passphrase = (action as ISetPassphraseAction).passphrase;
      break;
    }
    case ActionTypes.ReplaceItems: {
      const payload = action as IReplaceItemsAction;
      for (const item of payload.items) {
        if (!state.cleartexts[item.item.id]) {
          const message = {
            cyphertext: item.item.cyphertext,
            passphrase: state.passphrase,
            salt: item.item.salt,
            iv: item.item.iV,
            startMessage: { type: "ReplaceItemDecryptStart", id: item.item.id },
            endMessage: { type: "ReplaceItemDecryptEnd", id: item.item.id }
          };

          worker.postMessage({
            type: "decrypt",
            message
          });
        }
      }

      state.items = payload.items;
      break;
    }
    case ActionTypes.MarkItemById: {
      $.connection.agoHub.server.markTask((action as IMarkItemByIdAction).id);
      break;
    }
    case ActionTypes.RemoveItemById: {
      $.connection.agoHub.server.removeTask((action as IRemoveItemByIdAction).id);
      break;
    }
    case ActionTypes.SwapItemsByIds: {
      const payload = (action as ISwapItemsByIdsAction);
      $.connection.agoHub.server.swapTasks(payload.id1, payload.id2);
      break;
    }
    case ActionTypes.ElectPivotItem: {
      state.selectedItemId = (action as IElectPivotItemAction).id;
      break;
    }
    case ActionTypes.MoveAbove: {
      break;
    }
    case ActionTypes.MoveBelow: {
      break;
    }
    case ActionTypes.UpdateItemById: {
      break;
    }
    case ActionTypes.UpdateBelowDraft: {
      break;
    }
    case ActionTypes.UpdateAboveDraft: {
      break;
    }
    case ActionTypes.Login: {
      // TODO: When registering, generate a check word on client and encrypt it, save it with the user data, then verify here.
      state.isLoggedIn = true;
      $.connection.agoHub.server.requestSync();
      break;
    }
    case ActionTypes.Logout: {
      state.passphrase = null;
      state.isLoggedIn = false;
      state.cleartexts = {};
      break;
    }
    case ActionTypes.RequestEncryption: {

      break;
    }
    case ActionTypes.RequestDecryption: {

      break;
    }
    case ActionTypes.SaveEncryptedItem: {
      const payload = action as ISaveEncryptedItemAction;
      $.connection.agoHub.server.createNewTask(payload.cyphertext, payload.salt, payload.iv);
      break;
    }
    case ActionTypes.CacheDecryptedText: {
      const payload = action as ICacheDecryptedTextAction;
      state.cleartexts[payload.id] = payload.cleartext;
      break;
    }
    case ActionTypes.NavigateToItemListPage:
      state.selectedTab = "Items";
      break;
    case ActionTypes.NavigateToTaskListPage:
      state.selectedTab = "Tasks";
      break;
    case ActionTypes.NavigateToNotificationListPage:
      state.selectedTab = "Notifications";
      break;
    default: {
      throw new Error(`Unknown action type ${action.type}. ${JSON.stringify(action)}`);
    }
  }

  return state;
};
