import {MyCommand, MyCommandProps} from "../MyCommand";

export default class implements MyCommand {
    about = "Test me!";

    handleMessage({message, args, client}: MyCommandProps) {

    }
}