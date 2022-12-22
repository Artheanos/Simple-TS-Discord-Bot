import { youtubeSearch } from '../../../src/lib/youtubeSearch'


describe('youtubeSearch', () => {
    it('returns something', async () => {
        const result = await youtubeSearch('dupą')
        expect(result).toContainEqual({
            url: 'https://www.youtube.com/watch?v=VOcSRzk7bKE',
            title: 'Świnka dupa: Kamera taty świngi',
        })
    })
})
