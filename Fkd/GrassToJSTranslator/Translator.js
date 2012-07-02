(function() {
	"use strict";
	new Function("return this")().Fkd = new Function("return this")().Fkd || {};
	Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
	Fkd.GrassToJSTranslator.StateMachine = Fkd.GrassToJSTranslator.StateMachine || {};
	var g = Fkd.GrassToJSTranslator;
	var s = Fkd.GrassToJSTranslator.StateMachine;
	var u = Fkd.Utility;

	g.Translator = function(indentMaker) {
		if (arguments.length == 1 && indentMaker instanceof g.IndentMaker) {
			this._indentMaker = indentMaker;
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	};
	g.Translator.prototype.toJS = function(grassCode) {
		if (arguments.length == 1 && new Object(grassCode) instanceof String) {
			return this._indentMaker.indent(
				[
					"\t\n",
					new s.Context(new g.IndentMaker(this._indentMaker.indentSize, 2)).parse(grassCode)
				]
				.join(""), 0);
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	};
})();
