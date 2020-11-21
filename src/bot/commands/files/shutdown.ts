import {ownerOnly} from "../decorators";
import {MyCommand, MyCommandProps} from "../MyCommand";

@ownerOnly
export default class implements MyCommand {
    about = "Bye bye";

    handleMessage({client}: MyCommandProps) {
        client.destroy();
    }
}