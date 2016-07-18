import { store } from "./../Ago";
import { ActionTypes } from "./ActionTypes";
import * as Actions from "./Actions";
import { ILink } from "./../Models/ILink";

export const changeComposerText = (text: string) => {
    const action: Actions.IChangeComposerTextAction = {
        type: ActionTypes.ChangeComposerText,
        payload: {
            text
        }
    };

    store.dispatch(action);
};

export const createNewTask = (text: string) => {
    const action: Actions.ICreateNewTaskAction = {
        type: ActionTypes.CreateNewTask,
        payload: {
            text
        }
    };

    store.dispatch(action);
};

export const pushErrorNotification = (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
    const action: Actions.IPushErrorNotificationAction = {
        type: ActionTypes.PushErrorNotification,
        payload: {
            message,
            filename,
            lineno,
            colno,
            error
        }
    };

    store.dispatch(action);
};

export const pushTraceNotification = (message: string) => {
    const action: Actions.IPushTraceNotificationAction = {
        type: ActionTypes.PushTraceNotification,
        payload: {
            message
        }
    };

    store.dispatch(action);
};

export const pushDebugNotification = (message: string) => {
    const action: Actions.IPushDebugNotificationAction = {
        type: ActionTypes.PushDebugNotification,
        payload: {
            message
        }
    };

    store.dispatch(action);
};

export const setPassphrase = (passphrase: string) => {
    const action: Actions.ISetPassphraseAction = {
        type: ActionTypes.SetPassphrase,
        payload: {
            passphrase
        }
    };

    store.dispatch(action);
};

export const replaceItems = (items: ILink[]) => {
    const action: Actions.IReplaceItemsAction = {
        type: ActionTypes.ReplaceItems,
        payload: {
            items
        }
    };

    store.dispatch(action);
};

export const markItemById = (id: string) => {
    const action: Actions.IMarkItemByIdAction = {
        type: ActionTypes.MarkItemById,
        payload: {
            id
        }
    };

    store.dispatch(action);
};

export const removeItemById = (id: string) => {
    const action: Actions.IRemoveItemByIdAction = {
        type: ActionTypes.RemoveItemById,
        payload: {
            id
        }
    };

    store.dispatch(action);
};

export const swapItemsByIds = (id1: string, id2: string) => {
    const action: Actions.ISwapItemsByIdsAction = {
        type: ActionTypes.SwapItemsByIds,
        payload: {
            id1,
            id2
        }
    };

    store.dispatch(action);
};
