(function (root) {
    /**
     * Делает копию двумерной матрицы
     *
     * @param {number[][]} map
     * @return {number[][]}
     */
    function copy(map) {
        return map.map(function (row) {
            return row.slice();
        });
    }

    root.SHRI_ISLANDS.copy = copy;
})(this);
