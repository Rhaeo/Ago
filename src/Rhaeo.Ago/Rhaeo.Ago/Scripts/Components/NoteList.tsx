/// <reference path="./../../Typings/react/react.d.ts"/>
import * as React from "react";

import { ILink } from "./../Models/ILink";
import { Note } from "./Note";
import { NoteDraft } from "./NoteDraft";
import { electPivotItem } from "./../Actions/ActionCreators";
import { decrypt } from "./../Helpers/Encryption";

export interface INoteProps {
  items: ILink[];
  aboveDrafts: { [id: string]: string },
  belowDrafts: { [id: string]: string },
  selectedItemId: string;
  newDraft: string;
  passphrase: string;
}

// ReSharper disable once InconsistentNaming
export const NoteList = (props: INoteProps) => (
  <div onMouseOut={event => electPivotItem(null) }>
    {props.items.length > 0
      ? props.items.map((i, index) => (
        <Note
          cleartext={decrypt(i.item.cyphertext, props.passphrase, i.item.salt, i.item.iV)}
          aboveDraft={props.aboveDrafts[i.item.id]}
          aboveId={i.prevId}
          belowDraft={props.belowDrafts[i.item.id]}
          belowId={i.nextId}
          key={i.item.id}
          id={i.item.id}
          isSelected={i.item.id === props.selectedItemId}
          isAlone={props.items.length === 1}
          isAlternated={index % 2 === 0}
          isMarked={i.item.isMarked} />))
      : <NoteDraft value={props.newDraft} /> }
  </div>);
