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
  Route,
  UpdateTransportInfo
}

export interface IAction extends Redux.Action {
  type: ActionTypes | "@@redux/INIT";
}

export interface IRouteAction extends IAction {
  route: string;
}

export interface ISetPassphraseAction extends IAction {
  passphrase: string;
}

export interface IPushErrorNotificationAction extends IAction {
  message: string;
}

export interface IPushTraceNotificationAction extends IAction {
  message: string;
}

export interface IPushDebugNotificationAction extends IAction {
  message: string;
}

export interface IRequestDecryptionAction extends IAction {
  cyphertext: string;
  passphrase: string;
  salt: string;
  iv: string;
}

export interface ISaveEncryptedItemAction extends IAction {
  cyphertext: string;
  salt: string;
  iv: string;
}

export interface ICacheDecryptedTextAction extends IAction {
  id: string;
  cleartext: string;
}

export interface IUpdateTransportInfoAction extends IAction {
  name: string;
  state: string;
}
