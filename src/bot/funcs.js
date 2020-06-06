const {MyRandom, Utils} = require("./utils");
const ownerId = require("../config/config.json").ownerId;
const http = require('bent');

function ownerOnly(wrapped) {
    return function (msg) {
        if (msg.author.id === ownerId)
            wrapped(msg);
    }
}

module.exports = {
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

            msg.channel.messages.fetch().then(messages => {
                console.log(`${messages.size} messages`);
                messages.array().slice(0, Number(args[0])).forEach(sub_msg => {
                    sub_msg.delete();
                });
            })
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

    'idk': function () {
        let x = http.get('www.google.pl')
    }
}