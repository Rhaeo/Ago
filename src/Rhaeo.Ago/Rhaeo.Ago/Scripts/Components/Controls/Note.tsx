/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";
import { IItem } from "./../Models/IItem";
import { electPivotItem, moveAbove, moveBelow, updateAboveDraft, commitAboveDraft, updateBelowDraft, commitBelowDraft, removeItemById } from "./../../Actions/ActionCreators";

export interface INoteProps {
  id: string;
  cleartext: string;
  aboveDraft: string;
  aboveId: string;
  belowDraft: string;
  belowId: string;
  isSelected: boolean;
  isAlone: boolean;
  isMarked: boolean;
  isAlternated: boolean;
}

const handleAboveChange = (event: React.FormEvent, id: string) => updateAboveDraft(id, (event.currentTarget as HTMLInputElement).value);

const handleAboveKeyDown = (event: React.KeyboardEvent, id: string) => {
  if (event.keyCode === 13) {
    commitAboveDraft(id);
    event.preventDefault();
  }
}

const handleBelowChange = (event: React.FormEvent, id: string) => updateBelowDraft(id, (event.currentTarget as HTMLInputElement).value);

const handleBelowKeyDown = (event: React.KeyboardEvent, id: string) => {
  if (event.keyCode === 13) {
    commitBelowDraft(id);
    event.preventDefault();
  }
}

const handleChange = (event: React.FormEvent, id: string) => updateBelowDraft(id, (event.currentTarget as HTMLInputElement).value);

// ReSharper disable once InconsistentNaming
export const Note = (props: INoteProps) => (
  <div onMouseOver={event => electPivotItem(props.id) } style={{ background: props.isAlternated ? "none" : "silver", display: "flex" }}>
    {props.isAlone ? null : <button onClick={event => moveAbove(props.id, props.aboveId) }>↑</button>}
    {props.isAlone ? null : <button onClick={event => moveBelow(props.id, props.belowId) }>↓</button>}
    <input checked={props.isMarked} type="checkbox" />
    <div style={{ display: "flex", flex: "1 0 0", flexDirection: "column" }}>
      <input
        onChange={event => handleAboveChange(event, props.id) }
        onKeyDown={e => handleAboveKeyDown(e, props.id) }
        style={{ display: props.isSelected ? "block" : "none", flex: "1 0 0" }}
        value={props.aboveDraft}/>
      <input onChange={event => handleChange(event, props.id)} style={{ flex: "1 0 0" }} value={props.cleartext} />
      <input
        onChange={e => handleBelowChange(e, props.id) }
        onKeyDown={e => handleBelowKeyDown(e, props.id) }
        style={{ display: props.isSelected ? "block" : "none", flex: "1 0 0" }}
        value={props.belowDraft}/>
    </div>
    <button onClick={event => removeItemById(props.id) }>✕</button>
  </div>);
