import { downloadSong } from "../../../src/lib/youtubeDownloader";
import { resolve, join } from 'path'
import * as fs from "fs";

jest.setTimeout(10_000)

describe('Downloading song', () => {

  describe('when url is invalid', () => {
    describe('invalid url', () => {
      it('returns 404', async () => {
        await expect(downloadSong('https://youtube.com/dusko')).rejects.toEqual('notFound')
      })
    })

    describe('invalid videoId', () => {
      it('returns Video unavailable', async () => {
        await expect(downloadSong('https://www.youtube.com/watch?v=ZZ3bYfUEWixI')).rejects.toEqual('unavailable')
      })
    })
  })

  describe('when url is valid', () => {
    const expectedDestination = resolve(join(__dirname, '../../../src/lib/youtubeDownloader/cache/5DlROhT8NgU_AMOGUS.opus'))

    it('downloads the song', async () => {
      try {
        await fs.unlinkSync(expectedDestination)
      } catch (e) {
      }
      expect(await downloadSong('https://www.youtube.com/watch?v=5DlROhT8NgU')).toEqual(expectedDestination)
    })

    it('does not call exec and returns in under 10ms', async () => {
      expect(await downloadSong('https://www.youtube.com/watch?v=5DlROhT8NgU')).toEqual(expectedDestination)
    }, 10)
  })
})
