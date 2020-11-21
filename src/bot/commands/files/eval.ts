import {ownerOnly} from "../decorators";
import {MyCommand, MyCommandProps} from "../MyCommand";

@ownerOnly
export default class implements MyCommand {
    about = "Evaluates an expression";

    handleMessage({message, args}: MyCommandProps) {
        try {
            message.channel.send(
                eval(args.join(' '))
            ).catch(
                e => message.channel.send(e.toString())
            );
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
}