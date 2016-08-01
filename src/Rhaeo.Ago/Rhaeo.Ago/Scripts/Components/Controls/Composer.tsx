/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";

import { changeComposerText, encryptAndSubmit } from "./../../ActionCreators";

export interface IComposerProps {
  text: string;
  passphrase: string;
}

const handleChange = (event: React.FormEvent) => {
  changeComposerText((event.currentTarget as HTMLInputElement).value);
};

const handleKeyDown = async (event: React.KeyboardEvent) => {
  if (event.keyCode === 13) {
    await encryptAndSubmit((event.currentTarget as HTMLInputElement).value, this.props.passphrase);
    event.preventDefault();

    // Hide software keyboard on mobile after sending.
    (event.currentTarget as HTMLInputElement).blur();
  }
};

// ReSharper disable once InconsistentNaming
export const Composer = (props: IComposerProps) => (
  <div style={{ display: "flex" }}>
    <textarea
      onChange={event => handleChange(event) }
      onKeyDown={event => handleKeyDown(event) }
      placeholder="Compose an item…"
      style={{ flex: 1, padding: 10 }}
      value={props.text} />
  </div>);
