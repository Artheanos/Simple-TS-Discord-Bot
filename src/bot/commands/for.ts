import {Message, MessageAttachment} from "discord.js";
import {IMessageProps} from "./index";

function main({message, args}: IMessageProps) {
    if (args.length === 2) {
        let a = Number(args[0]);
        let b = Number(args[1]);

        let result = '';

        if (a < b)
            for (let i = a; i < b; i++)
                result += i + '\n';
        else
            for (let i = a; i > b; i--)
                result += i + '\n';

        message.channel.send(result);
    } else {
        message.channel.send('Wrong number of arguments', {spoiler: true} as MessageAttachment);
    }
}