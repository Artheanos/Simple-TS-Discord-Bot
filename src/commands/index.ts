import { Client, Message, TextBasedChannel } from 'discord.js'
import { readdirSync } from 'fs';
import { join } from 'path';

import config from "config";
import { tmpSend } from '../utils';
import { MyCommand, MyCommandProps } from 'interfaces/MyCommand';

const COMMAND_FILES_PATH = join(__dirname, 'files');

let client: Client | null = null;
let commandList: { [key: string]: MyCommand } = {};

function unknownCommandMessage(channel: TextBasedChannel, commandName: string): void {
  tmpSend(channel, `Unknown command \`${commandName}\``, 4000);
}

for (let file of readdirSync(COMMAND_FILES_PATH)) {
  file = file.substr(0, file.length - 3);
  if (file == 'index') {
    continue;
  }
  let module = require(join(COMMAND_FILES_PATH, file));
  if ('default' in module) {
    let myCommand = new module.default;
    commandList[file] = myCommand;
    if (myCommand.alias) {
      myCommand.alias.forEach((i: string) => commandList[i] = myCommand);
    }
  }
}
console.log(commandList);

commandList.help = new class implements MyCommand {
  about = `Help yourself`;

  handleMessage({ message, args }: MyCommandProps) {
    let result = '';

    if (args.length) {
      let command = args[0];
      if (command in commandList) {
        result = commandList[command].about;
      } else {
        unknownCommandMessage(message.channel, command);
      }
    } else {
      result = `Available commands are:\n${Object.keys(commandList).map(c => `\`${c}\``).join(' ')}\nGet a command\'s docs, usage: \`${config.prefix}help command\``;
    }

    if (result) {
      message.channel.send(result);
    }
  }
};

export default function (inp: Client | Message): void {
  if (inp instanceof Client) {
    client = inp;
  } else if (client === null) {
    throw new TypeError("Message was passed but Client is null");
  } else {
    const message = inp;
    if (!message.content.startsWith(config.prefix)) {
      return;
    }

    let [command, ...args] = message.content.split(' ');
    command = command.slice(config.prefix.length);

    if (!config.caseSensitive) {
      command = command.toLowerCase();
    }

    if (commandList.hasOwnProperty(command)) {
      commandList[command].handleMessage({ message, args, client });
    } else if (config.unknownCommandMessage) {
      unknownCommandMessage(message.channel, command);
    }
  }
}

// TODO change this file's name
