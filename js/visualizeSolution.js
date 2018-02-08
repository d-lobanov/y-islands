(function (root) {
    var step = root.SHRI_ISLANDS.step;
    var ObservedMap = root.SHRI_ISLANDS.ObservedMap;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution(map, onUpdate) {
        var result = 0;

        var observedMap = new ObservedMap(function (action, map, y, x) {
            onUpdate(map, result, y, x);
        });

        observedMap.fill(map);

        for (var y = 0; y < observedMap.length; y++) {
            for (var x = 0; x < observedMap[y].length; x++) {
                result += step(observedMap, y, x);
            }
        }

        onUpdate(map, result);

        return result;
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
