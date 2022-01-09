import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { MyRandom, Utils } from "../../utils";

export default class implements MyCommand {
  about = "PseudoRandom LoL role generator";
  alias = ["lolek"];

  handleMessage({ message }: MyCommandProps) {
    const lanes = ['Top', 'Middle', 'Bottom', 'Support', 'Jungle'];
    const lanes_len = lanes.length;
    let result = '';
    for (let i = 0; i < lanes_len; i++) {
      let choice = MyRandom.choice(lanes);
      Utils.removeFromArray(lanes, choice);
      result += `${i + 1}. ${choice}\n`
    }
    message.channel.send(result);
  }
}
