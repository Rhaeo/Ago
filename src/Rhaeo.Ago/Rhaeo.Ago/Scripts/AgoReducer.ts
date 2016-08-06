import * as Redux from "redux";
import { IState } from "./Models/IState";
import {
  ActionTypes,
  IAction,
  ISetPassphraseAction,
  IPushErrorNotificationAction,
  IPushTraceNotificationAction,
  IPushDebugNotificationAction,
  IUpdateTransportInfoAction
} from "./ActionTypes";

const initialState: IState = {
  notifications: [],
  selectedTab: "Notifications"
};

export const agoReducer: Redux.Reducer<IState> = (oldState: IState = initialState, oldAction: IAction) => {
  // TODO: ImmutableJS instead of cloning.
  const newState: IState = Object.assign({}, oldState);

  switch (oldAction.type) {
    case "@@redux/INIT":
      {
        // TODO: Redux DevTools set up and their init handler.
        return newState;
      }
    case ActionTypes.Login:
      {
        newState.isLoggedIn = true;
        return newState;
      }
    case ActionTypes.Logout:
      {
        newState.isLoggedIn = false;
        delete newState.passphrase;
        delete newState.cleartexts;
        return newState;
      }
    case ActionTypes.SetPassphrase:
      {
        const newAction = oldAction as ISetPassphraseAction;
        newState.isLoggedIn = true;
        return newState;
      }
    case ActionTypes.PushErrorNotification:
      {
        const newAction = oldAction as IPushErrorNotificationAction;
        newState.notifications.unshift({ message: newAction.message });
        return newState;
      }
    case ActionTypes.PushTraceNotification:
      {
        const newAction = oldAction as IPushTraceNotificationAction;
        newState.notifications.unshift({ message: newAction.message });
        return newState;
      }
    case ActionTypes.PushDebugNotification:
      {
        const newAction = oldAction as IPushDebugNotificationAction;
        newState.notifications.unshift({ message: newAction.message });
        return newState;
      }
    case ActionTypes.UpdateTransportInfo:
      {
        const newAction = oldAction as IUpdateTransportInfoAction;
        newState.transportName = newAction.name;
        newState.transportState = newAction.state;
        return newState;
      }
    default:
      {
        newState.notifications.unshift({ message: `Unknown action type ${oldAction.type}!` });
        return newState;
      }
  }
};
