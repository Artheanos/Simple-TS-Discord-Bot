import { MyCommand, MyCommandProps } from "interfaces/MyCommand";

export default class implements MyCommand {
  about = "Test me!";

  async handleMessage({ message, args, client }: MyCommandProps) {
    // const userResponse = await waitForNumberReaction(message.channel, message.author.id, 'test')
    // message.channel.send(userResponse?.toString() || 'null');
  }
}
