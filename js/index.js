(function (root) {
    // Пред определеное поле
    // var map = root.SHRI_ISLANDS.MAP;

    // Случайно сгенерированое поле
    var map = root.SHRI_ISLANDS.makeMap();

    var updateOuter = function (content) {
        document.querySelector('.outer').innerHTML = '';
        document.querySelector('.outer').appendChild(content);
    };

    // Классическое решение
    // var count = root.SHRI_ISLANDS.solution(map);
    //
    // updateOuter(
    //     root.SHRI_ISLANDS.render(map, count)
    // );

    // Визуализация
    var delay = 0;

    root.SHRI_ISLANDS.visualizeSolution(map, function (updatedMap, result, y, x) {
        console.log(JSON.stringify(updatedMap), y, x);
        delay += 150;

        setTimeout(function () {
            updateOuter(
                root.SHRI_ISLANDS.render(updatedMap, result, {y: y, x: x})
            );
        }, delay);
    });
})(this);
