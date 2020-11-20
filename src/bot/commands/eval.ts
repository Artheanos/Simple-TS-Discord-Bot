import {MyCommandProps, MyCommand, ownerOnly} from ".";

@ownerOnly
export default class _ implements MyCommand {
    docs = "Evaluates an expression";

    handleMessage({message}: MyCommandProps) {
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
}