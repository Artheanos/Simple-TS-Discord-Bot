import { Message } from "discord.js"

const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']

const emojiToNumber = (emoji: string) => {
  return new TextEncoder().encode(emoji)[0] - 48
}

const reactMultiple = async (message: Message, emojis: string[]) => {
  const reactions = emojis.map(emoji => message.react(emoji))
  return Promise.all(reactions)
}

export const waitForNumberReaction = async (message: Message, userId: string) => {
  const waitUntilReactionsFinish = reactMultiple(message, numberEmojis)
  const reactions = await message.awaitReactions({
    filter: (_, user) => user.id === userId,
    max: 1,
    time: 30_000,
  })
  const emoji = reactions.first()?.emoji.name
  waitUntilReactionsFinish.then(() => message.delete())
  return emoji && emojiToNumber(emoji)
}
