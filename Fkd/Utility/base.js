(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.Utility = Fkd.Utility || {};
    var u = Fkd.Utility;
    
    /**
     * derivedClassの継承元のクラスを返します。
     * @param {Function} derivedClass 継承先のクラス。
     * @return {Function} 継承元のクラス。
     */
    u.base = function(derivedClass) {
        if (arguments.length == 1 && typeof(derivedClass) == "function") {
            delete(derivedClass.prototype.constructor);
            var baseClass = derivedClass.prototype.constructor;
            derivedClass.prototype.constructor = derivedClass;
            return baseClass;
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
})();
