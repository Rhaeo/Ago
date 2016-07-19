define(["require", "exports", "react", "./Note", "./NoteDraft", "./../../Actions/ActionCreators", "./../../Helpers/Encryption"], function (require, exports, React, Note_1, NoteDraft_1, ActionCreators_1, Encryption_1) {
    "use strict";
    // ReSharper disable once InconsistentNaming
    exports.NoteList = function (props) { return (React.createElement("div", {onMouseOut: function (event) { return ActionCreators_1.electPivotItem(null); }}, props.items.length > 0
        ? props.items.map(function (i, index) { return (React.createElement(Note_1.Note, {cleartext: Encryption_1.decrypt(i.item.cyphertext, props.passphrase, i.item.salt, i.item.iV), aboveDraft: props.aboveDrafts[i.item.id], aboveId: i.prevId, belowDraft: props.belowDrafts[i.item.id], belowId: i.nextId, key: i.item.id, id: i.item.id, isSelected: i.item.id === props.selectedItemId, isAlone: props.items.length === 1, isAlternated: index % 2 === 0, isMarked: i.item.isMarked})); })
        : React.createElement(NoteDraft_1.NoteDraft, {value: props.newDraft}))); };
});
//# sourceMappingURL=NoteList.js.map