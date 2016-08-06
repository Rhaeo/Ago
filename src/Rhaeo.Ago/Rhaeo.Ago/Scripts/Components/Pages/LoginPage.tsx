/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";

import { login } from "./../../ActionCreators";

export interface ILoginPageProps {
}

export interface ILoginPageState {
  passphrase: string;
}

// ReSharper disable once InconsistentNaming
export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor() {
    super();
    this.state = {
      passphrase: ""
    };
  }

  handlePassphraseChange = (event: React.FormEvent) => {
    const passphrase = (event.currentTarget as HTMLInputElement).value;
    this.setState({ passphrase });
  }

  handlePassphraseKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      login();
    }
  }

  handleLoginClick = () => {
    login();
  }

  render() {
    return <div style={{ display: "flex", flexDirection: "column", maxWidth: 600, margin: "0 auto" }}>
      <h1>Ago.today</h1>
      <label>User name: </label>
      <input />
      <label>Passphrase: </label>
      <input type="password" />
      <label>Encryption key: </label>
      <input
        onChange={this.handlePassphraseChange}
        onKeyDown={this.handlePassphraseKeyDown}
        type="password" />
      <button onClick={this.handleLoginClick}>Log in</button>
    </div>;
  }
}
