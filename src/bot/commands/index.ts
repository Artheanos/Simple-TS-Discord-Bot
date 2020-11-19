import {configFile} from '../../config';
import {Client, Message, MessageEmbed, TextChannel} from "discord.js";
import {readdir} from 'fs';

export function ownerOnly(wrapped: IMessageFunction): IMessageFunction {
    return function (props) {
        const {message} = props;
        if (message.author.id === configFile.ownerId)
            wrapped(props);
    }
}

export type IMessageProps = {
    message: Message,
    args: Array<string>,
    client: Client
}
type IMessageFunction = (props: IMessageProps) => void;

let commandList: { [key: string]: IMessageFunction } = {};
let client: Client | null = null;


readdir(__dirname, (err, files) => {
    for (let file of files) {
        file = file.substr(0, file.length - 3);
        if (file == 'index')
            continue;
        let module = require('./' + file);
        if ('default' in module) {
            commandList[file] = module.default;
        }
    }
    console.log(commandList);
});

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

        if (command in commandList) {
            let args = message.content.split(' ').slice(1);
            commandList[command]({message, args, client});
        }
    }
}

export default commands;