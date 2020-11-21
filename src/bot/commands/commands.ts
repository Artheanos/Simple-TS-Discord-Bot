import {MyCommand, MyCommandProps} from "./MyCommand";
import {readdirSync} from "fs";
import {join} from "path";
import {configFile} from "../../config";
import {Client, Message} from 'discord.js'

const COMMAND_FILES_PATH = join(__dirname, 'files');

let client: Client | null = null;
let commandList: { [key: string]: MyCommand } = {};

for (let file of readdirSync(COMMAND_FILES_PATH)) {
    file = file.substr(0, file.length - 3);
    if (file == 'index')
        continue;
    let module = require(join(COMMAND_FILES_PATH, file));
    if ('default' in module) {
        let myCommand = new module.default;
        commandList[file] = myCommand;
        if (myCommand.alias)
            myCommand.alias.forEach((i: string) => commandList[i] = myCommand);
    }
}
console.log(commandList);

commandList.help = new class implements MyCommand {
    about = `Help yourself`;

    handleMessage({message, args}: MyCommandProps) {
        let result: string;

        if (args.length) {
            let command = args[0];
            if (command in commandList) {
                result = commandList[command].about;
            } else {
                result = `There\'s no command \`{}\``
            }
        } else {
            result = `Available commands are:\n${Object.keys(commandList).map(c => `\`${c}\``).join(' ')}\nGet a command\'s docs, usage: \`${configFile.prefix}help command\``;
        }

        message.channel.send(result);
    }
};

export default function (inp: Client | Message) {
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

// TODO change this file's name