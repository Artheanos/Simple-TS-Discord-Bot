import { getTitle } from '../../../src/lib/yt-dlp'

jest.setTimeout(10_000)

describe('getTitle', () => {
    it('elo', () => {
        expect(getTitle('https://www.youtube.com/watch?v=fwlTGuOxfoA')).toEqual('We shot some B-Ball in West Philly, and angered a Brooklyn gangster (How NOT to Travel America #3)')
    })
})
