define(["require", "exports", "react", "./../../ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    const handleChange = (event) => {
        ActionCreators_1.changeComposerText(event.currentTarget.value);
    };
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            ActionCreators_1.createNewTask(event.currentTarget.value, this.props.passphrase);
            event.preventDefault();
            // Hide software keyboard on mobile after sending.
            event.currentTarget.blur();
        }
    };
    // ReSharper disable once InconsistentNaming
    exports.Composer = (props) => (React.createElement("div", {style: { display: "flex" }}, React.createElement("textarea", {onChange: event => handleChange(event), onKeyDown: event => handleKeyDown(event), placeholder: "Compose the item…", style: { flex: 1, padding: 10 }, value: props.text})));
});
//# sourceMappingURL=Composer.js.map