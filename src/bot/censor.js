const censor_list = require('../config/censor_list.json')


module.exports = function censor(msg) {
    let deleted = false;

    if (msg.guild.id in censor_list || "*" in censor_list) {
        let guild = censor_list[msg.guild.id];

        let banned_words;
        if (msg.channel.id in guild) {
            banned_words = guild[msg.channel.id];
        } else if ("*" in guild) {
            banned_words = guild["*"];
        }

        if (banned_words) {
            for (let i of banned_words) {
                if (new RegExp(i).test(msg)) {
                    msg.delete({reason: 'contains banned word \"`${i}`\"'});
                    return true;
                }
            }
        }
    }

    return deleted;
}