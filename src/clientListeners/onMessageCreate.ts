import censor from 'censor'
import { ClientEventListener } from 'clientListeners/types'
import { commandManager } from 'initializers/commandManager'

const onMessageCreate: ClientEventListener<'messageCreate'> = (message) => {
    const messageIsFromTheApp = message.author.id === message.client.user!.id
    if (messageIsFromTheApp)
        return

    if (censor(message))
        return

    commandManager.processMessage(message)
}

export default onMessageCreate
