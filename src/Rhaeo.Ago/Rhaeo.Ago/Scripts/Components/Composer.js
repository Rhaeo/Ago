define(["require", "exports", "react", "./../Actions/ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    var handleChange = function (event) {
        ActionCreators_1.changeComposerText(event.currentTarget.value);
    };
    var handleKeyPress = function (event) {
        if (event.key === "Enter") {
            ActionCreators_1.createNewTask(event.currentTarget.value);
        }
    };
    // ReSharper disable once InconsistentNaming
    exports.Composer = function (props) { return (React.createElement("div", null, React.createElement("input", {onChange: function (event) { return handleChange(event); }, onKeyPress: function (event) { return handleKeyPress(event); }, placeholder: "Compose the item…", style: { width: "100%", padding: 10 }, value: props.text}))); };
});
//# sourceMappingURL=Composer.js.map