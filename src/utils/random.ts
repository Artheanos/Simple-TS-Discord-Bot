export function choice<T>(array: T[]) {
    if (array.length)
        return array[int(array.length - 1)]
}

function int(min: number, max?: number) {
    if (max === undefined) {
        [min, max] = [0, min]
    }
    return Math.random() * (max - min + 1) + min >> 0
}