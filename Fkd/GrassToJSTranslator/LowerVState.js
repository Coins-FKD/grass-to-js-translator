(function() {
        "use strict";
        new Function("return this")().Fkd = new Function("return this")().Fkd || {};
        Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
        var g = Fkd.GrassToJSTranslator;
        var u = Fkd.Utility;

	var isPrivate = true;
	g.LowerVState = function() {
		if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
	};
	var instance = new g.LowerVState();
	g.LowerVState.getInstance = function() {
		return instance;
	};
	g.LowerVState.prototype.scan = function(context, character) {
		if (arguments.length == 2 && context instanceof g.Context && new Object(character) instanceof String && character.length <= 1) {
			switch (character) {
			case "W": case "\uff37":
			context.upperCaseWCountInFunctionApplication = 1;
			context.state = g.FunctionApplicationUpperCaseWState.getInstance();
			break;
			case "w": case "\uff57":
			context.header = context.header + context.getFunctionDefinitionHeader() + context.getFunctionDefinitionArgumentHeader(1);
			context.footer = context.getFunctionDefinitionArgumentFooter(1) + context.getFunctionDefinitionFooter();
			context.indentLevel = 3;
			context.state = g.FunctionDefinitionArgumentState.getInstance();
			break;
			case "v": case "\uff56":
			throw new Error("unexpected 'v' on line " + context.line);
			break;
			case "":
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
