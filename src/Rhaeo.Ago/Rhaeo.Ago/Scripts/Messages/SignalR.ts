import { ILink } from "./../Models/ILink";

interface ISignalRPromise<T> {
  done: (response: (result: T) => void) => {
    fail: (error: any) => void;
  };
  fail: (error: any) => void;
};

const $: {
  (onReady: () => void);
  connection: {
    hub: {
      start: () => ISignalRPromise<void>;
      stateChanged: (handler: (oldState: SignalRState, newState: SignalRState) => void) => void;
      state: SignalRState;
      transport: {
        name: string;
      }
    },
    agoHub: {
      server: {
        createNewTask: (cyphertext: string, salt: string, iv: string) => ISignalRPromise<void>;
        markTask: (id: string) => ISignalRPromise<void>;
        removeTask: (id: string) => ISignalRPromise<void>;
        swapTasks: (id1: string, id2: string) => ISignalRPromise<void>;
        requestSync: () => ISignalRPromise<void>;
      },
      client: {
        trace: (message: string) => void;
      }
    }
  }
} = window["$"];

export const enum SignalRState {
  Connecting = 0,
  Connected = 1,
  Reconnecting = 2,
  Disconnected = 4
}

export function getTransportInfo() {
  const transportInfo = {
    name: $.connection.hub.transport && $.connection.hub.transport.name || "unknown",
    state: "unknown"
  };

  switch ($.connection.hub.state) {
    case SignalRState.Connecting:
      transportInfo.state = "connecting";
      break;
    case SignalRState.Connected:
      transportInfo.state = "connected";
      break;
    case SignalRState.Reconnecting:
      transportInfo.state = "reconnecting";
      break;
    case SignalRState.Disconnected:
      transportInfo.state = "disconnected";
      break;
  }

  return transportInfo;
}

export function start() {
  return new Promise<void>((resolve, reject) => {
    $.connection.hub.start()
      .done(response => resolve(response))
      .fail(error => reject(error));
  });
}

export function handleState(handler: (oldState: SignalRState, newState: SignalRState) => void) {
  $.connection.hub.stateChanged(handler);
}

export function handleTrace(handler: (message: string) => void) {
  $.connection.agoHub.client.trace = handler;
}

export function createNewTask(cyphertext: string, salt: string, iv: string) {
  return new Promise<void>((resolve, reject) => {
    $.connection.agoHub.server.createNewTask(cyphertext, salt, iv)
      .done(response => resolve(response))
      .fail(error => reject(error));
  });
}
