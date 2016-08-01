import { $, createNewTask as persistNewTask } from "./Messages/SignalR"; // TODO: Promisify.
import { store } from "./Ago";
import { ILink } from "./Models/ILink";
import {
  ActionTypes,
  IRouteAction
} from "./ActionTypes";
import { AsyncCrypto } from "./Helpers/AsyncCrypto";

export const changeComposerText = (text: string) => {
  store.dispatch({
    type: ActionTypes.ChangeComposerText,
    text
  });
};

export async function encryptAndSubmit(cleartext: string, passphrase: string) {
  const encryption = await AsyncCrypto.encrypt(cleartext, passphrase);
  await persistNewTask(encryption.cyphertext, encryption.salt, encryption.iv);
};

export const pushErrorNotification = (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
  store.dispatch({
    type: ActionTypes.PushErrorNotification,
    message,
    filename,
    lineno,
    colno,
    error
  });
};

export const pushTraceNotification = (message: string) => {
  store.dispatch({
    type: ActionTypes.PushTraceNotification,
    message
  });
};

export const pushDebugNotification = (message: string) => {
  store.dispatch({
    type: ActionTypes.PushDebugNotification,
    message
  });
};

export const setPassphrase = (passphrase: string) => {
  store.dispatch({
    type: ActionTypes.SetPassphrase,
    passphrase
  });
};

export const replaceItems = (items: ILink[]) => {
  store.dispatch({
    type: ActionTypes.ReplaceItems,
    items
  });
};

export const markItemById = (id: string) => {
  // TODO: Dispatch working…
  // TODO: Async/await.
  $.connection.agoHub.server.markTask(id);
  // TODO: Dispatch finished.
};

export const removeItemById = (id: string) => {
  // TODO: Dispatch working and success/failure and call using async/await wrapped in a promise.
  $.connection.agoHub.server.removeTask(id);
};

export const swapItemsByIds = (id1: string, id2: string) => {
  // TODO: Dispatch working and success/failure and call using async/await wrapped in a promise.
  $.connection.agoHub.server.swapTasks(id1, id2);
};

export const electPivotItem = (id: string) => {
  store.dispatch({
    type: ActionTypes.ElectPivotItem,
    id
  });
}

export const moveAbove = (id: string, counterId: string) => {
  store.dispatch({
    type: ActionTypes.MoveAbove,
    id,
    counterId
  });
}

export const moveBelow = (id: string, counterId: string) => {
  store.dispatch({
    type: ActionTypes.MoveBelow,
    id,
    counterId
  });
}

export const updateAboveDraft = (id: string, draft: string) => {
  store.dispatch({
    type: ActionTypes.UpdateAboveDraft,
    id,
    draft
  });
}

export const updateBelowDraft = (id: string, draft: string) => {
  store.dispatch({
    type: ActionTypes.UpdateBelowDraft,
    id,
    draft
  });
}

export const commitAboveDraft = (id: string) => {
  store.dispatch({
    type: ActionTypes.CommitAboveDraft,
    id
  });
}

export const commitBelowDraft = (id: string) => {
  store.dispatch({
    type: ActionTypes.CommitBelowDraft,
    id
  });
}

export const updateItemById = (id: string) => {
  store.dispatch({
    type: ActionTypes.UpdateItemById,
    id
  });
}

export const updateNewDraft = (draft: string) => {
  store.dispatch({
    type: ActionTypes.UpdateNewDraft,
    draft
  });
}

export const commitNewDraft = () => {
  //store.dispatch({
  //  type: ActionTypes.CommitNewDraft
  //} as ICommitNewDraftAction);
}

export const login = () => {
  // TODO: Async and all that.
  // TODO: When registering, generate a check word on client and encrypt it, save it with the user data, then verify here.
  $.connection.agoHub.server.requestSync();
  store.dispatch({ type: ActionTypes.Login });
}

export const logout = () => {
  store.dispatch({ type: ActionTypes.Logout });
}

const route = (route: string) => {
  history.pushState(null, null, route);
  store.dispatch({ type: ActionTypes.Route } as IRouteAction);
}

export const navigateToItemListPage = () => {
  route("/items");
}

export const navigateToTaskListPage = () => {
  route("/tasks");
}

export const navigateToNotificationListPage = () => {
  route("/notifications");
}

export const navigateToBudgetListPage = async () => {
  route("/budgets");
  const encryption = await AsyncCrypto.encrypt("test", "yoyoyo");
  console.debug("encryption", encryption);
  const decryption = await AsyncCrypto.decrypt(encryption.cyphertext, "yoyoyo", encryption.salt, encryption.iv);
  console.debug("decryption", decryption);
}
