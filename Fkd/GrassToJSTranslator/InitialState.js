(function() {
        "use strict";
        new Function("return this")().Fkd = new Function("return this")().Fkd || {};
        Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
        var g = Fkd.GrassToJSTranslator;
        var u = Fkd.Utility;

	var isPrivate = true;
	g.InitialState = function() {
		if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
	};
	var instance = new g.InitialState();
	g.InitialState.getInstance = function() {
		return instance;
	};
	g.InitialState.prototype.scan = function(context, character) {
		if (arguments.length == 2 && context instanceof g.Context && new Object(character) instanceof String && character.length <= 1) {
			switch (character) {
			case "w":
			context.header = context.getFunctionDefinitionHeader() + context.getFunctionDefinitionArgumentHeader(1);
			context.footer = context.getFunctionDefinitionArgumentFooter(1) + context.getFunctionDefinitionFooter();
			context.indentLevel = 3;
			context.state = g.FunctionDefinitionArgumentState.getInstance();
			break;
			case "":
			throw new Error("unexpected EOF on line " + context.line);
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
