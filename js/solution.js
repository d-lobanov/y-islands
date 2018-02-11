(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var copy = root.SHRI_ISLANDS.copy;
    var ObservedMap = root.SHRI_ISLANDS.ObservedMap;

    var mark = 2;

    /**
     * Выполняет поиск острова в map для заданых координат y и x
     * в случае нахождение возвращает: 1
     * в случае отсутствия: 0
     * в случае обьединения двух и более островов: -1
     *
     * @param {ObservedMap} map карта островов представленная двумерной матрицей чисел
     * @param {number} y координата текущего элемента
     * @param {number} x координата текущего элемента
     * @return {number}
     */
    function step(map, y, x) {
        if (map.get(y, x) === WATER) {
            return 0;
        }

        var left = map.get(y, x - 1) || WATER;
        var top = map.get(y - 1, x) || WATER;

        if (left === WATER && top === WATER) {
            map.set(y, x, mark);
            mark += 1;

            return 1;
        }

        map.set(y, x, left !== WATER ? left : top);

        if (left !== top && left !== WATER && top !== WATER) {
            map.replaceInLineAbove(y, x, top, left);

            return -1;
        }

        return 0;
    }

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        var result = 0;
        var observedMap = new ObservedMap();

        observedMap.fill(map);

        for (var y = 0; y < observedMap.length; y++) {
            for (var x = 0; x < observedMap[y].length; x++) {
                result += step(observedMap, y, x);
            }
        }

        return result;
    }

    root.SHRI_ISLANDS.solution = solution;
    root.SHRI_ISLANDS.step = step;
})(this);
