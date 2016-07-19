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
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div>
                <h2>Items ({props.items && props.items.length})</h2>
                {props.items && props.items.map((i, index) => (
                    <div style={{ background: index % 2 === 0 ? "none" : "silver", display: "flex" }}>
                        <button onClick={event => markItemById(i.item.id) }>✔</button>
                        <input checked={i.item.isMarked} type="checkbox" />
                        <span style={{ flex: 1 }}>{decrypt(i.item.cyphertext, props.passphrase, i.item.salt, i.item.iV) }</span>
                        <button onClick={event => removeItemById(i.item.id) }>✘</button>
                        <button onClick={event => swapItemsByIds(i.item.id, i.nextId) }>▼</button>
                        <button onClick={event => swapItemsByIds(i.item.id, i.prevId) }>▲</button>
                    </div>)) }
            </div>
            <div>
                <h2>Notifications ({props.notifications && props.notifications.length}) </h2>
                <ul>
                    {props.notifications && props.notifications.map(n => (
                        <li key={n.message}>
                            {n.message}
                        </li>)) }
                </ul>
            </div>
        </div>
    </div>);
