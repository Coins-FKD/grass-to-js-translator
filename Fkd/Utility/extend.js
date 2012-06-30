/*!{id:"uupaa.js",ver:0.8,license:"MIT",author:"uupaa.js@gmail.com"}*/
(function() {
    "use strict";
    if (!("indexOf" in Array.prototype)) {
        Array.prototype.indexOf = function(search, fromIndex) {
            var iz = this.length, i = fromIndex || 0;
            
            i = (i < 0) ? i + iz : i;
            for (; i < iz; ++i) {
                if (i in this && this[i] === search) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!("lastIndexOf" in Array.prototype)) {
        Array.prototype.lastIndexOf = function(search, fromIndex) {
            var iz = this.length, i = fromIndex;
            
            i = (i < 0) ? i + iz + 1 : iz;
            while (--i >= 0) {
                if (i in this && this[i] === search) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!("every" in Array.prototype)) {
        Array.prototype.every = function(evaluator, that) {
            for (var i = 0, iz = this.length; i < iz; ++i) {
                if (i in this && !evaluator.call(that, this[i], i, this)) {
                    return false;
                }
            }
            return true;
        };
    }
    if (!("filter" in Array.prototype)) {
        Array.prototype.filter = function(evaluator, that) {
            for (var rv = [], ri = -1, v, i = 0, iz = this.length; i < iz; ++i) {
                i in this && evaluator.call(that, v = this[i], i, this) && (rv[++ri] = v);
            }
            return rv;
        };
    }
    if (!("map" in Array.prototype)) {
        Array.prototype.map = function(evaluator, that) {
            for (var iz = this.length, rv = Array(iz), i = 0; i < iz; ++i) {
                i in this && (rv[i] = evaluator.call(that, this[i], i, this));
            }
            return rv;
        };
    }
    if (!("some" in Array.prototype)) {
        Array.prototype.some = function(evaluator, that) {
            for (var i = 0, iz = this.length; i < iz; ++i) {
                if (i in this && evaluator.call(that, this[i], i, this)) {
                    return true;
                }
            }
            return false;
        };
    }
    if (!("forEach" in Array.prototype)) {
        Array.prototype.forEach = function(evaluator, that) {
            var i = 0, iz = this.length;
            
            if (that) {
                for (; i < iz; ++i) {
                    i in this && evaluator.call(that, this[i], i, this);
                }
            } else {
                for (; i < iz; ++i) {
                    i in this && evaluator(this[i], i, this);
                }
            }
        };
    }
    if (!("reduce" in Array.prototype)) {
        Array.prototype.reduce = function(evaluator, initialValue, __right__) {
            var that = this, r = !!__right__, undef, f = 0,
                rv = initialValue === undef ? undef : (++f, initialValue),
                iz = that.length, i = r ? --iz : 0;
                
            for (; r ? i >= 0 : i < iz; r ? --i : ++i) {
                i in that && (rv = f ? evaluator(rv, that[i], i, that) : (++f, that[i]));
            }
            if (!f) {
                throw new Error("BAD_PARAM");
            }
            return rv;
        };
    }
    if (!("reduceRight" in Array.prototype)) {
        Array.prototype.reduceRight = function(evaluator, initialValue) {
            return Array.prototype.reduce.call(this, evaluator, initialValue, 1);
        };
    }
})();
