var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    class TaskListPage extends React.Component {
        constructor() {
            super();
            this.state = {
                draft: ""
            };
        }
        handleDraftChange(event) {
            this.setState({ draft: event.currentTarget.value });
        }
        handleDraftKeyDown(event) {
            return __awaiter(this, void 0, void 0, function* () {
                if (event.key === "Enter") {
                    this.setState({ isSubmitting: true });
                    yield this.props.encryptAndSubmit(this.state.draft, this.props.passphrase);
                    this.setState({ isSubmitting: false, draft: "" });
                }
            });
        }
        render() {
            return (React.createElement("div", null, React.createElement("h2", null, "Tasks"), React.createElement("textarea", {disabled: this.state.isSubmitting, value: this.state.draft, onChange: event => this.handleDraftChange(event), onKeyDown: event => this.handleDraftKeyDown(event)})));
        }
    }
    exports.TaskListPage = TaskListPage;
});
//# sourceMappingURL=TaskListPage.js.map