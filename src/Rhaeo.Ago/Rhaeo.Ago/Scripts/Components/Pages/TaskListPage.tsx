import * as React from "react";

export interface ITaskListPageProps extends React.Props<TaskListPage> {
  
}

export interface ITaskListPageState {
  
}

export class TaskListPage extends React.Component<ITaskListPageProps, ITaskListPageState> {
  render() {
    return (
      <div>
        <h2>Tasks</h2>

      </div>);
  }
}
