(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @param {string} [text] текст
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className, text) {
        var elem = document.createElement(type);
        elem.className = className;

        if (text) {
            elem.innerText = text;
        }

        return elem;
    }

    /**
     * Возращает CSS класс клетки
     *
     * @param {number} cell содержимое ячейки
     * @param {boolean} isActive
     * @returns {string} CSS класс
     */
    function cellClass(cell, isActive) {
        var type;

        switch (cell) {
            case WATER:
                type = 'water';
                break;

            default:
                type = 'island';
        }

        return 'map__cell map__cell_' + type + (isActive ? ' map__cell_active' : '');
    }

    /**
     * Создает визуализацию карты по его схеме
     *
     * @param {number[][]} map карта островов
     * @param {number} count кол-во островов
     * @param {Object} [current] координаты активной ячейки
     * @param {number} current.x
     * @param {number} current.y
     *
     * @returns {HTMLElement} HTML элемент
     */
    function render(map, count, current) {
        var containerElem = element('div', 'map'),
            rowElem,
            row,
            cell,
            x,
            y,
            isCurrent;

        containerElem.appendChild(element('div', 'map__res', 'Count: ' + Number(count)));

        for (y = 0; y < map.length; y++) {
            row = map[y];
            rowElem = element('div', 'map__row');

            for (x = 0; x < row.length; x++) {
                isCurrent = current && current.x === x && current.y === y;
                cell = row[x];

                rowElem.appendChild(
                    element('div', cellClass(cell, isCurrent), cell === WATER || cell === ISLAND ? "\u200C" : cell - 1)
                );
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    root.SHRI_ISLANDS.render = render;
})(this);
