﻿import * as Redux from "redux";
import { $ } from "./../Messages/SignalR";
import { IAgoProps } from "./../Components/Ago";
import { encrypt } from "./../Helpers/Encryption";
import { ActionTypes } from "./../Actions/ActionTypes";
import * as Actions from "./../Actions/Actions";

export const agoReducer: Redux.Reducer<IAgoProps> = (state: IAgoProps, action: Redux.Action) => {
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
        $.connection.agoHub.server.createNewTask(encrypt(payload.text, state.passphrase));
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

      }
    case ActionTypes.MoveBelow:
      {
        const payload = (action as Actions.IMoveBelowAction).payload;
      }
    case ActionTypes.UpdateItemById:
      {
        const payload = (action as Actions.IUpdateItemByIdAction).payload;
      }
    case ActionTypes.UpdateBelowDraft:
      {
        const payload = (action as Actions.IUpdateBelowDraftAction).payload;
      }
    case ActionTypes.UpdateAboveDraft:
      {
        const payload = (action as Actions.IUpdateAboveDraftAction).payload;
      }

    default:
      {
        throw new Error(`Unknown action type ${action.type}. ${JSON.stringify(action)}`);
      }
  }

  return state;
};
