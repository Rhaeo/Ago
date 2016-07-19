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

export const electPivotItem = (id: string) => {
  const action: Actions.IElectPivotItemAction = {
    type: ActionTypes.ElectPivotItem,
    payload: {
      id
    }
  };

  store.dispatch(action);
}

export const moveAbove = (id: string, counterId: string) => {
  const action: Actions.IMoveAboveAction = {
    type: ActionTypes.MoveAbove,
    payload: {
      id,
      counterId
    }
  };

  store.dispatch(action);
}

export const moveBelow = (id: string, counterId: string) => {
  const action: Actions.IMoveBelowAction = {
    type: ActionTypes.MoveBelow,
    payload: {
      id,
      counterId
    }
  };

  store.dispatch(action);
}

export const updateAboveDraft = (id: string, draft: string) => {
  const action: Actions.IUpdateAboveDraftAction = {
    type: ActionTypes.UpdateAboveDraft,
    payload: {
      id,
      draft
    }
  };

  store.dispatch(action);
}

export const updateBelowDraft = (id: string, draft: string) => {
  const action: Actions.IUpdateBelowDraftAction = {
    type: ActionTypes.UpdateBelowDraft,
    payload: {
      id,
      draft
    }
  };

  store.dispatch(action);
}

export const commitAboveDraft = (id: string) => {
  const action: Actions.ICommitAboveDraftAction = {
    type: ActionTypes.CommitAboveDraft,
    payload: {
      id
    }
  };

  store.dispatch(action);
}

export const commitBelowDraft = (id: string) => {
  const action: Actions.ICommitBelowDraftAction = {
    type: ActionTypes.CommitBelowDraft,
    payload: {
      id
    }
  };

  store.dispatch(action);
}

export const updateItemById = (id: string) => {
  const action: Actions.IUpdateItemByIdAction = {
    type: ActionTypes.UpdateItemById,
    payload: {
      id
    }
  };

  store.dispatch(action);
}

export const updateNewDraft = (draft: string) => {
  const action: Actions.IUpdateNewDraftAction = {
    type: ActionTypes.UpdateNewDraft,
    payload: {
      draft
    }
  };

  store.dispatch(action);
}

export const commitNewDraft = () => {
  const action: Actions.ICommitNewDraftAction = {
    type: ActionTypes.CommitNewDraft
  };

  store.dispatch(action);
}

export const login = () => {
  const action: Actions.ILoginAction = {
    type: ActionTypes.Login
  };

  store.dispatch(action);
}

export const logout = () => {
  const action: Actions.ILogoutAction = {
    type: ActionTypes.Logout
  };

  store.dispatch(action);
}
