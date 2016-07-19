/// <reference path="./../../Typings/react/react.d.ts"/>
import * as React from "react";

import { IState } from "./../Models/IState";
import { LoginPage } from "./Pages/LoginPage";
import { IndexPage } from "./Pages/IndexPage";

export interface IAgoProps extends IState {

}

// ReSharper disable once InconsistentNaming
export const Ago = (props: IAgoProps) => props.isLoggedIn ? <IndexPage {...props} /> : <LoginPage />;
