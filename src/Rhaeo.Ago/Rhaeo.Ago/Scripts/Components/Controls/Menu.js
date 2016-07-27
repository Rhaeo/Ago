define(["require", "exports", "react", "./../../ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    var menuItemStyle = {
        background: "#0080ff",
        border: "1px solid #000",
        borderRadius: 2.5,
        color: "#fff",
        cursor: "pointer",
        font: "normal 12pt sans-serif",
        padding: 5,
        textDecoration: "none"
    };
    var handleImportClick = function (event) {
        document.getElementById("importFileInput").click();
    };
    var handleImportFileChange = function (event) {
        document.getElementById("importSubmitInput").click();
    };
    // ReSharper disable once InconsistentNaming
    exports.Menu = function (props) { return (React.createElement("div", {style: { background: "silver", display: "flex", padding: 5 }}, React.createElement("button", {onClick: handleImportClick, style: menuItemStyle}, "Import"), React.createElement("a", {href: "/Ago/Export", style: menuItemStyle}, "Export"), React.createElement("form", {action: "/Ago/Import", method: "post", encType: "multipart/form-data", style: { display: "none" }}, React.createElement("input", {onChange: handleImportFileChange, id: "importFileInput", name: "file", type: "file"}), React.createElement("input", {id: "importSubmitInput", type: "submit"})), React.createElement("button", {onClick: function (event) { return ActionCreators_1.navigateToItemListPage(); }}, "Items (", props.itemCount, ")"), React.createElement("button", {onClick: function (event) { return ActionCreators_1.navigateToTaskListPage(); }}, "Tasks (", props.taskCount, ")"), React.createElement("button", {onClick: function (event) { return ActionCreators_1.navigateToNotificationListPage(); }}, "Notificatons (", props.notificationCount, ")"))); };
});
//# sourceMappingURL=Menu.js.map