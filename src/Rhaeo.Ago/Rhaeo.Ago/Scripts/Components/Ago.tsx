/// <reference path="./../../Typings/react/react.d.ts"/>
import * as React from "react";

import { IState } from "./../Models/IState";
import { Menu } from "./Menu";
import { Composer } from "./Composer";
import { NoteList } from "./NoteList";
import { markItemById, removeItemById, swapItemsByIds } from "./../Actions/ActionCreators";

export interface IAgoProps extends IState {

}

// ReSharper disable once InconsistentNaming
export const Ago = (props: IAgoProps) => (
  <div>
    <Menu />
    <Composer text={props.newDraft} />
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div>
        <h2>Items ({props.items && props.items.length}) </h2>
        <NoteList
          aboveDrafts={props.aboveDrafts}
          belowDrafts={props.belowDrafts}
          newDraft={props.newDraft}
          items={props.items}
          selectedItemId={props.selectedItemId}
          passphrase={props.passphrase} />
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
