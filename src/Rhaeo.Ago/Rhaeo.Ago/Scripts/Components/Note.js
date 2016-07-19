define(["require", "exports", "react", "./../Actions/ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    var handleAboveChange = function (event, id) { return ActionCreators_1.updateAboveDraft(id, event.currentTarget.value); };
    var handleAboveKeyDown = function (event, id) {
        if (event.keyCode === 13) {
            ActionCreators_1.commitAboveDraft(id);
            event.preventDefault();
        }
    };
    var handleBelowChange = function (event, id) { return ActionCreators_1.updateBelowDraft(id, event.currentTarget.value); };
    var handleBelowKeyDown = function (event, id) {
        if (event.keyCode === 13) {
            ActionCreators_1.commitBelowDraft(id);
            event.preventDefault();
        }
    };
    var handleChange = function (event, id) { return ActionCreators_1.updateBelowDraft(id, event.currentTarget.value); };
    // ReSharper disable once InconsistentNaming
    exports.Note = function (props) { return (React.createElement("div", {onMouseOver: function (event) { return ActionCreators_1.electPivotItem(props.id); }, style: { background: props.isAlternated ? "none" : "silver", display: "flex" }}, props.isAlone ? null : React.createElement("button", {onClick: function (event) { return ActionCreators_1.moveAbove(props.id, props.aboveId); }}, "↑"), props.isAlone ? null : React.createElement("button", {onClick: function (event) { return ActionCreators_1.moveBelow(props.id, props.belowId); }}, "↓"), React.createElement("input", {checked: props.isMarked, type: "checkbox"}), React.createElement("div", {style: { display: "flex", flex: "1 0 0", flexDirection: "column" }}, React.createElement("input", {onChange: function (event) { return handleAboveChange(event, props.id); }, onKeyDown: function (e) { return handleAboveKeyDown(e, props.id); }, style: { display: props.isSelected ? "block" : "none", flex: "1 0 0" }, value: props.aboveDraft}), React.createElement("input", {onChange: function (event) { return handleChange(event, props.id); }, style: { flex: "1 0 0" }, value: props.cleartext}), React.createElement("input", {onChange: function (e) { return handleBelowChange(e, props.id); }, onKeyDown: function (e) { return handleBelowKeyDown(e, props.id); }, style: { display: props.isSelected ? "block" : "none", flex: "1 0 0" }, value: props.belowDraft})), React.createElement("button", {onClick: function (event) { return ActionCreators_1.removeItemById(props.id); }}, "✕"))); };
});
//# sourceMappingURL=Note.js.map