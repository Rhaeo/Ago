/// <reference path="./../../Typings/react/react.d.ts"/>
import * as React from "react";

import { ILink } from "./../Models/ILink";
import { INotification } from "./../Models/INotification";
import { Menu } from "./Menu";
import { Composer } from "./Composer";
import { decrypt } from "./../Helpers/Encryption";
import { markItemById, removeItemById, swapItemsByIds } from "./../Actions/ActionCreators";

export interface IAgoProps {
    draftText: string;
    passphrase: string;
    items: ILink[];
    notifications: INotification[];
}

// ReSharper disable once InconsistentNaming
export const Ago = (props: IAgoProps) => (
    <div>
        <Menu />
        <Composer text={props.draftText} />
        <div style={{ maxWidth: 800 }}>
            <h2>Items</h2>
            {props.items && props.items.map(i => (
                <div style={{ display: "flex" }}>
                    <button onClick={event => markItemById(i.Item.Id) }>✔</button>
                    <input checked={i.Item.IsMarked} type="checkbox" />
                    <span style={{ flex: 1 }}>{decrypt(i.Item.Cyphertext, props.passphrase, i.Item.Salt, i.Item.IV) }</span>
                    <button onClick={event => removeItemById(i.Item.Id)}>✘</button>
                    <button onClick={event => swapItemsByIds(i.Item.Id, i.NextId)}>▼</button>
                    <button onClick={event => swapItemsByIds(i.Item.Id, i.PrevId)}>▲</button>
                </div>)) }
        </div>
        <div>
            <h2>Notifications ({props.notifications && props.notifications.length})</h2>
            <ul>
                {props.notifications && props.notifications.map(n => (
                    <li key={n.message}>
                        {n.message}
                    </li>)) }
            </ul>
        </div>
    </div>);
