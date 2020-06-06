exports.MyRandom = new function () {
    this.choice = function (array) {
        return array[this.int(array.length - 1)]
    }

    this.int = function (min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
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