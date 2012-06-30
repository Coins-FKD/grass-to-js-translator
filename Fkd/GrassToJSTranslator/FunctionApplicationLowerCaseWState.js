(function() {
        "use strict";
        new Function("return this")().Fkd = new Function("return this")().Fkd || {};
        Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
        var g = Fkd.GrassToJSTranslator;
        var u = Fkd.Utility;

	var isPrivate = true;
	g.FunctionApplicationLowerCaseWState = function() {
		if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
	};
	var instance = new g.FunctionApplicationLowerCaseWState();
	g.FunctionApplicationLowerCaseWState.getInstance = function() {
		return instance;
	};
	g.FunctionApplicationLowerCaseWState.prototype.scan = function(context, character) {
		if (arguments.length == 2 && context instanceof g.Context && new Object(character) instanceof String && character.length <= 1) {
			switch (character) {
			case "W": case "\uff37":
			context.header += context.getFucnctionApplication(0);
			context.upperCaseWCountInFunctionApplication = 1;
			context.state = g.FunctionBodyUpperCaseWState.getInstance();
			break;
			case "w": case "\uff57":
			context.lowerCaseWCountInFunctionApplication++;
			break;
			case "v": case "\uff56":
			context.header += context.getFunctionApplication(0);
			context.state = g.LowerVState.getInstance();
			break;
			case "":
			context.header += context.header + context.getFunctionApplication(0);
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
