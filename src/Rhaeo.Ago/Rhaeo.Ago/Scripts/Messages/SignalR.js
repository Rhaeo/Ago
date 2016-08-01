define(["require", "exports"], function (require, exports) {
    "use strict";
    ;
    exports.$ = window["$"];
    function createNewTask(cyphertext, salt, iv) {
        return new Promise((resolve, reject) => {
            exports.$.connection.agoHub.server.createNewTask(cyphertext, salt, iv)
                .done(response => resolve(response))
                .fail(error => reject(error));
        });
    }
    exports.createNewTask = createNewTask;
});
//# sourceMappingURL=SignalR.js.map