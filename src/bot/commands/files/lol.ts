import {MyCommand, MyCommandProps} from "../MyCommand";
import {MyRandom, Utils} from "../../utils";
import {whitelist} from "../decorators";

export default class implements MyCommand {
    about = "PseudoRandom LoL role generator";
    alias = ["lolek"];

    handleMessage({message}: MyCommandProps) {
        let lanes = ['Top', 'Middle', 'Bottom', 'Support', 'Jungle'];
        let lanes_len = lanes.length;
        let result = '';
        for (let i = 0; i < lanes_len; i++) {
            let choice = MyRandom.choice(lanes);
            Utils.removeFromArray(lanes, choice);
            result += `${i + 1}. ${choice}\n`
        }
        message.channel.send(result);
    }
}