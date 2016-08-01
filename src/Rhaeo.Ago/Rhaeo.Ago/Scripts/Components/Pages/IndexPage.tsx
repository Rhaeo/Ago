/// <reference path="./../../../Typings/react/react.d.ts"/>
import * as React from "react";

import { IState } from "./../../Models/IState";
import { Menu } from "./../Controls/Menu";
import { Composer } from "./../Controls/Composer";
import { NoteList } from "./../Controls/NoteList";
import { changeComposerText, encryptAndSubmit, markItemById, removeItemById, swapItemsByIds } from "./../../ActionCreators";
import { Navigation } from "./../Controls/Navigation";
import { TaskListPage } from "./TaskListPage";

export interface IIndexPageProps extends IState {
}

function getSelectedTab(props: IIndexPageProps) {
  switch (props.selectedTab) {
    case "Items":
      return (
        <div>
          <h2>Items ({props.items && props.items.length}) </h2>
          <NoteList
            aboveDrafts={props.aboveDrafts}
            belowDrafts={props.belowDrafts}
            cleartexts={props.cleartexts}
            newDraft={props.newDraft}
            items={props.items}
            selectedItemId={props.selectedItemId}
            passphrase={props.passphrase} />
        </div>);
    case "Tasks":
      return (
        <TaskListPage
          passphrase={props.passphrase}
          encryptAndSubmit={(draft, passphrase) => encryptAndSubmit(draft, passphrase) } />);
    case "Notifications":
      return (
        <div>
          <h2>Notifications ({props.notifications && props.notifications.length}) </h2>
          <ul>
            {props.notifications && props.notifications.map(n => (
              <li key={n.message}>
                {n.message}
              </li>)) }
          </ul>
        </div>);
  }

  throw new Error(`Unknown tab ${props.selectedTab}.`);
}

// ReSharper disable once InconsistentNaming
export const IndexPage = (props: IIndexPageProps) => (
  <div>
    <Menu
      itemCount={props.items && props.items.length}
      taskCount={0}
      notificationCount={props.notifications && props.notifications.length} />
    <Composer text={props.newDraft} passphrase={props.passphrase} />
    <div style={{ maxWidth: 800, margin: "0 auto" }}>{getSelectedTab(props) }</div>
    <Navigation />
  </div>);
