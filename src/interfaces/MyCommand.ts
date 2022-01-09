import { Client, Message } from "discord.js";


export type MyCommandProps = {
  message: Message,
  args: string[],
  client: Client
}


export interface MyCommand {
  about: string,
  alias?: string[],

  handleMessage(props: MyCommandProps): void;
}
