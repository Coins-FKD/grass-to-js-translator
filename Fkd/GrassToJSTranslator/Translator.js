(function() {
	"use strict";
	new Function("return this")().Fkd = new Function("return this")().Fkd || {};
	Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
	var g = Fkd.GrassToJSTranslator;
	var u = Fkd.Utility;

	g.Translator = function() {
		throw new Error(u.ErrorMessage.notImplemented);
	};
})();
