define(["require", "exports", "react", "./../../ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    const handleAboveChange = (event, id) => ActionCreators_1.updateAboveDraft(id, event.currentTarget.value);
    const handleAboveKeyDown = (event, id) => {
        if (event.keyCode === 13) {
            ActionCreators_1.commitAboveDraft(id);
            event.preventDefault();
        }
    };
    const handleBelowChange = (event, id) => ActionCreators_1.updateBelowDraft(id, event.currentTarget.value);
    const handleBelowKeyDown = (event, id) => {
        if (event.keyCode === 13) {
            ActionCreators_1.commitBelowDraft(id);
            event.preventDefault();
        }
    };
    const handleChange = (event, id) => ActionCreators_1.updateBelowDraft(id, event.currentTarget.value);
    // ReSharper disable once InconsistentNaming
    exports.Note = (props) => (React.createElement("div", {onMouseOver: event => ActionCreators_1.electPivotItem(props.id), style: { background: props.isAlternated ? "none" : "silver", display: "flex" }}, props.isAlone ? null : React.createElement("button", {onClick: event => ActionCreators_1.moveAbove(props.id, props.aboveId)}, "↑"), props.isAlone ? null : React.createElement("button", {onClick: event => ActionCreators_1.moveBelow(props.id, props.belowId)}, "↓"), React.createElement("input", {checked: props.isMarked, type: "checkbox"}), React.createElement("div", {style: { display: "flex", flex: "1 0 0" }}, React.createElement("input", {onChange: event => handleAboveChange(event, props.id), onKeyDown: e => handleAboveKeyDown(e, props.id), style: { display: props.isSelected ? "block" : "none", flex: "1 0 0" }, value: props.aboveDraft}), React.createElement("input", {onChange: event => handleChange(event, props.id), style: { flex: "1 0 0" }, value: props.cleartext}), React.createElement("input", {onChange: e => handleBelowChange(e, props.id), onKeyDown: e => handleBelowKeyDown(e, props.id), style: { display: props.isSelected ? "block" : "none", flex: "1 0 0" }, value: props.belowDraft})), React.createElement("button", {onClick: event => ActionCreators_1.removeItemById(props.id)}, "✕")));
});
//# sourceMappingURL=Note.js.map