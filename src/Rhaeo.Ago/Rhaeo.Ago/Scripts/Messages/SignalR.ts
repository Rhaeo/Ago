import { ILink } from "./../Models/ILink";

interface ISignalRPromise<T> {
  done: (response: (result: T) => void) => {
    fail: (error: any) => void;
  };
  fail: (error: any) => void;
};

export const $: {
  (onReady: () => void);
  connection: {
    hub: {
      start: () => ISignalRPromise<void>;
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
        sync: (items: ILink[]) => void;
      }
    }
  }
} = window["$"];

export function createNewTask(cyphertext: string, salt: string, iv: string) {
  return new Promise<void>((resolve, reject) => {
    $.connection.agoHub.server.createNewTask(cyphertext, salt, iv)
      .done(response => resolve(response))
      .fail(error => reject(error));
  });
}
