// import {MessageEmbed} from "discord.js";
// import {ICommandProps} from "./index";
//
// class ImagePointer {
//     private pointer = 0;
//     images: Array<string>;
//
//     get image() {
//         return this.images[this.pointer];
//     }
//
//     constructor(images: Array<string>) {
//         this.images = images;
//     }
//
//     next() {
//         this.pointer = (this.pointer + 1) % this.images.length
//     };
//
//     prev() {
//         this.pointer = (this.pointer === 0 ? this.images.length : this.pointer) - 1;
//     };
// }
//
// async function main({message}: ICommandProps) {
//     let newMsg = await message.channel.send('Loading...');
//
//     let images = [
//         'https://discord.js.org/static/logo-square.png',
//         'https://miro.medium.com/max/2448/1*FvnpdnrTSQZc_uAGP0GMWg.png',
//         'https://w7.pngwing.com/pngs/4/186/png-transparent-javascript-node-js-logo-computer-programming-programmer-others-miscellaneous-angle-text.png'
//     ];
//
//     let imagePointer = new ImagePointer(images);
//
//     // let imagePointer = new function() {
//     //     this.val = 0;
//     //     this.next = () => {
//     //         this.val = (this.val + 1) % images.length
//     //     };
//     //     this.prev = () => {
//     //         this.val = (this.val === 0 ? images.length : this.val) - 1;
//     //     };
//     // }
//
//     let embed = new MessageEmbed();
//     embed.setImage(imagePointer.image);
//     await newMsg.edit('', embed);
//
//     function reaction(emoji: string) {
//         if (emoji === '\u2b05')
//             imagePointer.prev();
//         else if (emoji === '\u27a1')
//             imagePointer.next();
//
//         embed.setImage(imagePointer.image);
//         newMsg.edit('', embed);
//     }
//
//     let myReactions = ['\u2b05', '\u27a1'];
//
//     for (let r of myReactions) {
//         newMsg.react(r).then();
//     }
//
//     let alive = true;
//     while (alive) {
//         await newMsg.awaitReactions(
//             (reaction, user) => {
//                 return user.id !== newMsg.author.id && myReactions.includes(reaction.emoji.name);
//             },
//             {max: 1, time: 60000, errors: ['time']}
//         ).then(
//             (r) => {
//                 reaction(r.first()!.emoji.name);
//                 r.first()!.users.remove(message.author.id);
//             }
//         ).catch(
//             (e) => {
//                 newMsg.delete({timeout: 1000});
//                 alive = false;
//             }
//         );
//     }
// }
//
// export default main;