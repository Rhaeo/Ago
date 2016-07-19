var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "react", "./Pages/LoginPage", "./Pages/IndexPage"], function (require, exports, React, LoginPage_1, IndexPage_1) {
    "use strict";
    // ReSharper disable once InconsistentNaming
    exports.Ago = function (props) { return props.isLoggedIn ? React.createElement(IndexPage_1.IndexPage, __assign({}, props)) : React.createElement(LoginPage_1.LoginPage, null); };
});
//# sourceMappingURL=Ago.js.map