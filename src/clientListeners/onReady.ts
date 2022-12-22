import { Client, PresenceData } from 'discord.js'
import config from 'config'
import { ClientEventListener } from 'clientListeners/types'

const onReady: ClientEventListener<'ready'> = (client) => {
    client.user!.setPresence(config.defaultPresence as PresenceData)
    console.log('Ready')
}

export default onReady
