// https://stackoverflow.com/questions/73028854/discord-js-v13-code-breaks-when-upgrading-to-v14
// https://discord.js.org/#/docs/main/main/class/BaseInteraction?scrollTo=isStringSelectMenu

const {
	Events
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
	
		if (interaction.customId === 'select-challenge') {
			const selected = interaction.values.join(', ');

			await interaction.update(`The user selected ${selected}!`);
		}
	}
};