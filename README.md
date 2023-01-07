# Toy Discord Bot

[Coding Train Discord Bot Choo Choo](https://github.com/CodingTrain/Discord-Bot-Choo-Choo)
[Discord Guide](https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands)
[Code Samples](https://github.com/discordjs/guide/blob/main/code-samples/creating-your-bot/command-handling/index.js)
[Tenor](https://tenor.com)

# Install dependencies
- `npm install discord.js`
- `npm install dotenv`
- `npm install node-fetch`
 
## Use SlashCommandBuilder class to add command definitions
- The name of the file is the name of the slash command
- choochoo.js is /choochoo:  .setName('choochoo')
- description "Replies with emogies!":  .setDescription('Replies with emogies!')
- interaction.reply '🚂🌈💖'

##  Ephemeral response
- To limit response to user who issued the slashCommand use `ephemeral=true`
- [Guide](https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses)

## When you add commands rerun deply-commands.js
