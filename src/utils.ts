import { TextBasedChannel } from "discord.js";

const MyRandom = {
  choice(array: any[]) {
    if (array.length)
      return array[this.int(array.length - 1)]
  },

  int(min: number, max?: number) {
    if (max === undefined) {
      [min, max] = [0, min];
    }
    return Math.random() * (max - min + 1) + min >> 0;
  }
}

const Utils = {
  removeFromArray<T>(arr: T[], needle: T) {
    let index = arr.indexOf(needle);
    if (index !== -1)
      arr.splice(index, 1);
  }
}

function tmpSend(channel: TextBasedChannel, messageContent: string, deleteAfter: number) {
  channel.send(messageContent).then(msg => {
    setTimeout(() => msg.delete(), deleteAfter)
  })
}

function isValidURL(url: string) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

function enumerateArray(arr: string[]) {
  return arr.map((v, i) => `${i + 1}. ${v}`).join('\n')
}


export { MyRandom, Utils, tmpSend, isValidURL, enumerateArray };
