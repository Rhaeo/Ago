/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";

export interface INavigationProps {
}

// ReSharper disable once InconsistentNaming
export const Navigation = (props: INavigationProps) => (
  <div style={{ background: "gray", bottom: 0, position: "fixed", right: 0 }}>
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }} />
      <button>up</button>
      <span style={{ flex: 1 }} />
    </div>
    <div style={{ display: "flex" }}>
      <button>left</button>
      <span style={{ flex: 1 }} />
      <button>right</button>
    </div>
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }} />
      <button>down</button>
      <span style={{ flex: 1 }} />
    </div>
  </div>);
