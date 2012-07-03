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
					'(function() {\n',
					'\t"use strict";\n',
                                        '\tfunction stringToUTF8(string) {\n',
                                        '\t\tvar UTF8 = [];\n',
                                        '\t\tfor (var i = 0; i < string.length;) {\n',
                                        '\t\t\tvar highSurrogate = string.charCodeAt(i);\n',
                                        '\t\t\tvar lowSurrogate = string.charCodeAt(i + 1);\n',
                                        '\t\t\tvar codePoint;\n',
                                        '\t\t\tif (0xd800 <= highSurrogate && highSurrogate <= 0xdbff) {\n',
                                        '\t\t\t\tif (0xdc00 <= lowSurrogate && lowSurrogate <= 0xdfff) {\n',
                                        '\t\t\t\t\tcodePoint = (highSurrogate - 0xd800 << 10) + (lowSurrogate - 0xdc00) + 0x10000;\n',
                                        '\t\t\t\t\ti += 2;\n',
                                        '\t\t\t\t} else {\n',
                                        '\t\t\t\t\tthrow new Error("illegal string");\n',
                                        '\t\t\t\t}\n',
                                        '\t\t\t} else if (0xdc00 <= highSurrogate && highSurrogate <= 0xdfff) {\n',
                                        '\t\t\t\tthrow new Error("illegal string");\n',
                                        '\t\t\t} else {\n',
                                        '\t\t\t\tcodePoint = highSurrogate;\n',
                                        '\t\t\t\ti++;\n',
                                        '\t\t\t}\n',
                                        '\t\t\t\n',
                                        '\t\t\tif (0x0000 <= codePoint && codePoint <= 0x007f) {\n',
                                        '\t\t\t\tUTF8.push(codePoint);\n',
                                        '\t\t\t} else if (0x0080 <= codePoint && codePoint <= 0x07ff) {\n',
                                        '\t\t\t\tUTF8.push((codePoint >>> 6) + 0xc0, (codePoint & 0x3f) + 0x80);\n',
                                        '\t\t\t} else if (0x0800 <= codePoint && codePoint <= 0xffff) {\n',
                                        '\t\t\t\tUTF8.push((codePoint >>> 12) + 0xe0, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
                                        '\t\t\t} else if (0x10000 <= codePoint && codePoint <= 0x10ffff) {\n',
                                        '\t\t\t\tUTF8.push((codePoint >>> 18) + 0xf0, (codePoint >>> 12 & 0x3f) + 0x80, (codePoint >>> 6 & 0x3f) + 0x80, (codePoint & 0x3f) + 0x80);\n',
                                        '\t\t\t}\n',
                                        '\t\t}\n',
                                        '\t\treturn UTF8;\n',
                                        '\t}\n',
					'\tvar stdin = [];\n',
					'\tvar isEOF = false;\n',
					'\tvar stdout = [];\n',
					'\tfunction T(x) {\n',
					'\t\treturn function(y) {\n',
					'\t\t\treturn x;\n',
					'\t\t};\n',
					'\t}\n',
					'\tfunction F(x) {\n',
					'\t\treturn function(y) {\n',
					'\t\t\treturn y;\n',
					'\t\t};\n',
					'\t}\n',
					'\tfunction In(x) {\n',
					'\t\tif (isEOF) return x;\n',
					'\t\tif (stdin.length > 0) return stdin.shift();\n',
					'\t\tvar inputAsString = prompt("", "");\n',
					'\t\tif (inputAsString == null || inputAsString == "") {\n',
					'\t\t\tisEOF = true;\n',
					'\t\t\treturn x;\n',
					'\t\t}\n',
					'\t\tArray.prototype.push.apply(stdin, stringToUTF8(inputAsString));\n',
					'\t\treturn stdin.shift();\n',
					'\t}\n',
					'\tvar characters = [];\n',
					'\tfor(var i = 0; i < 0x100; i++) {\n',
					'\t\t(function(i){\n',
					'\t\t\tcharacters[i] = function(x) {\n',
					'\t\t\t\tif(x.isCharFunc && characters[i].instance == x.instance) return T;\n',
					'\t\t\t\telse return F;\n',
					'\t\t\t};\n',
					'\t\t\tcharacters[i].isCharFunc = true;\n',
					'\t\t\tcharacters[i].instance = i;\n',
					'\t\t})(i);\n',
					'\t}\n',
					'\tvar w = characters[0x77];\n',
					'\tfunction Succ(x) {\n',
					'\t\tif (!x.isCharFunc) throw new Error("\'Succ\' called by non-char function");\n',
					'\t\treturn characters[(x.instance + 1) % 0x100];\n',
					'\t}\n',
					'\tfunction Out(x) {\n',
					'\t\tif (!x.isCharFunc) throw new Error("\'Out\' called by non-char function");\n',
					'\t\tstdout.push(x.instance);\n',
					'\t\treturn x;\n',
					'\t}\n',
					'\tvar stack = [Out, Succ, w, In];\n',
					new s.Context(new g.IndentMaker(this._indentMaker.indentSize, 1)).parse(grassCode),
					'\tstack[0](stack[0]);\n',
					'\treturn stdout;\n',
                                        '})();\n'
				]
				.join(""), 0);
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	};
})();
