import {MyRandom, Utils} from "../utils";
import {MyCommandProps, MyCommand} from "./index";

export default class _ implements MyCommand {
    docs = "PseudoRandom LoL role generator";

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