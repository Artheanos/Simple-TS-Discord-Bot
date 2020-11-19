import {Message} from "discord.js";
import {IMessageProps} from "./index";

export default function ({message}: IMessageProps) {
    message.channel.send('Hello World');
}