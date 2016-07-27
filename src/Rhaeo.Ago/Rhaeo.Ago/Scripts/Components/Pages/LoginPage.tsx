/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";

import { setPassphrase, login } from "./../../Actions/ActionCreators";

export interface ILoginPageProps {
}

const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.keyCode === 13) {
    login();
  }
};

// ReSharper disable once InconsistentNaming
export const LoginPage = (props: ILoginPageProps) => (
  <div style={{ display: "flex", flexDirection: "column", maxWidth: 600, margin: "0 auto" }}>
    <h1>Ago.today</h1>
    <label>User name: </label>
    <input />
    <label>Passphrase: </label>
    <input type="password" />
    <label>Encryption key: </label>
    <input
      onChange={event => setPassphrase((event.currentTarget as HTMLInputElement).value) }
      onKeyDown={event => handleKeyDown(event)}
      type="password" />
    <button onClick={event => login()}>Log in</button>
  </div>);
