(function (root) {
    var copy = root.SHRI_ISLANDS.copy;

    function call(callback, action, map, y, x) {
        typeof callback === "function" && callback(action, map, y, x);
    }

    function ObservedMap(observer) {
        this.observer = observer;
    }

    ObservedMap.prototype = [];
    ObservedMap.prototype.constructor = ObservedMap;

    ObservedMap.prototype.set = function (y, x, value) {
        this[y][x] = value;

        call(this.observer, 'set', this.clone(), y, x);

        return this;
    };

    ObservedMap.prototype.get = function (y, x) {
        if (x < 0 || y < 0) {
            return null;
        }

        call(this.observer, 'get', this.clone(), y, x);

        return this[y][x];
    };

    /**
     * Заменяет все вхождения oldChar на newChar находящиеся перед строкой y после позиции x
     *
     * @param oldChar
     * @param newChar
     * @param {number} y
     * @param {number} x
     */
    ObservedMap.prototype.replaceInLineAbove = function (oldChar, newChar, y, x) {
        var j, i;

        if (y < 1) {
            return;
        }

        j = y - 1;

        for (i = x; i <= this[j].length - 1; i++) {
            this.get(j, i) === oldChar && (this.set(j, i, newChar));
        }
    };

    /**
     * Заменяет все вхождения oldChar на newChar находящиеся перед элементом с координатоми y, x
     *
     * @param oldChar
     * @param newChar
     * @param {number} y
     * @param {number} x
     */
    ObservedMap.prototype.replaceAllAbove = function (oldChar, newChar, y, x) {
        for (var j = 0; j < this.length && j <= y; j++) {
            for (var i = 0; i < this[j].length; i++) {
                this.get(j, i) === oldChar && (this.set(j, i, newChar));
            }
        }
    };

    ObservedMap.prototype.fill = function (arr) {
        this.push.apply(this, arr);

        return this;
    };

    ObservedMap.prototype.clone = function () {
        var map = new ObservedMap(this.observer);

        return map.fill(copy(this));
    };

    root.SHRI_ISLANDS.ObservedMap = ObservedMap;
})(this);
