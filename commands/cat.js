const { request } = require('undici');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
 
  data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Replies with cat image'),
  async execute(interaction) {
    
    const catResult = await request('https://aws.random.cat/meow');
    const { file } = await catResult.body.json();
		interaction.reply({ files: [file] });
  },
};