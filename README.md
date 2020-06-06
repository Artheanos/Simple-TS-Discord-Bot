# An easy-to-implement and extendable discord bot written in JavaScript

#### First you have to configure the bot

* Go to the project folder
* Edit `config/config.json` file

```js
{
  "prefix": "$",          //Only commands following the prefix will work
  "token": "1234",        //Your Bot's Token
  "ownerId": "4321",      //Your discord account ID
  "caseSensitive": false  //Replace with true if you want the commands to be case sensitive
}
```
Note that if you don't specify your discord ID, "ownerOnly" commands won't work
* Install dependencies `npm install`
* Go to the src/bot folder
* Run the app `node app.js`
#### The bot should be running now

---
`bot/config/censor_list.json` contains guilds and channels with banned words

The structure is as follows
```js
{
  "guildId": {
    "textChannelId": [
      "word1", "word2"
    ]
  }
}
```
You can also replace guild id or text channel id with and asterisk `*`.

If you do so then its value will be applied to any guild id / text channel id that **has not** been matched

Example `censor_list.json`
```js
{
 // This guild will be banning "bad_word" and "another_bad_word" on every text channel except for 207085530130229581
 "067680738097511020": { 
   "*": [
     "bad_word",
     "another_bad_word"
   ],
   "207085530130229581": [] 
 }
}
```

######Regex coming soon...
