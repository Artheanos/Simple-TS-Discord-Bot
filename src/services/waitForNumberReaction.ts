import { Message, TextChannel } from "discord.js";

const emojiToNumber = (emoji: string) => {
  return new TextEncoder().encode(emoji)[0] - 48
}

const reactAndWait = async (message: Message, emojis: string[]) => {
  const reactions = emojis.map(emoji => message.react(emoji))
  return Promise.all(reactions)
}

export const waitForNumberReaction = async (message: Message, userId: string) => {
  const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']
  const waitUntilReactionsFinish = reactAndWait(message, emojis)
  const reactions = await message.awaitReactions({
    filter: (_, user) => user.id === userId,
    max: 1,
    time: 30_000,
  })
  const emoji = reactions.first()?.emoji.name
  waitUntilReactionsFinish.then(() => message.delete())
  return emoji && emojiToNumber(emoji)
}
