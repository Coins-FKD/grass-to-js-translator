(function() {
	"use strict";
	new Function("return this")().Fkd = new Function("return this")().Fkd || {};
	Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
	var g = Fkd.GrassToJSTranslator;
	var u = Fkd.Utility;

	g.Translator = function() {
		throw new Error(u.ErrorMessage.notImplemented);
	};
	g.Translator.prototype._getStringWithIndent = function(string, indentLevel) {
		if (arguments.length == 2 && new Object(string) instanceof String && u.isUInt(indentLevel)) {
			var indent = u.range(0, indentLevel * this._indentSize).map(function(v) {return " "}).join("");
			if (string[string.length - 1] == "\n") {
				return string.replace(/[^\n]*\n/g, function(line) {return indent + line});
			} else {
				return string.split("\n").map(function(v) {return indent + v}).join("\n");
			}
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	};
})();
