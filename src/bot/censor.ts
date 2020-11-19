import {Message} from 'discord.js';
import {censorList} from '../config';

export default function censor(msg: Message) {
    let deleted = false;

    if (!msg.guild)
        return;

    if (msg.guild.id in censorList || "*" in censorList) {
        let guild = censorList[msg.guild.id];

        let banned_words;
        if (msg.channel.id in guild) {
            banned_words = guild[msg.channel.id];
        } else if ("*" in guild) {
            banned_words = guild["*"];
        }

        if (banned_words) {
            for (let i of banned_words) {
                if (new RegExp(i).test(msg.content)) {
                    msg.delete({reason: 'contains banned word \"`${i}`\"'});
                    return true;
                }
            }
        }
    }

    return deleted;
}