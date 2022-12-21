import { youtubeSearch } from '../../../src/lib/youtubeSearch'


describe('Listing youtube videos', () => {
    it('returns something', async () => {
        console.log(await youtubeSearch('dupa'))
    })
})
