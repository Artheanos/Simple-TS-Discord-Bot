import {MessageAttachment, Message} from "discord.js";
import {MyCommandProps, MyCommand} from "./index";

export default class _ implements MyCommand {
    docs = "For loop, takes two arguments";

    handleMessage({message, args}: MyCommandProps): void {
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
}