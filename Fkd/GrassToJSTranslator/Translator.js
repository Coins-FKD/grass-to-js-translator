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
					'function stringToUTF8(string) {\n',
					'\tvar UTF8 = [];\n',
					'\tfor (var i = 0; i < string.length;) {\n',
					'\t\tvar highSurrogate = string.charCodeAt(i);\n',
					'\t\tvar lowSurrogate = string.charCodeAt(i + 1);\n',
					'\t\tvar codePoint;\n',
					'\t\tif (0xd800 <= highSurrogate && highSurrogate <= 0xdbff) {\n',
					'\t\t\tif (0xdc00 <= lowSurrogate && lowSurrogate <= 0xdfff) {\n',
					'\t\t\t\tcodePoint = (highSurrogate - 0xd800 << 10) + (lowSurrogate - 0xdc00) + 0x10000;\n',
					'\t\t\t\ti += 2;\n',
					'\t\t\t} else {\n',
					'\t\t\t\tthrow new Error("illegal string");\n',
					'\t\t\t}\n',
					'\t\t} else if (0xdc00 <= highSurrogate && highSurrogate <= 0xdfff) {\n',
					'\t\t\tthrow new Error("illegal string");\n',
					'\t\t} else {\n',
					'\t\t\tcodePoint = highSurrogate;\n',
					'\t\t\ti++;\n',
					'\t\t}\n',
					'\t\t\n',
					'\t\tif (0x0000 <= codePoint && codePoint <= 0x007f) {\n',
					'\t\t\tUTF8.push(codePoint);\n',
					'\t\t} else if (0x0080 <= codePoint && codePoint <= 0x07ff) {\n',
					'\t\t\tUTF8.push((codePoint >>> 6) + 0xc0, (codePoint & 0x3f) + 0x80);\n',
					'\t\t} else if (0x0800 <= codePoint && codePoint <= 0xffff) {\n',
					'\t\t\tUTF8.push((codePoint >>> 12) + 0xe0, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
					'\t\t} else if (0x10000 <= codePoint && codePoint <= 0x1fffff) {\n',
					'\t\t\tUTF8.push((codePoint >>> 18) + 0xf0, (codePoint >>> 12 & 0x3f) + 0x80, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
					'\t\t} else if (0x200000 <= codePoint && codePoint <= 0x3ffffff) {\n',
					'\t\t\tUTF8.push((codePoint >>> 24) + 0xf8, (codePoint >>> 18 & 0x3f) + 0x80, (codePoint >>> 12 & 0x3f) + 0x80, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
					'\t\t} else if (0x4000000 <= codePoint && codePoint <= 0x7fffffff) {\n',
					'\t\t\tUTF8.push((codePoint >>> 30) + 0xfc, (codePoint >>> 24 & 0x3f) + 0x80, (codePoint >>> 18 & 0x3f) + 0x80, (codePoint >>> 12 & 0x3f) + 0x80, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
					'\t\t}\n',
					'\t}\n',
					'\treturn UTF8;\n',
					'}\n',
					new s.Context(new g.IndentMaker(this._indentMaker.indentSize, 2)).parse(grassCode)
				]
				.join(""), 0);
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	};
})();
