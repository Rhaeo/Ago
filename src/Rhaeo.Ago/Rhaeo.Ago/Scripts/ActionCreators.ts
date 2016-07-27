import { store } from "./Ago";
import { ILink } from "./Models/ILink";

// changeComposerText

export const enum ActionTypes { ChangeComposerText = 1 }

export interface IChangeComposerTextAction extends Redux.Action {
  text: string;
}

export const changeComposerText = (text: string) => {
  store.dispatch({
    type: ActionTypes.ChangeComposerText,
    text
  } as IChangeComposerTextAction);
};

// createNewTask

export const enum ActionTypes { CreateNewTask = 2 }

export interface ICreateNewTaskAction extends Redux.Action {
  text: string;
}

export const createNewTask = (text: string) => {
  store.dispatch({
    type: ActionTypes.CreateNewTask,
    text
  } as ICreateNewTaskAction);
};

// pushErrorNotification

export const enum ActionTypes { PushErrorNotification = 3 }

export interface IPushErrorNotificationAction extends Redux.Action {
  message: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
}

export const pushErrorNotification = (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
  store.dispatch({
    type: ActionTypes.PushErrorNotification,
    message,
    filename,
    lineno,
    colno,
    error
  } as IPushErrorNotificationAction);
};

// pushTraceNotification

export const enum ActionTypes { PushTraceNotification = 4 }

export interface IPushTraceNotificationAction extends Redux.Action {
  message: string;
}

export const pushTraceNotification = (message: string) => {
  store.dispatch({
    type: ActionTypes.PushTraceNotification,
    message
  } as IPushTraceNotificationAction);
};

// 

export const enum ActionTypes { PushDebugNotification = 5 }

export interface IPushDebugNotificationAction extends Redux.Action {
  message: string;
}

export const pushDebugNotification = (message: string) => {
  store.dispatch({
    type: ActionTypes.PushDebugNotification,
    message
  } as IPushDebugNotificationAction);
};

// setPassphrase

export const enum ActionTypes { SetPassphrase = 6 }

export interface ISetPassphraseAction extends Redux.Action {
  passphrase: string;
}

export const setPassphrase = (passphrase: string) => {
  store.dispatch({
    type: ActionTypes.SetPassphrase,
    passphrase
  } as ISetPassphraseAction);
};

// replaceItems

export const enum ActionTypes { ReplaceItems = 7 }

export interface IReplaceItemsAction extends Redux.Action {
  items: ILink[];
}

export const replaceItems = (items: ILink[]) => {
  store.dispatch({
    type: ActionTypes.ReplaceItems,
    items
  } as IReplaceItemsAction);
};

// markItemById

export const enum ActionTypes { MarkItemById = 8 }

export interface IMarkItemByIdAction extends Redux.Action {
  id: string;
}

export const markItemById = (id: string) => {
  store.dispatch({
    type: ActionTypes.MarkItemById,
    id
  } as IMarkItemByIdAction);
};

// removeItemById

export const enum ActionTypes { RemoveItemById = 9 }

export interface IRemoveItemByIdAction extends Redux.Action {
  id: string;
}

export const removeItemById = (id: string) => {
  store.dispatch({
    type: ActionTypes.RemoveItemById,
    id
  } as IRemoveItemByIdAction);
};

// swapItemsByIds

export const enum ActionTypes { SwapItemsByIds = 10 }

export interface ISwapItemsByIdsAction extends Redux.Action {
  id1: string;
  id2: string;
}

export const swapItemsByIds = (id1: string, id2: string) => {
  store.dispatch({
    type: ActionTypes.SwapItemsByIds,
    id1,
    id2
  } as ISwapItemsByIdsAction);
};

// electPivotItem

export const enum ActionTypes { ElectPivotItem = 11 }

export interface IElectPivotItemAction extends Redux.Action {
  id: string;
}

export const electPivotItem = (id: string) => {
  store.dispatch({
    type: ActionTypes.ElectPivotItem,
    id
  } as IElectPivotItemAction);
}

// moveAbove

export const enum ActionTypes { MoveAbove = 12 }

export interface IMoveAboveAction extends Redux.Action {
  id: string;
  counterId: string;
}

export const moveAbove = (id: string, counterId: string) => {
  store.dispatch({
    type: ActionTypes.MoveAbove,
    id,
    counterId
  } as IMoveAboveAction);
}

// 

export const enum ActionTypes { MoveBelow = 13 }

export interface IMoveBelowAction extends Redux.Action {
  id: string;
  counterId: string;
}

export const moveBelow = (id: string, counterId: string) => {
  store.dispatch({
    type: ActionTypes.MoveBelow,
    id,
    counterId
  } as IMoveBelowAction);
}

// updateAboveDraft

export const enum ActionTypes { UpdateAboveDraft = 14 }

export interface IUpdateAboveDraftAction extends Redux.Action {
  id: string;
  draft: string;
}

export const updateAboveDraft = (id: string, draft: string) => {
  store.dispatch({
    type: ActionTypes.UpdateAboveDraft,
    id,
    draft
  } as IUpdateAboveDraftAction);
}

// updateBelowDraft

export const enum ActionTypes { UpdateBelowDraft = 15 }

export interface IUpdateBelowDraftAction extends Redux.Action {
  id: string;
  draft: string;
}

