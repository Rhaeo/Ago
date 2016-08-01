define(["require", "exports", "react", "./../../ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    const handleChange = (event) => ActionCreators_1.updateNewDraft(event.currentTarget.value);
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            ActionCreators_1.commitNewDraft();
        }
    };
    // ReSharper disable once InconsistentNaming
    exports.NoteDraft = (props) => (React.createElement("div", null, React.createElement("textarea", {onChange: event => handleChange(event), onKeyDown: event => handleKeyDown(event), style: { width: "100%" }, value: props.value})));
});
//# sourceMappingURL=NoteDraft.js.map