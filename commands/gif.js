/* search for excited top 8 GIFs */

const {
	SlashCommandBuilder
} = require('discord.js');
//const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Replies with Coding Train gif'),
	async execute(interaction) {
		const CTgif = await request('https://tenor.googleapis.com/v2/search?q=codingtrain&key=${process.env.tenor_key}=my_test_app&limit=8');
		const {
			file
		} = await CTgif.body.json();
		interaction.editReply({
			files: [{
				attachment: file,
				name: 'ct.gif'
			}]
		});
	},
	
};

// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

// const fetch = require("node-fetch");

// module.exports = async function (msg, args) {
//   let keywords = "coding train";
//   if (args.length > 0) {
//     keywords = args.join(" ");
//   }
//   let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
//   let response = await fetch(url);
//   let json = await response.json();
//   const index = Math.floor(Math.random() * json.results.length);
//   msg.channel.send(json.results[index].url);
//   msg.channel.send("GIF from Tenor: " + keywords);
// };


//let url = `https://tenor.googleapis.com/v2/search?q=codingtrain&key=${process.env.tenor_key}=my_test_app&limit=8`