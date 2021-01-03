import {MyCommand, MyCommandProps} from "../MyCommand";

export default class implements MyCommand {
    about = "Test me!";

    handleMessage({message, args, client}: MyCommandProps) {
        message.channel.send('If you can read me, the test succeeded');
    }
}