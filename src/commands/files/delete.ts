import { TextChannel } from "discord.js";
import { ownerOnly } from "../decorators";
import { MyCommand, MyCommandProps } from "interfaces/MyCommand";

@ownerOnly
export default class implements MyCommand {
  about = "Deletes as many messages as you'd like";

  handleMessage({ message }: MyCommandProps) {
    if (!(message.channel instanceof TextChannel))
      return;

    let args = message.content.split(' ').slice(1);
    if (args.length < 1) {
      message.channel.send('Not enough arguments');
    }
    let msg_count = Number(args);
    if (isNaN(msg_count)) {
      message.channel.send(`${args[0]} is not a number`)
    }
    if (msg_count > 50 || msg_count < 0) {
      message.channel.send(`Out of range (0, 50)`)
    }

    message.channel.bulkDelete(msg_count + 1).then(() => message.channel.send(`I deleted \`${msg_count}\` messages`).then(m => setTimeout(() => m.delete(), 5000)));
  }
}
