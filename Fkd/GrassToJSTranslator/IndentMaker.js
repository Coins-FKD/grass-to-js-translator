(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
    var g = Fkd.GrassToJSTranslator;
    var u = Fkd.Utility;

    g.IndentMaker = function(indentSize, baseIndentLevel) {
        if (arguments.length == 2 && u.isUInt(indentSize) && u.isUInt(baseIndentLevel)) {
            this.indentSize = indentSize;
            this.baseIndentLevel = baseIndentLevel;
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
    g.IndentMaker.prototype.indent = function(string, indentLevel) {
        if (arguments.length == 2 && new Object(string) instanceof String && u.isUInt(indentLevel)) {
            var indent = u.range(0, (this.baseIndentLevel + indentLevel) * this.indentSize).map(function(v) {return " "}).join("");
            string = string.replace(/\t/g, u.range(0, this.indentSize).map(function(v) {return " "}).join(""));
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
