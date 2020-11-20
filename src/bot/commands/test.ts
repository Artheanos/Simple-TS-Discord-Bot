import {MyCommandProps, MyCommand} from "./index";

export default class _ implements MyCommand {
    docs = "Test me!";

    handleMessage({message}: MyCommandProps) {
        message.channel.send('Hello World')
    }
}