(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.Utility = Fkd.Utility || {};
    var u = Fkd.Utility;
    
    /**
     * parameterがuint型として扱えるかどうかを判定します。
     * @param {Object} parameter 判定対象の値。
     * @return {Boolean} parameterがuint型として扱えるかどうか。
     */
    u.isUInt = function(parameter) {
        if (arguments.length == 1) {
            return new Object(parameter) instanceof Number && parameter % 1 == 0 && parameter >>> 0 == parameter;
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
})();
