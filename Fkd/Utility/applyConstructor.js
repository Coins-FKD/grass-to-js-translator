(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.Utility = Fkd.Utility || {};
    var u = Fkd.Utility;
    
    /**
     * コンストラクタに可変長引数を渡します。
     * @param {Function} constructor コンストラクタ。
     * @param {Array} argumentsOfConstructor コンストラクタに渡す引数の配列。
     * @return {Object} コンストラクタのインスタンス。
     */
    u.applyConstructor = function(constructor, argumentsOfConstructor) {
        if (arguments.length == 2 && typeof(constructor) == "function" && argumentsOfConstructor instanceof Array) {
            if (typeof(Function.prototype.bind) == "function") {
                return new (constructor.bind.apply(constructor, [null].concat(argumentsOfConstructor)))();
            } else {
                if (constructor == Function || constructor == Array || constructor == RegExp || constructor == Error || constructor == EvalError || constructor == RangeError || constructor == ReferenceError || constructor == SyntaxError || constructor == TypeError || constructor == URIError) {
                    return constructor.apply(null, argumentsOfConstructor);
                } else if (constructor == String || constructor == Boolean || constructor == Number || constructor == Date) {
                    switch (argumentsOfConstructor.length) {
                        case 0: return new constructor();
                        case 1: return new constructor(argumentsOfConstructor[0]);
                        case 2: return new constructor(argumentsOfConstructor[0], argumentsOfConstructor[1]);
                        case 3: return new constructor(argumentsOfConstructor[0], argumentsOfConstructor[1], argumentsOfConstructor[2]);
                        case 4: return new constructor(argumentsOfConstructor[0], argumentsOfConstructor[1], argumentsOfConstructor[2], argumentsOfConstructor[3]);
                        case 5: return new constructor(argumentsOfConstructor[0], argumentsOfConstructor[1], argumentsOfConstructor[2], argumentsOfConstructor[3], argumentsOfConstructor[4]);
                        case 6: return new constructor(argumentsOfConstructor[0], argumentsOfConstructor[1], argumentsOfConstructor[2], argumentsOfConstructor[3], argumentsOfConstructor[4], argumentsOfConstructor[5]);
                        default: return new constructor(argumentsOfConstructor[0], argumentsOfConstructor[1], argumentsOfConstructor[2], argumentsOfConstructor[3], argumentsOfConstructor[4], argumentsOfConstructor[5], argumentsOfConstructor[6]);
                    }
                } else {
                    var emptyConstructor = function(){};
                    emptyConstructor.prototype = constructor.prototype;
                    var newObject = new emptyConstructor();
                    var returnValue = constructor.apply(newObject, argumentsOfConstructor);
                    if(typeof(returnValue) == "object" || typeof(returnValue) == "function"){
                        return returnValue;
                    }else{
                        return newObject;
                    }
                }
            }
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
})();
