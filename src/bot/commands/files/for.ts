import {MyCommand, MyCommandProps} from "../MyCommand";
import {blacklist} from "../decorators";

@blacklist(['505868202048487425'])
export default class implements MyCommand {
    about = "For loop, takes two arguments";

    handleMessage({message, args}: MyCommandProps): void {
        if (args.length === 2) {
            let a = Number(args[0]);
            let b = Number(args[1]);

            let result = '';

            if (a < b)
                for (let i = a; i < b; i++)
                    result += i + '\n';
            else
                for (let i = a; i > b; i--)
                    result += i + '\n';

            message.channel.send(result);
        } else {
            message.channel.send('Wrong number of arguments');
        }
    }
}