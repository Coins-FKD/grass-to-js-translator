(function() {
        "use strict";
        new Function("return this")().Fkd = new Function("return this")().Fkd || {};
        Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
        var g = Fkd.GrassToJSTranslator;
        var u = Fkd.Utility;

	var isPrivate = true;
	g.FunctionDefinitionArgumentState = function() {
		if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
	};
	var instance = new g.FunctionDefinitionArgumentState();
	g.FunctionDefinitionArgumentState.getInstance = function() {
		return instance;
	};
	g.FunctionDefinitionArgumentState.prototype.scan = function(context, character) {
		if (arguments.length == 2 && context instanceof g.Context && new Object(character) instanceof String && character.length <= 1) {
			switch (character) {
			case "W":
			context.upperCaseWCountInFunctionApplication = 1;
			context.state = g.FunctionBodyUpperCaseWState.getInstance();
			break;
			case "w":
			context.header = context.header + context.getFunctionDefinitionArgumentHeader(0);
			context.footer = context.getFunctionDefinitionArgumentFooter(0) + context.footer;
			context.indentLevel += 2;
			break;
			case "v":
			context.header = context.header + context.getFunctionBodyFooter(0) + context.footer;
			context.footer = "";
			context.indentLevel = 0;
			context.state = g.LowerVState.getInstance();
			break;
			case "":
                        context.header = context.header + context.getFunctionBodyFooter(0) + context.footer;
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
