/* search for excited top 8 GIFs */

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Replies with Coding Train gif'),
	async execute(interaction) {
		await interaction.reply({ content: 'Hi! 🐠', ephemeral: true });
	},
};
let url = `https://tenor.googleapis.com/v2/search?q=codingtrain&key=${process.env.tenor_key}=my_test_app&limit=8`