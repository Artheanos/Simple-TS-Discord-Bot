import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { MyRandom, Utils } from "../../utils";

export default class implements MyCommand {
  about = 'PseudoRandom LoL role generator';
  alias = ['lolek'];

  handleMessage({ message }: MyCommandProps) {

    message.channel.send(this.generateStaticLength());
  }

  generateStaticLength() {
    const lanes = ['Top', 'Middle', 'Bottom', 'Support', 'Jungle'];
    let result = '';
    for (let i = 0; i < lanes.length; i++) {
      let choice = MyRandom.choice(lanes);
      Utils.removeFromArray(lanes, choice);
      result += `${i + 1}. ${choice}\n`
    }

    return result
  }
}
