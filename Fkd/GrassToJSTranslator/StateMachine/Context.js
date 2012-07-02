(function() {
        "use strict";
        new Function("return this")().Fkd = new Function("return this")().Fkd || {};
        Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
	Fkd.GrassToJSTranslator.StateMachine = Fkd.GrassToJSTranslator.StateMachine || {};
        var g = Fkd.GrassToJSTranslator;
	var s = Fkd.GrassToJSTranslator.StateMachine;
        var u = Fkd.Utility;

	s.Context = function(indentMaker) {
		if (arguments.length == 1 && indentMaker instanceof g.IndentMaker) {
			this.state = s.InitialState.getInstance();
			this.upperCaseWCountInFunctionApplication = 0;
			this.lowerCaseWCountInFunctionApplication = 0;
			this.line = 1;
			this._indentMaker = indentMaker;
			this.indentLevel = 0;
			this.header = "";
			this.footer = "";
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	};
	s.Context.prototype.parse = function(grassCode) {
		if (arguments.length == 1 && new Object(grassCode) instanceof String) {
			for (var i = 0; this.state != null; i++) {
				this.state.scan(this, grassCode.charAt(i));
			}
			return this.header + this.footer;
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
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

	s.Context.prototype.getFunctionDefinitionHeader = function(additionalIndentLevel) {
		return this._indentMaker.indent(functionDefinitionHeader, this.indentLevel + additionalIndentLevel);
	};
	s.Context.prototype.getFunctionDefinitionArgumentHeader = function(additionalIndentLevel) {
		return this._indentMaker.indent(functionDefinitionArgumentHeader, this.indentLevel + additionalIndentLevel);
	};
	s.Context.prototype.getFunctionApplication = function(additionalIndentLevel) {
		var v = [this.upperCaseWCountInFunctionApplication - 1, this.lowerCaseWCountInFunctionApplication - 1];
		var i = 0;
		return this._indentMaker.indent(functionApplication.replace(/%d/g, function() {return v[i++]}), this.indentLevel + additionalIndentLevel);
	};
	s.Context.prototype.getFunctionBodyFooter = function(additionalIndentLevel) {
		return this._indentMaker.indent(functionBodyFooter, this.indentLevel + additionalIndentLevel);
	};
	s.Context.prototype.getFunctionDefinitionArgumentFooter = function(additionalIndentLevel) {
		return this._indentMaker.indent(functionDefinitionArgumentFooter, this.indentLevel + additionalIndentLevel);
	};
	s.Context.prototype.getFunctionDefinitionFooter = function(additionalIndentLevel) {
		return this._indentMaker.indent(functionDefinitionFooter, this.indentLevel + additionalIndentLevel);
	};
})();
