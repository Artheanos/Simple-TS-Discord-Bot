export function enumerateArray(arr: string[]) {
    return arr.map((v, i) => `${i + 1}. ${v}`).join('\n')
}
