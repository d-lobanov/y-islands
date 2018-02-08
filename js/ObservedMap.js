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
     * Заменяет все вхождения oldChar на newChar находящиеся перед строкой y и после позиции x
     * Быстрее чем replaceChain, но визуально хуже
     *
     * @param oldChar
     * @param newChar
     * @param {number} y
     * @param {number} x
     */
    ObservedMap.prototype.replaceInLineAbove = function (y, x, oldChar, newChar) {
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
     * Медленее чем replaceInLineAbove, но визуально лучше
     *
     * @param startY
     * @param startX
     * @param oldChar
     * @param newChar
     */
    ObservedMap.prototype.replaceChain = function (startY, startX, oldChar, newChar) {
        var stack = [{y: startY, x: startX}],
            rowLength = this[startY].length,
            x,
            y,
            direction,
            current;

        var ifNotEqualThenPush = (function (y, x, direction) {
            this.get(y, x) === oldChar && stack.push({y: y, x: x, direction: direction});
        }).bind(this);

        while (stack.length) {
            current = stack.pop();

            x = current.x;
            y = current.y;
            direction = current.direction;

            this.set(y, x, newChar);

            // смотрим вверх
            direction !== 'down' && y > 0 && ifNotEqualThenPush(y - 1, x, 'up');

            // смотри влево
            direction !== 'right' && x > 0 && ifNotEqualThenPush(y, x - 1, 'left');

            if (y !== startY) {
                // смотри вправо
                direction !== 'left' && x < rowLength - 1 && ifNotEqualThenPush(y, x + 1, 'right');

                // смотри вниз
                direction !== 'up' && y < this.length - 1 && ifNotEqualThenPush(y + 1, x, 'down');
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
