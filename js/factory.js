(function (root) {
    /**
     * Возращает случайное целое число в пределах min, max
     *
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    function randInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Сгенерировать случайное поле
     *
     * @return {number[][]}
     */
    function makeMap() {
        var numColumns = randInteger(3, 10),
            numRows = randInteger(3, 10),
            map = [];

        for (var y = 0; y < numRows; y++) {
            map[y] || (map[y] = []);

            for (var x = 0; x < numColumns; x++) {
                map[y][x] = randInteger(0, 1);
            }
        }

        return map;
    }

    root.SHRI_ISLANDS.makeMap = makeMap;
})(this);
