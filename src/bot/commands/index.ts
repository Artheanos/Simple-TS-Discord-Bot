import {configFile} from '../../config';
import {Client, Message} from "discord.js";
import {readdirSync} from 'fs';

export function ownerOnly(wrapped: IMessageFunction): IMessageFunction {
    function ownerOnlyFunction(props: IMessageProps) {
        if (props.message.author.id === configFile.ownerId)
            wrapped(props);
    }

    return ownerOnlyFunction;
}

export type IMessageProps = {
    message: Message,
    args: Array<string>,
    client: Client
}
type IMessageFunction = (props: IMessageProps) => void;

let commandList: { [key: string]: IMessageFunction } = {};
let client: Client | null = null;


for (let file of readdirSync(__dirname)) {
    file = file.substr(0, file.length - 3);
    if (file == 'index')
        continue;
    let module = require('./' + file);
    if ('default' in module) {
        commandList[file] = module.default;
    }
}
console.log(commandList);

function commands(inp: Client | Message) {
    if (inp instanceof Client) {
        client = inp;
    } else if (client === null) {
        throw new TypeError("Message was passed but Client is null");
    } else {
        let message = inp;
        if (!message.content.startsWith(configFile.prefix))
            return;

        let command = message.content.split(' ')[0].slice(configFile.prefix.length);
        if (!configFile.caseSensitive)
            command = command.toLowerCase();

        if (command === 'help') {
            console.log('HELP')
            let result = 'Available commands are:\n`';
            for (let i in commandList) {
                result += i + ' ';
            }
            result += '`\nPrefix - `' + configFile.prefix + '`';
            message.channel.send(result);
        } else if (command in commandList) {
            let args = message.content.split(' ').slice(1);
            commandList[command]({message, args, client});
        }
    }
}

export default commands;