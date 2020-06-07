const {MyRandom, Utils} = require("./utils");
const config = require('../config/config.json');
const ownerId = require("../config/config.json").ownerId;
const MessageEmbed = require('discord.js').MessageEmbed;

function ownerOnly(wrapped) {
    return function (msg) {
        if (msg.author.id === ownerId)
            wrapped(msg);
    }
}

module.exports = function (client) {
    let commandList = {
        'delete': ownerOnly(
            function (msg) {
                let args = msg.content.split(' ').slice(1);
                if (args.length < 1) {
                    msg.channel.send('Not enough arguments');
                }
                let msg_count = Number(args);
                if (isNaN(msg_count)) {
                    msg.channel.send(`${args[0]} is not a number`)
                }
                if (msg_count > 50 || msg_count < 0) {
                    msg.channel.send(`Out of range (0, 50)`)
                }

                msg.channel.bulkDelete(msg_count + 1).then(
                    () => msg.channel.send(`I deleted \`${msg_count}\` messages`).then(
                        m => m.delete({timeout: 3000})
                    )
                );
                // msg.channel.messages.fetch().then(messages => {
                //     console.log(`${messages.size} messages`);
                //     messages.array().slice(0, Number(args[0])).forEach(sub_msg => {
                //         sub_msg.delete();
                //     });
                // })
            }
        ),

        'eval': ownerOnly(
            function (msg) {
                try {
                    msg.channel.send(
                        eval(msg.content.split(' ').slice(1).join(' '))
                    ).catch(
                        e => msg.channel.send(e.toString())
                    );
                } catch (e) {
                    msg.channel.send(e.toString());
                }
            }
        ),

        'lol': function (msg) {
            let lanes = ['Top', 'Middle', 'Bottom', 'Support', 'Jungle'];
            let lanes_len = lanes.length;
            let result = '';
            for (let i = 0; i < lanes_len; i++) {
                let choice = MyRandom.choice(lanes);
                Utils.removeFromArray(lanes, choice);
                result += `${i + 1}. ${choice} `
            }
            msg.channel.send(result);
        },

        'for': function (msg) {
            let args = msg.content.split(' ').slice(1);
            if (args.length === 2) {
                let a = Number(args[0]);
                let b = Number(args[1]);

                let result = '';

                if (a < b) {
                    for (let i = a; i < b; i++) {
                        result += i + '\n';
                    }
                } else {
                    for (let i = a; i > b; i--) {
                        result += i + '\n';
                    }
                }

                msg.channel.send(result);
            } else {
                msg.channel.send('Wrong number of arguments');
            }
        },

        'shutdown': ownerOnly(function () {
            client.destroy()
        }),

        'gallery': async function (msg) {
            let newMsg = await msg.channel.send('Loading...');

            let images = [
                'https://discord.js.org/static/logo-square.png',
                'https://miro.medium.com/max/2448/1*FvnpdnrTSQZc_uAGP0GMWg.png',
                'https://w7.pngwing.com/pngs/4/186/png-transparent-javascript-node-js-logo-computer-programming-programmer-others-miscellaneous-angle-text.png'
            ]
            let imagePointer = new function () {
                this.val = 0;
                this.next = () => {
                    this.val = (this.val + 1) % images.length
                };
                this.prev = () => {
                    this.val = (this.val === 0 ? images.length : this.val) - 1;
                };
            }

            let embed = new MessageEmbed();
            embed.setImage(images[imagePointer]);
            await newMsg.edit('', embed);

            function reaction(emoji) {
                if (emoji === '\u2b05')
                    imagePointer.prev();
                else if (emoji === '\u27a1')
                    imagePointer.next();

                embed.setImage(images[imagePointer.val]);
                newMsg.edit('', embed);
            }

            let myReactions = ['\u2b05', '\u27a1'];

            for (let r of myReactions) {
                newMsg.react(r).then();
            }

            let alive = true;
            while (alive) {
                await newMsg.awaitReactions(
                    (reaction, user) => {
                        return user.id !== newMsg.author.id && myReactions.includes(reaction.emoji.name);
                    },
                    {max: 1, time: 60000, errors: ['time']}
                ).then(
                    r => {
                        reaction(r.first().emoji.name);
                        r.first().users.remove(msg.author.id);
                    }
                ).catch(
                    (e) => {
                        newMsg.delete({timeout: 1000});
                        alive = false;
                    }
                );
            }
        },

        'help': function (msg) {
            let result = 'Available commands are:\n`';
            for (let i in this) {
                if (this[i].name)
                    result += i + ' ';
            }
            result += '`\nPrefix - `' + config.prefix + '`';
            msg.channel.send(result);
        },
    }

    return function (msg) {
        if (!msg.content.startsWith(config['prefix']))
            return;

        let command = msg.content.split(' ')[0].slice(config['prefix'].length);
        if (!config.caseSensitive)
            command = command.toLowerCase();

        if (command in commandList) {
            commandList[command](msg);
        }
    }
}