export const updateBelowDraft = (id: string, draft: string) => {
  store.dispatch({
    type: ActionTypes.UpdateBelowDraft,
    id,
    draft
  } as IUpdateBelowDraftAction);
}

// commitAboveDraft

export const enum ActionTypes { CommitAboveDraft = 16 }

export interface ICommitAboveDraftAction extends Redux.Action {
  id: string;
}

export const commitAboveDraft = (id: string) => {
  store.dispatch({
    type: ActionTypes.CommitAboveDraft,
    id
  } as ICommitAboveDraftAction);
}

// commitBelowDraft

export const enum ActionTypes { CommitBelowDraft = 17 }

export interface ICommitBelowDraftAction extends Redux.Action {
  id: string;
}

export const commitBelowDraft = (id: string) => {
  store.dispatch({
    type: ActionTypes.CommitBelowDraft,
    id
  } as ICommitBelowDraftAction);
}

// updateItemById

export const enum ActionTypes { UpdateItemById = 18 }

export interface IUpdateItemByIdAction extends Redux.Action {
  id: string;
}

export const updateItemById = (id: string) => {
  store.dispatch({
    type: ActionTypes.UpdateItemById,
    id
  } as IUpdateItemByIdAction);
}

// updateNewDraft

export const enum ActionTypes { UpdateNewDraft = 19 }

export interface IUpdateNewDraftAction extends Redux.Action {
  draft: string;
}

export const updateNewDraft = (draft: string) => {
  store.dispatch({
    type: ActionTypes.UpdateNewDraft,
    draft
  } as IUpdateNewDraftAction);
}

// commitNewDraft

export const enum ActionTypes { CommitNewDraft = 20 }

export interface ICommitNewDraftAction extends Redux.Action {

}

export const commitNewDraft = () => {
  store.dispatch({
    type: ActionTypes.CommitNewDraft
  } as ICommitNewDraftAction);
}

// login

export const enum ActionTypes { Login = 21 }

export interface ILoginAction extends Redux.Action {

}

export const login = () => {
  store.dispatch({
    type: ActionTypes.Login
  } as ILoginAction);
}

// logout

export const enum ActionTypes { Logout = 22 }

export interface ILogoutAction extends Redux.Action {

}

export const logout = () => {
  store.dispatch({
    type: ActionTypes.Logout
  } as ILogoutAction);
}

// processMessage

export const enum ActionTypes { ProcessMessage = 23 }

export interface IProcessMessageAction extends Redux.Action {
  data: any;
}

export const processMessage = (data: any) => {
  store.dispatch({
    type: ActionTypes.ProcessMessage,
    data
  } as IProcessMessageAction);
};

// 

export const enum ActionTypes { RequestDecryption = 24 }

export interface IRequestEncryptionAction extends Redux.Action {
  cleartext: string;
  passphrase: string;
}

export const requestEncryption = (cleartext: string, passphrase: string) => {
  store.dispatch({
    type: ActionTypes.RequestEncryption,
    cleartext,
    passphrase
  } as IRequestEncryptionAction);
};

// 

export const enum ActionTypes { RequestEncryption = 25 }

export interface IRequestDecryptionAction extends Redux.Action {
  cyphertext: string;
  passphrase: string;
  salt: string;
  iv: string;
}

export const requestDecryption = (cyphertext: string, passphrase: string, salt: string, iv: string) => {
  store.dispatch({
    type: ActionTypes.RequestDecryption,
    cyphertext,
    passphrase,
    salt,
    iv
  } as IRequestDecryptionAction);
};

// saveEncryptedItem

export const enum ActionTypes { SaveEncryptedItem = 26 }

export interface ISaveEncryptedItemAction extends Redux.Action {
  cyphertext: string;
  salt: string;
  iv: string;
}

export const saveEncryptedItem = (cyphertext: string, salt: string, iv: string) => {
  store.dispatch({
    type: ActionTypes.SaveEncryptedItem,
    cyphertext,
    salt,
    iv
  } as ISaveEncryptedItemAction);
};

// cacheDecryptedText

export const enum ActionTypes { CacheDecryptedText = 27 }

export interface ICacheDecryptedTextAction extends Redux.Action {
  id: string;
  cleartext: string;
}

export const cacheDecryptedText = (id: string, cleartext: string) => {
  store.dispatch({
    type: ActionTypes.CacheDecryptedText,
    id,
    cleartext
  } as ICacheDecryptedTextAction);
};


// navigateToItemListPage

export const enum ActionTypes { NavigateToItemListPage = 28 }

export interface INavigateToItemListPageAction {
  type: ActionTypes;
}

export const navigateToItemListPage = () => {
  store.dispatch({
    type: ActionTypes.NavigateToItemListPage
  } as INavigateToItemListPageAction);
}

// navigateToTaskListPage

export const enum ActionTypes { NavigateToTaskListPage = 29 }

export interface INavigateToTaskListPageAction {
  type: ActionTypes;
}

export const navigateToTaskListPage = () => {
  store.dispatch({
    type: ActionTypes.NavigateToTaskListPage
  } as INavigateToTaskListPageAction);
}

// navigateToNotificationListPage

export const enum ActionTypes { NavigateToNotificationListPage = 30 }

export interface INavigateToNotificationListPageAction {
  type: ActionTypes;
}

export const navigateToNotificationListPage = () => {
  store.dispatch({
    type: ActionTypes.NavigateToNotificationListPage
  } as INavigateToItemListPageAction);
}
