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

async function tmpSend(channel: TextBasedChannel, messageContent: string, deleteAfter: number) {
  const msg = await channel.send(messageContent)
  setTimeout(() => msg.delete(), deleteAfter)
  return msg
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

function initArray<T>(length: number, map: (i: number) => T) {
  return new Array(length).fill(undefined).map(map)
}

async function awaitIfPromise<T>(value: T | Promise<T>): Promise<T> {
  if (value instanceof Promise) {
    return await value
  }
  return value
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1)
}

export { MyRandom, Utils, tmpSend, isValidURL, enumerateArray, initArray, awaitIfPromise, capitalize };
