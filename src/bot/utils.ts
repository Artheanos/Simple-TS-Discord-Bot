const MyRandom = {
    choice(array: any[]) {
        if (array.length)
            return array[this.int(array.length - 1)]
    },

    int(min: number, max?: number) {
        if (max === undefined) {
            [min, max] = [0, min];
        }
        return Math.random() * (max - min + 1) + min >> 0;
    }
}

const Utils = {
    removeFromArray<T>(arr: T[], needle: T) {
        let index = arr.indexOf(needle);
        if (index !== -1)
            arr.splice(index, 1);
    }
}

export {MyRandom, Utils};