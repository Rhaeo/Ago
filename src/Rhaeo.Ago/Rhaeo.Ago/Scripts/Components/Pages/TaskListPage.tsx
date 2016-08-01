import * as React from "react";

export interface ITaskListPageProps extends React.Props<TaskListPage> {
  passphrase: string;
  encryptAndSubmit: (draft: string, passphrase: string) => Promise<void>;
}

export interface ITaskListPageState {
  isSubmitting?: boolean;
  draft?: string;
}

export class TaskListPage extends React.Component<ITaskListPageProps, ITaskListPageState> {
  constructor() {
    super();
    this.state = {
      draft: ""
    };
  }

  handleDraftChange(event: React.FormEvent) {
    this.setState({ draft: (event.currentTarget as HTMLTextAreaElement).value });
  }

  async handleDraftKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      this.setState({ isSubmitting: true });
      await this.props.encryptAndSubmit(this.state.draft, this.props.passphrase);
      this.setState({ isSubmitting: false, draft: "" });
    }
  }

  render() {
    return (
      <div>
        <h2>Tasks</h2>
        <textarea
          disabled={this.state.isSubmitting}
          value={this.state.draft}
          onChange={event => this.handleDraftChange(event) }
          onKeyDown={event => this.handleDraftKeyDown(event) } />

      </div>);
  }
}
