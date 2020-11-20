import {configFile} from '../../config';
import {Client, Message} from "discord.js";
import {readdirSync} from 'fs';

function ownerOnlyFunction(wrapped: ICommandFunction): (props: MyCommandProps) => void {
    return (props: MyCommandProps) => {
        if (props.message.author.id === configFile.ownerId)
            wrapped(props);
    }
}

export function ownerOnly<T extends { new(...args: any[]): {} }>(constructor: T) {
    constructor.prototype.handleMessage = ownerOnlyFunction(constructor.prototype.handleMessage);
}

export interface MyCommand {
    docs: string,
    commandName?: string,

    handleMessage(props: MyCommandProps): void;
}

export type MyCommandProps = {
    message: Message,
    args: string[],
    client: Client
}

type ICommandFunction = (props: MyCommandProps) => void;
let client: Client | null = null;
let commandList: { [key: string]: MyCommand } = {};

for (let file of readdirSync(__dirname)) {
    file = file.substr(0, file.length - 3);
    if (file == 'index')
        continue;
    let module = require('./' + file);
    if ('default' in module) {
        commandList[file] = new module.default;
    }
}
console.log(commandList);

commandList.help = new class implements MyCommand {
    docs = `Help yourself`;

    handleMessage({message, args}: MyCommandProps) {
        let result: string;

        if (args.length) {
            let command = args[0];
            if (command in commandList) {
                result = commandList[command].docs;
            } else {
                result = `There\'s no command \`{}\``
            }
        } else {
            result = `Available commands are:\n${Object.keys(commandList).map(c => `\`${c}\``).join(' ')}\nGet a command\'s docs, usage: \`${configFile.prefix}help command\``;
        }

        message.channel.send(result);
    }
}

function commands(inp: Client | Message) {
    if (inp instanceof Client) {
        client = inp;
    } else if (client === null) {
        throw new TypeError("Message was passed but Client is null");
    } else {
        const message = inp;
        if (!message.content.startsWith(configFile.prefix))
            return;

        let [command, ...args] = message.content.split(' ');
        command = command.slice(configFile.prefix.length);

        if (!configFile.caseSensitive)
            command = command.toLowerCase();

        commandList[command].handleMessage({message, args, client});
    }
}

export default commands;