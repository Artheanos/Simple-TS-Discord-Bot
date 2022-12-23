import { search } from '../../../src/lib/yt-dlp'

describe('search', () => {
    it('returns a list of videos', async () => {
        const result = await search('dupa')
        expect(result.length).toEqual(5)
        expect(result).toContainEqual({
            url: 'https://www.youtube.com/watch?v=VOcSRzk7bKE',
            title: 'Świnka dupa: Kamera taty świngi',
        })
    })
})
