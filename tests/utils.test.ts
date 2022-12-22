import { eachSlice } from '../src/utils'

describe('eachSlice', () => {
    it('groups in pairs', () => {
        const array = [1, 2, 3, 4, 5]
        const result = eachSlice(array, 2)
        expect([...result]).toEqual([[1, 2], [3, 4], [5]])
    })
})