/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";

export interface IMenuProps {
  itemCount: number;
  taskCount: number;
  notificationCount: number;
}

const menuItemStyle = {
  background: "#0080ff",
  border: "1px solid #000",
  borderRadius: 2.5,
  color: "#fff",
  cursor: "pointer",
  font: "normal 12pt sans-serif",
  padding: 5,
  textDecoration: "none"
};

const handleImportClick = (event: React.MouseEvent) => {
  document.getElementById("importFileInput").click();
};

const handleImportFileChange = (event: React.FormEvent) => {
  document.getElementById("importSubmitInput").click();
};

import {
  navigateToItemListPage,
  navigateToTaskListPage,
  navigateToNotificationListPage,
  navigateToBudgetListPage
} from "./../../ActionCreators";

// ReSharper disable once InconsistentNaming
export const Menu = (props: IMenuProps) => (
  <div style={{ background: "silver", display: "flex", padding: 5 }}>
    <button onClick={handleImportClick} style={menuItemStyle}>Import</button>
    <a href="/Ago/Export" style={menuItemStyle}>Export</a>
    <form action="/Ago/Import" method="post" encType="multipart/form-data" style={{ display: "none" }}>
      <input onChange={handleImportFileChange} id="importFileInput" name="file" type="file" />
      <input id="importSubmitInput" type="submit" />
    </form>
    <button onClick={event => navigateToItemListPage() }>Items ({props.itemCount})</button>
    <button onClick={event => navigateToTaskListPage() }>Tasks ({props.taskCount})</button>
    <button onClick={event => navigateToNotificationListPage() }>Notificatons ({props.notificationCount})</button>
    <button onClick={event => navigateToBudgetListPage() }>Budgets</button>
  </div>);
