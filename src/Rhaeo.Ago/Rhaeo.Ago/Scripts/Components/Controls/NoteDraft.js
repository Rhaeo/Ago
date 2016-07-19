define(["require", "exports", "react", "./../../Actions/ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    var handleChange = function (event) { return ActionCreators_1.updateNewDraft(event.currentTarget.value); };
    var handleKeyDown = function (event) {
        if (event.keyCode === 13) {
            ActionCreators_1.commitNewDraft();
        }
    };
    // ReSharper disable once InconsistentNaming
    exports.NoteDraft = function (props) { return (React.createElement("div", null, React.createElement("textarea", {onChange: function (event) { return handleChange(event); }, onKeyDown: function (event) { return handleKeyDown(event); }, style: { width: "100%" }, value: props.value}))); };
});
//# sourceMappingURL=NoteDraft.js.map