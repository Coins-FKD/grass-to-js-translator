(function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.Utility = Fkd.Utility || {};
    var u = Fkd.Utility;
    
    u.ErrorMessage = {
        accessPrivate: "accesibility error: accessed private member",
        accessProtected: "accesibility error: accessed protected member",
        notImplemented: "not implemented",
        outOfRange: (function(){
            function a(message) {
                return a.toString(message);
            }
            a.toString = function(message) {
                return "out of range" + (message === void 0 ? "" : ": " + message);
            };
            return a;
        })(),
        overload: "cannot found the method which matches given parameters"
    };
})();
