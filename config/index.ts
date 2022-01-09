import * as configJson from './config.json'
import { PresenceData } from 'discord.js'

type ConfigJson = (typeof configJson) & {
  token: string
  ownerId: string
  defaultPresence: PresenceData
  censorList: {
    [key: string]: {
      [key: string]: string[]
    }
  }
}

export default configJson as ConfigJson
