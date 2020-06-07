exports.MyRandom = {
    choice(array) {
        if (array.length)
            return array[this.int(array.length - 1)]
    },

    int(min, max) {
        if (max === undefined) {
            [min, max] = [0, min];
        }
        return Math.random() * (max - min + 1) + min >> 0;
    }
}

exports.Utils = {
    removeFromArray(array, needle) {
        let index = array.indexOf(needle);
        if (index !== -1)
            array.splice(index, 1);
    }
}