(function() {
        "use strict";
        new Function("return this")().Fkd = new Function("return this")().Fkd || {};
        Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
        var g = Fkd.GrassToJSTranslator;
        var u = Fkd.Utility;

	g.Context = function(indentSize) {
		if (arguments.length == 1 && u.isUInt(indentSize)) {
			this.state = g.InitialState.getInstance();
			this.upperCaseWCountInFunctionApplication = 0;
			this.lowerCaseWCountInFunctionApplication = 0;
			this.line = 1;
			this._indentSize = indentSize;
			this.indentLevel = 0;
			this.header = "";
			this.footer = "";
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	};
	g.Context.prototype.parse = function(grassCode) {
		for (var i = 0; this.state != null; i++) {
			this.state.scan(this, grassCode.charAt(i));
		}
		return this.header + this.footer;
	};

	var functionDefinitionHeader =
		"stack.unshift((function(stack) {\n";
	var functionDefinitionArgumentHeader = 
		"return function(x) {\n" +
		"\treturn (function(stack) {\n";
	var functionApplication =
		"stack.unshift(stack[%d](stack[%d]));\n";
	var functionBodyFooter =
		"return stack[0];\n";
	var functionDefinitionArgumentFooter =
		"\t})([x].concat(stack));\n" +
		"};\n";
	var functionDefinitionFooter =
		"})(stack.slice()));\n";

	g.Context.prototype.getFunctionDefinitionHeader = function() {
		return this._getStringWithIndent(functionDefinitionHeader, this.indentLevel);
	};
	g.Context.prototype.getFunctionDefinitionArgumentHeader = function(additionalIndentLevel) {
		return this._getStringWithIndent(functionDefinitionArgumentHeader, this.indentLevel + additionalIndentLevel);
	};
	g.Context.prototype.getFunctionApplication = function(additionalIndentLevel) {
		return this._getStringWithIndent(functionApplication.replace(/%d/g, function(v, i) {
			return [this.upperCaseWCountInFunctionApplication - 1, this.lowerCaseWCountInFunctionApplication - 1][i];
		}), this.indentLevel + additionalIndentLevel);
	};
	g.Context.prototype.getFunctionBodyFooter = function(additionalIndentLevel) {
		return this._getStringWithIndent(functionBodyFooter, this.indentLevel + additionalIndentLevel);
	};
	g.Context.prototype.getFunctionDefinitionArgumentFooter = function(additionalIndentLevel) {
		return this._getStringWithIndent(functionDefinitionArgumentFooter, this.indentLevel + additionalIndentLevel);
	};
	g.Context.prototype.getFunctionDefinitionFooter = function() {
		return this._getStringWithIndent(functionDefinitionFooter, this.indentLevel);
	};
        g.Context.prototype._getStringWithIndent = function(string, indentLevel) {
                if (arguments.length == 2 && new Object(string) instanceof String && u.isUInt(indentLevel)) {
                        var indent = u.range(0, indentLevel * this._indentSize).map(function(v) {return " "}).join("");
			string = string.replace(/\t/g, u.range(0, this._indentSize).map(function(v) {return " "}).join(""));
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
