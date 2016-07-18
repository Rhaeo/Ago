﻿import { ILink } from "./../Models/ILink";

interface ISignalRPromise {
    done: (response: any) => {
        fail: (error: any) => void;
    };
    fail: (error: any) => void;
};

export const $: {
    (onReady: () => void);
    connection: {
        hub: {
            start: () => ISignalRPromise;
        },
        agoHub: {
            server: {
                ping: (payload: number) => ISignalRPromise;
                createNewTask: (a: any) => ISignalRPromise;
                markTask: (id: string) => ISignalRPromise;
                removeTask: (id: string) => ISignalRPromise;
                swapTasks: (id1: string, id2: string) => ISignalRPromise;
            },
            client: {
                pong: (payload: any) => void;
                trace: (message: string) => void;
                sync: (items: ILink[]) => void;
            }
        }
    }
} = window["$"];