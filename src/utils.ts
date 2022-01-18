import { TextBasedChannel } from "discord.js"

const MyRandom = {
  choice<T>(array: T[]) {
    if (array.length)
      return array[this.int(array.length - 1)]
  },
  sample<T>(array: T[], size: number): T[] {
    const arrayCopy = [...array]
    const result = []
    while (arrayCopy.length && size--) {
      const randomIndex = this.int(arrayCopy.length - 1)
      result.push(arrayCopy[randomIndex])
      arrayCopy.splice(randomIndex, 1)
    }
    return result
  },
  int(min: number, max?: number) {
    if (max === undefined) {
      [min, max] = [0, min]
    }
    return Math.random() * (max - min + 1) + min >> 0
  }
}

function removeFromArray<T>(arr: T[], needle: T) {
  let index = arr.indexOf(needle)
  if (index !== -1)
    arr.splice(index, 1)
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

export { MyRandom, tmpSend, isValidURL, enumerateArray, initArray, awaitIfPromise, capitalize }
