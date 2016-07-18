/// <reference path="./../../Typings/react/react.d.ts"/>
import * as React from "react";

import { changeComposerText, createNewTask } from "./../Actions/ActionCreators";

export interface IComposerProps {
    text: string;
}

const handleChange = (event: React.FormEvent) => {
    changeComposerText((event.currentTarget as HTMLInputElement).value);
};

const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
        createNewTask((event.currentTarget as HTMLInputElement).value);
    }
};

// ReSharper disable once InconsistentNaming
export const Composer = (props: IComposerProps) => (
    <div>
        <input
            onChange={event => handleChange(event) }
            onKeyPress={event => handleKeyPress(event) }
            placeholder="Compose the item…"
            style={{ width: "100%", padding: 10 }}
            value={props.text} />
    </div>);
