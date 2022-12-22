import { youtubeSearch } from '../../../src/lib/youtubeSearch'

describe('youtubeSearch', () => {
    it('returns a list of videos', () => {
        const result = youtubeSearch('dupa')
        expect(result.length).toEqual(5)
        expect(result).toContainEqual({
            url: 'https://www.youtube.com/shorts/ULkD5Gevigc',
            title: 'Powiedz DUPA!',
        })
    })
})
