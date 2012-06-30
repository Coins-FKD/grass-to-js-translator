(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.Utility = Fkd.Utility || {};
    var u = Fkd.Utility;
    
    /**
     * derivedClassをbaseClassで継承します。
     * @param {Function} derivedClass 継承先としたいクラス。
     * @param {Function} baseClass 継承元としたいクラス。
     * @return {Function} derivedClass。
     */
    u.inherits = function(derivedClass, baseClass) {
        if (arguments.length == 2 && typeof(derivedClass) == "function" && typeof(baseClass) == "function") {
            var emptyConstructor = function(){};
            emptyConstructor.prototype = baseClass.prototype;
            derivedClass.prototype = new emptyConstructor();
            derivedClass.prototype.constructor = derivedClass;
            return derivedClass;
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
})();
