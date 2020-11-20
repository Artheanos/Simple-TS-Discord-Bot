# This is a simple discord bot written in JavaScript
Setup
---
#### First you have to configure the bot

* Go to the project folder
* Edit `config/config.json` file

```json5
{
  "prefix": "$",          //Only commands following the prefix will work
  "token": "1234",        //Your Bot's Token
  "ownerId": "4321",      //Your discord account ID
  "caseSensitive": false  //Replace with true if you want the commands to be case sensitive
}
```
Note that if you don't specify ownerId, "ownerOnly" commands won't work
* Install dependencies - run `npm install` while in the project's folder
* Compile js - `npm run build`
* Run it! - `npm start`
#### The bot should be running now

Censor List
---
`bot/config/censor_list.json` contains guilds and channels with banned words

The structure is as follows
```json5
{
  "guildId": {
    "textChannelId": [
      "word1", "word2"
    ]
  }
}
```
You can also replace guild id or text channel id with an asterisk `*`.

If you do so then its value will be applied to any guild id / text channel id that **has not** been matched

Example `censor_list.json`
```json5
{
 // This guild will be banning "bad_word" and messages containing 7 consecutive characters 
 // on every text channel except for 207085530130229581
 "067680738097511020": { 
   "*": [
     "(.)(\\1){6}",
     "bad_word"
   ],
   "207085530130229581": []
 }
}
```

Adding your own commands
---
`src/bot/commands` folder contains the bot's commands. File name is also the command's name.

See `src/bot/commands/test.ts` for a 'Hello World' example
```ts
export default function ({message}: IMessageProps) {
    message.channel.send('Hello World');
}
```

All you have to do is create a new file and export a class as default.
Make sure your class implements `MyCommand`

Your function will be called with an argument of `IMessageProps` type.
