(function() {
        "use strict";
        new Function("return this")().Fkd = new Function("return this")().Fkd || {};
        Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
        var g = Fkd.GrassToJSTranslator;
        var u = Fkd.Utility;

	var isPrivate = true;
	g.FunctionApplicationUpperCaseWState = function() {
		if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
	};
	var instance = new g.FunctionApplicationUpperCaseWState();
	g.FunctionApplicationUpperCaseWState.getInstance = function() {
		return instance;
	};
	g.FunctionApplicationUpperCaseWState.prototype.scan = function(context, character) {
		if (arguments.length == 2 && context instanceof g.Context && new Object(character) instanceof String && character.length <= 1) {
			switch (character) {
			case "W": case "\uff37":
			context.upperCaseWCountInFunctionApplication++;
			break;
			case "w": case "\uff57":
			context.lowerCaseWCountInFunctionApplication = 1;
			context.state = g.FunctionApplicationLowerCaseWState.getInstance();
			break;
			case "v": case "\uff56":
			throw new Error("unexpected 'v' on line " + context.line);
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
