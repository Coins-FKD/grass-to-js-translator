(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.Utility = Fkd.Utility || {};
    var u = Fkd.Utility;
    
    /**
     * startを最初の要素としてstart+count-1までの値を各要素に持つ配列を返します。
     * @param {int} start 配列の最初の要素。
     * @param {uint} count 配列の長さ。
     * @return {Array} startからstart+count-1まで1ずつ増える値を各要素に持った配列。
     */
    u.range = function(start, count) {
        if (arguments.length == 2 && u.isInt(start) && u.isUInt(count)) {
            var result = new Array(count);
            for (var i = 0; i < count; i++) {
                result[i] = start + i;
            }
            return result;
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
})();
