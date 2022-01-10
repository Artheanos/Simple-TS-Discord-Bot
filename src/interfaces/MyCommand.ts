import { Client, Message, TextChannel } from "discord.js";


export type MyCommandProps = {
  message: Message & { channel: TextChannel },
  args: string[],
  client: Client
}


export interface MyCommand {
  about: string,
  alias?: string[],

  handleMessage(props: MyCommandProps): void | Promise<any>;
}
