import {Message} from "discord.js";
import {IMessageProps, ownerOnly} from ".";

function main({message}: IMessageProps) {
    try {
        message.channel.send(
            eval(message.content.split(' ').slice(1).join(' '))
        ).catch(
            e => message.channel.send(e.toString())
        );
    } catch (e) {
        message.channel.send(e.toString());
    }
}

export default ownerOnly(main);