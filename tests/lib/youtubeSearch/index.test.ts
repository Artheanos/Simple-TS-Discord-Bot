import { youtubeSearch } from '../../../src/lib/youtubeSearch'

describe('youtubeSearch', () => {
    it('returns a list of videos', async () => {
        const result = await youtubeSearch('dupa')
        expect(result.length).toEqual(5)
        expect(result).toContainEqual({
            url: 'https://www.youtube.com/watch?v=VOcSRzk7bKE',
            title: 'Świnka dupa: Kamera taty świngi',
        })
    })
})
