define(["require", "exports", "react", "./../Actions/ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    var handleChange = function (event) {
        ActionCreators_1.changeComposerText(event.currentTarget.value);
    };
    var handleKeyDown = function (event) {
        if (event.keyCode === 13) {
            ActionCreators_1.createNewTask(event.currentTarget.value);
            event.preventDefault();
            // Hide software keyboard on mobile after sending.
            event.currentTarget.blur();
        }
    };
    // ReSharper disable once InconsistentNaming
    exports.Composer = function (props) { return (React.createElement("div", {style: { display: "flex" }}, React.createElement("textarea", {onChange: function (event) { return handleChange(event); }, onKeyDown: function (event) { return handleKeyDown(event); }, placeholder: "Compose the item…", style: { flex: 1, padding: 10 }, value: props.text}))); };
});
//# sourceMappingURL=Composer.js.map