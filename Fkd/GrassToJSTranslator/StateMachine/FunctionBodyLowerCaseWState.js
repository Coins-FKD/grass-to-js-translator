(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
    Fkd.GrassToJSTranslator.StateMachine = Fkd.GrassToJSTranslator.StateMachine || {};
    var g = Fkd.GrassToJSTranslator;
    var s = Fkd.GrassToJSTranslator.StateMachine;
    var u = Fkd.Utility;

    var isPrivate = true;
    s.FunctionBodyLowerCaseWState = function() {
        if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
    };
    var instance = new s.FunctionBodyLowerCaseWState();
    s.FunctionBodyLowerCaseWState.getInstance = function() {
        return instance;
    };
    s.FunctionBodyLowerCaseWState.prototype.scan = function(context, character) {
        if (arguments.length == 2 && context instanceof s.Context && new Object(character) instanceof String && character.length <= 1) {
            switch (character) {
                case "W": case "\uff37":
                    context.header += context.getFunctionApplication(0);
                    context.upperCaseWCountInFunctionApplication = 1;
                    context.state = s.FunctionBodyUpperCaseWState.getInstance();
                    break;
                case "w": case "\uff57":
                    context.lowerCaseWCountInFunctionApplication++;
                    break;
                case "v": case "\uff56":
                    context.header = context.header + context.getFunctionApplication(0) + context.getFunctionBodyFooter(0) + context.footer;
                    context.footer = "";
                    context.indentLevel = 0;
                    context.state = s.LowerVState.getInstance();
                    break;
                case "":
                    context.header = context.header + context.getFunctionApplication(0) + context.getFunctionBodyFooter(0) + context.footer;
                    context.footer = "";
                    context.indentLevel = 0;
                    context.state = null;
                    break;
                case "\n":
                    context.line++;
                    break;
            }
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
    isPrivate = false;
})();
