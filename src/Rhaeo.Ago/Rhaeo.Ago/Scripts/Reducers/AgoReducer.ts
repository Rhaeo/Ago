import * as Redux from "redux";
import { $ } from "./../Messages/SignalR";
import { IState } from "./../Models/IState";
import { ActionTypes } from "./../Actions/ActionTypes";
import * as Actions from "./../Actions/Actions";
import { worker, store } from "./../Ago";

export const agoReducer: Redux.Reducer<IState> = (state: IState, action: Redux.Action) => {
  state = Object.assign({}, state);
  switch (action.type) {
    case "@@redux/INIT":
      {
        break;
      }
    case ActionTypes.ChangeComposerText:
      {
        const payload = (action as Actions.ICreateNewTaskAction).payload;
        state.newDraft = payload.text;
        break;
      }
    case ActionTypes.CreateNewTask:
      {
        const payload = (action as Actions.ICreateNewTaskAction).payload;
        const message = {
          cleartext: payload.text,
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
    case ActionTypes.PushErrorNotification:
      {
        const payload = (action as Actions.IPushErrorNotificationAction).payload;
        state.notifications.unshift({ message: payload.message });
        break;
      }
    case ActionTypes.PushDebugNotification:
      {
        const payload = (action as Actions.IPushDebugNotificationAction).payload;
        state.notifications.unshift({ message: payload.message });
        break;
      }
    case ActionTypes.PushTraceNotification:
      {
        const payload = (action as Actions.IPushTraceNotificationAction).payload;
        state.notifications.unshift({ message: payload.message });
        break;
      }
    case ActionTypes.SetPassphrase:
      {
        const payload = (action as Actions.ISetPassphraseAction).payload;
        state.passphrase = payload.passphrase;
        break;
      }
    case ActionTypes.ReplaceItems:
      {
        const payload = (action as Actions.IReplaceItemsAction).payload;
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
    case ActionTypes.MarkItemById:
      {
        const payload = (action as Actions.IMarkItemByIdAction).payload;
        $.connection.agoHub.server.markTask(payload.id);
        break;
      }
    case ActionTypes.RemoveItemById:
      {
        const payload = (action as Actions.IRemoveItemByIdAction).payload;
        $.connection.agoHub.server.removeTask(payload.id);
        break;
      }
    case ActionTypes.SwapItemsByIds:
      {
        const payload = (action as Actions.ISwapItemsByIdsAction).payload;
        $.connection.agoHub.server.swapTasks(payload.id1, payload.id2);
        break;
      }
    case ActionTypes.ElectPivotItem:
      {
        const payload = (action as Actions.IElectPivotItemAction).payload;
        state.selectedItemId = payload.id;
        break;
      }
    case ActionTypes.MoveAbove:
      {
        const payload = (action as Actions.IMoveAboveAction).payload;
        break;
      }
    case ActionTypes.MoveBelow:
      {
        const payload = (action as Actions.IMoveBelowAction).payload;
        break;
      }
    case ActionTypes.UpdateItemById:
      {
        const payload = (action as Actions.IUpdateItemByIdAction).payload;
        break;
      }
    case ActionTypes.UpdateBelowDraft:
      {
        const payload = (action as Actions.IUpdateBelowDraftAction).payload;
        break;
      }
    case ActionTypes.UpdateAboveDraft:
      {
        const payload = (action as Actions.IUpdateAboveDraftAction).payload;
        break;
      }
    case ActionTypes.Login:
      {
        //const payload = (action as Actions.ILoginAction).payload;
        // TODO: When registering, generate a check word on client and encrypt it, save it with the user data, then verify here.
        state.isLoggedIn = true;
        $.connection.agoHub.server.requestSync();
        break;
      }
    case ActionTypes.Logout:
      {
        state.passphrase = null;
        state.isLoggedIn = false;
        state.cleartexts = {};
        break;
      }
    case ActionTypes.RequestEncryption:
      {

        break;
      }
    case ActionTypes.RequestDecryption:
      {

        break;
      }
    case ActionTypes.SaveEncryptedItem:
      {
        const payload = (action as Actions.ISaveEncryptedItemAction).payload;
        $.connection.agoHub.server.createNewTask(payload.cyphertext, payload.salt, payload.iv);
        break;
      }
    case ActionTypes.CacheDecryptedText:
      {
        const payload = (action as Actions.ICacheDecryptedTextAction).payload;
        state.cleartexts[payload.id] = payload.cleartext;
        break;
      }
    default:
      {
        throw new Error(`Unknown action type ${action.type}. ${JSON.stringify(action)}`);
      }
  }

  return state;
};
