/// <reference path="./../../Typings/react/react.d.ts"/>
import * as React from "react";

import { changeComposerText, createNewTask } from "./../Actions/ActionCreators";

export interface IComposerProps {
    text: string;
}

const handleChange = (event: React.FormEvent) => {
    changeComposerText((event.currentTarget as HTMLInputElement).value);
};

const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
        createNewTask((event.currentTarget as HTMLInputElement).value);
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
            placeholder="Compose the item…"
            style={{ flex: 1, padding: 10 }}
            value={props.text} />
    </div>);
