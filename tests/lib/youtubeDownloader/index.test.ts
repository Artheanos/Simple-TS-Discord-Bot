import { downloadSong } from "../../../src/lib/youtubeDownloader";
import { resolve, join } from 'path'

describe('when url is invalid', () => {
  describe('404', () => {
    it('returns 404', async () => {
      await expect(downloadSong('https://youtube.com/dusko')).rejects.toEqual('notFound')
    })
  })

  describe('almost valid url', () => {
    it('returns Video unavailable', async () => {
      await expect(downloadSong('https://www.youtube.com/watch?v=ZZ3bYfUEWixI')).rejects.toEqual('unavailable')
    })
  })
})

describe('when url is valid', () => {
  const expectedDestination = resolve(join(__dirname, '../../../src/lib/youtubeDownloader/cache/Minecraft Drip.opus'))

  it('return the song name', async () => {
    expect(await downloadSong('https://www.youtube.com/watch?v=5DlROhT8NgU')).toEqual(expectedDestination)
  })
})
