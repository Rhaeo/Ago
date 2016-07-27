/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";

import { updateNewDraft, commitNewDraft } from "./../../ActionCreators";

export interface INoteDraftProps {
  value: string;
}

const handleChange = (event: React.FormEvent) => updateNewDraft((event.currentTarget as HTMLInputElement).value);

const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.keyCode === 13) {
    commitNewDraft();
  }
};

// ReSharper disable once InconsistentNaming
export const NoteDraft = (props: INoteDraftProps) => (
  <div>
    <textarea
      onChange={event => handleChange(event) }
      onKeyDown={event => handleKeyDown(event) }
      style={{ width: "100%" }}
      value={props.value} />
  </div>);
