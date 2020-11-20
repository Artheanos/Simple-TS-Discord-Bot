import {MyCommandProps, MyCommand, ownerOnly} from "./index";

@ownerOnly
export default class _ implements MyCommand {
    docs = "Bye bye";

    handleMessage({client}: MyCommandProps) {
        client.destroy();
    }
}