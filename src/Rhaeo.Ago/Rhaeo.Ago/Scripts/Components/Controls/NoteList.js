define(["require", "exports", "react", "./Note", "./NoteDraft", "./../../Actions/ActionCreators"], function (require, exports, React, Note_1, NoteDraft_1, ActionCreators_1) {
    "use strict";
    // ReSharper disable once InconsistentNaming
    exports.NoteList = function (props) { return (React.createElement("div", {onMouseOut: function (event) { return ActionCreators_1.electPivotItem(null); }}, props.items.length > 0
        ? props.items.map(function (i, index) { return (React.createElement(Note_1.Note, {cleartext: props.cleartexts[i.item.id], aboveDraft: props.aboveDrafts[i.item.id], aboveId: i.prevId, belowDraft: props.belowDrafts[i.item.id], belowId: i.nextId, key: i.item.id, id: i.item.id, isSelected: i.item.id === props.selectedItemId, isAlone: props.items.length === 1, isAlternated: index % 2 === 0, isMarked: i.item.isMarked})); })
        : React.createElement(NoteDraft_1.NoteDraft, {value: props.newDraft}))); };
});
//# sourceMappingURL=NoteList.js.map