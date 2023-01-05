const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('choochoo')
		.setDescription('Replies with emogies!'),
	async execute(interaction) {
		await interaction.reply('🚂🌈💖');
	},
};