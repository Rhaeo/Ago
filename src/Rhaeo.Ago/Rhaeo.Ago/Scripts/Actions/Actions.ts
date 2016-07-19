﻿import { ILink } from "./../Models/ILink"

export interface IChangeComposerTextAction extends Redux.Action {
  payload: {
    text: string;
  }
}

export interface ICreateNewTaskAction extends Redux.Action {
  payload: {
    text: string;
  }
}

export interface IPushErrorNotificationAction extends Redux.Action {
  payload: {
    message: string;
    filename?: string;
    lineno?: number;
    colno?: number;
    error?: Error;
  }
}

export interface IPushDebugNotificationAction extends Redux.Action {
  payload: {
    message: string;
  }
}

export interface IPushTraceNotificationAction extends Redux.Action {
  payload: {
    message: string;
  }
}

export interface ISetPassphraseAction extends Redux.Action {
  payload: {
    passphrase: string;
  }
}

export interface IReplaceItemsAction extends Redux.Action {
  payload: {
    items: ILink[];
  }
}

export interface IMarkItemByIdAction extends Redux.Action {
  payload: {
    id: string;
  }
}

export interface IRemoveItemByIdAction extends Redux.Action {
  payload: {
    id: string;
  }
}

export interface ISwapItemsByIdsAction extends Redux.Action {
  payload: {
    id1: string;
    id2: string;
  }
}

export interface IElectPivotItemAction extends Redux.Action {
  payload: {
    id: string;
  }
}

export interface IMoveAboveAction extends Redux.Action {
  payload: {
    id: string;
    counterId: string;
  }
}

export interface IMoveBelowAction extends Redux.Action {
  payload: {
    id: string;
    counterId: string;
  }
}

export interface IUpdateAboveDraftAction extends Redux.Action {
  payload: {
    id: string;
    draft: string;
  }
}

export interface IUpdateBelowDraftAction extends Redux.Action {
  payload: {
    id: string;
    draft: string;
  }
}

export interface ICommitAboveDraftAction extends Redux.Action {
  payload: {
    id: string;
  }
}

export interface ICommitBelowDraftAction extends Redux.Action {
  payload: {
    id: string;
  }
}

export interface IUpdateItemByIdAction extends Redux.Action {
  payload: {
    id: string;
  }
}

export interface IUpdateNewDraftAction extends Redux.Action {
  payload: {
    draft: string;
  }
}

export interface ICommitNewDraftAction extends Redux.Action {

}
