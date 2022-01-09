import { MessageEmbed, MessageReaction, User } from "discord.js";
import { MyCommand, MyCommandProps } from "interfaces/MyCommand";

export default class implements MyCommand {
  about = "Display a photo, navigate using arrow emojis";

  async handleMessage({ message }: MyCommandProps) {
    let newMsg = await message.channel.send('Loading...');

    let images = [
      'https://discord.js.org/static/logo-square.png',
      'https://miro.medium.com/max/2448/1*FvnpdnrTSQZc_uAGP0GMWg.png',
      'https://w7.pngwing.com/pngs/4/186/png-transparent-javascript-node-js-logo-computer-programming-programmer-others-miscellaneous-angle-text.png'
    ];

    let imagePointer = new Carousel(images);

    // let imagePointer = new function() {
    //     this.val = 0;
    //     this.next = () => {
    //         this.val = (this.val + 1) % images.length
    //     };
    //     this.prev = () => {
    //         this.val = (this.val === 0 ? images.length : this.val) - 1;
    //     };
    // }

    let embed = new MessageEmbed();
    embed.setImage(imagePointer.value);
    await newMsg.edit({ content: '', embeds: [embed] });

    function reaction(emoji: string) {
      if (emoji === '\u2b05')
        imagePointer.prev();
      else if (emoji === '\u27a1')
        imagePointer.next();

      embed.setImage(imagePointer.value);
      newMsg.edit({ content: '', embeds: [embed] });
    }

    const myReactions = ['\u2b05', '\u27a1'];

    for (let r of myReactions) {
      newMsg.react(r).then();
    }
    const filter = (reaction: MessageReaction, user: User) => user.id !== newMsg.author.id && myReactions.includes(reaction.emoji.name!);

    let alive = true;
    while (alive) {
      await newMsg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] }).then(
        (r) => {
          reaction(r.first()!.emoji.name!);
          r.first()!.users.remove(message.author.id);
        }
      ).catch(
        () => {
          setTimeout(newMsg.delete, 1000)
          alive = false;
        }
      );
    }
  }
}

class Carousel<T> {
  private pointer = 0;
  data: T[];

  get value() {
    return this.data[this.pointer];
  }

  constructor(images: T[]) {
    this.data = images;
  }

  next() {
    this.pointer = (this.pointer + 1) % this.data.length
  };

  prev() {
    this.pointer = (this.pointer === 0 ? this.data.length : this.pointer) - 1;
  };
}
