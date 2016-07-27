define(["require", "exports", "react", "./../../ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    var handleKeyDown = function (event) {
        if (event.keyCode === 13) {
            ActionCreators_1.login();
        }
    };
    // ReSharper disable once InconsistentNaming
    exports.LoginPage = function (props) { return (React.createElement("div", {style: { display: "flex", flexDirection: "column", maxWidth: 600, margin: "0 auto" }}, React.createElement("h1", null, "Ago.today"), React.createElement("label", null, "User name: "), React.createElement("input", null), React.createElement("label", null, "Passphrase: "), React.createElement("input", {type: "password"}), React.createElement("label", null, "Encryption key: "), React.createElement("input", {onChange: function (event) { return ActionCreators_1.setPassphrase(event.currentTarget.value); }, onKeyDown: function (event) { return handleKeyDown(event); }, type: "password"}), React.createElement("button", {onClick: function (event) { return ActionCreators_1.login(); }}, "Log in"))); };
});
//# sourceMappingURL=LoginPage.js.map