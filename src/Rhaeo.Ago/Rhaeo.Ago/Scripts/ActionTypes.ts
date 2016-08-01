import * as Redux from "redux";

export const enum ActionTypes {
  ChangeComposerText,
  PushErrorNotification,
  PushTraceNotification,
  PushDebugNotification,
  SetPassphrase,
  ReplaceItems,
  ElectPivotItem,
  MoveAbove,
  MoveBelow,
  UpdateAboveDraft,
  UpdateBelowDraft,
  CommitAboveDraft,
  CommitBelowDraft,
  UpdateItemById,
  UpdateNewDraft,
  CommitNewDraft,
  Login,
  Logout,
  Route
}

interface IAction extends Redux.Action {
  type: ActionTypes;
}

export interface IRouteAction extends IAction {
  route: string;
}

export interface IRequestDecryptionAction extends Redux.Action {
  cyphertext: string;
  passphrase: string;
  salt: string;
  iv: string;
}

export interface ISaveEncryptedItemAction extends Redux.Action {
  cyphertext: string;
  salt: string;
  iv: string;
}

export interface ICacheDecryptedTextAction extends Redux.Action {
  id: string;
  cleartext: string;
}

export interface INavigateToItemListPageAction {
  type: ActionTypes;
}

export interface INavigateToTaskListPageAction {
  type: ActionTypes;
}

export interface INavigateToNotificationListPageAction {
  type: ActionTypes;
}
