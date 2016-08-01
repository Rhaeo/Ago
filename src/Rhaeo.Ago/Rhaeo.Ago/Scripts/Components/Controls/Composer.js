var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
define(["require", "exports", "react", "./../../ActionCreators"], function (require, exports, React, ActionCreators_1) {
    "use strict";
    const handleChange = (event) => {
        ActionCreators_1.changeComposerText(event.currentTarget.value);
    };
    const handleKeyDown = (event) => __awaiter(this, void 0, void 0, function* () {
        if (event.keyCode === 13) {
            yield ActionCreators_1.encryptAndSubmit(event.currentTarget.value, this.props.passphrase);
            event.preventDefault();
            // Hide software keyboard on mobile after sending.
            event.currentTarget.blur();
        }
    });
    // ReSharper disable once InconsistentNaming
    exports.Composer = (props) => (React.createElement("div", {style: { display: "flex" }}, React.createElement("textarea", {onChange: event => handleChange(event), onKeyDown: event => handleKeyDown(event), placeholder: "Compose an item…", style: { flex: 1, padding: 10 }, value: props.text})));
});
//# sourceMappingURL=Composer.js.map