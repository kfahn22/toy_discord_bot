# Toy Discord Bot

- [Coding Train Discord Bot Choo Choo](https://github.com/CodingTrain/Discord-Bot-Choo-Choo) 
- [Discord Guide](https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands) 
- [Code Samples](https://github.com/discordjs/guide/blob/main/code-samples/creating-your-bot/command-handling/index.js) 
- [Tenor](https://tenor.com) 
- [Discord-tutorial](https://github.com/stuyy/djs-v14-tutorial/blob/master/src/commands/channel.js) 
- [REST API Code](https://github.com/discordjs/guide/blob/main/code-samples/additional-info/rest-api/14/index.js) 

# Install dependencies
- `npm install discord.js`
- `npm install dotenv`
- `npm install undici`
 

## Use SlashCommandBuilder class to add command definitions
- The name of the file is the name of the slash command
- choochoo.js is /choochoo:  .setName('choochoo')
- description "Replies with emogies!":  .setDescription('Replies with emogies!')
- interaction.reply '🚂🌈💖'

##  Ephemeral response
- To limit response to user who issued the slashCommand use `ephemeral=true`
- [Guide](https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses)

## To deploy

### The file deploy-commands.js contains the code to run the files in the commands folder.  At present the files cat.js (returns a random cat gif), choochoo.js, and hello.js work as expected. 

- `node deply-commands.js` 
- `node index.js`


## Issue installing canvas on m1 mac:  I am getting an error trying to install canvas.  This is the same error that others have reported on Github.  

- [Issue installing canvas on macs with m1 processors](https://github.com/Automattic/node-canvas/issues/1733)  
