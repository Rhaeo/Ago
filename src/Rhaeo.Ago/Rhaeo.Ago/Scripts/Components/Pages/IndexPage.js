define(["require", "exports", "react", "./../Controls/Menu", "./../Controls/Composer", "./../Controls/NoteList", "./../Controls/Navigation", "./TaskListPage"], function (require, exports, React, Menu_1, Composer_1, NoteList_1, Navigation_1, TaskListPage_1) {
    "use strict";
    function getSelectedTab(props) {
        switch (props.selectedTab) {
            case "Items":
                return (React.createElement("div", null, React.createElement("h2", null, "Items (", props.items && props.items.length, ") "), React.createElement(NoteList_1.NoteList, {aboveDrafts: props.aboveDrafts, belowDrafts: props.belowDrafts, cleartexts: props.cleartexts, newDraft: props.newDraft, items: props.items, selectedItemId: props.selectedItemId, passphrase: props.passphrase})));
            case "Tasks":
                return React.createElement(TaskListPage_1.TaskListPage, null);
            case "Notifications":
                return (React.createElement("div", null, React.createElement("h2", null, "Notifications (", props.notifications && props.notifications.length, ") "), React.createElement("ul", null, props.notifications && props.notifications.map(n => (React.createElement("li", {key: n.message}, n.message))))));
        }
        throw new Error(`Unknown tab ${props.selectedTab}.`);
    }
    // ReSharper disable once InconsistentNaming
    exports.IndexPage = (props) => (React.createElement("div", null, React.createElement(Menu_1.Menu, {itemCount: props.items && props.items.length, taskCount: 0, notificationCount: props.notifications && props.notifications.length}), React.createElement(Composer_1.Composer, {text: props.newDraft, passphrase: props.passphrase}), React.createElement("div", {style: { maxWidth: 800, margin: "0 auto" }}, getSelectedTab(props)), React.createElement(Navigation_1.Navigation, null)));
});
//# sourceMappingURL=IndexPage.js.map