// Another joke resourse
// https://github.com/15Dkatz/official_joke_api/blob/master/jokes/index.json

import jokes from "./jokes.json" assert { type: "json" };

import {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("joke")
  .setDescription("Tells a joke!");

// Function to execute when the slash command is called
export async function execute(interaction) {
  console.log("starting");
  let i = Math.floor(Math.random() * jokes.length);
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("random-joke")
      .setPlaceholder("Can you answer the joke?")
      .setMinValues(1)
      .setMaxValues(1)
    // .addOptions(
    //   new StringSelectMenuOptionBuilder()
    //     .setLabel(`jokes[${i}]`)
    //     .setDescription(`Joke ${i}`)
    //     .setValue(
    //       `jokes[${i}].punchline.some(answer => answer.toLowerCase() === response.content.toLowerCase())`
    //     )
    // )
  );

  const filter = (response) => {
    return jokes[i].punchline.some(
      (answer) => answer.toLowerCase() === response.content.toLowerCase()
    );
  };

  const answer = jokes[i].punchline;
  await interaction.reply({
    content: jokes[i].joke,
    fetchReply: true,
  });
  const collected = await interaction.channel
    .awaitMessages({
      filter,
      max: 1,
      time: 20000, // Allow user response for 20 seconds
      errors: ["time"],
    })
    .catch(() =>
      interaction.followUp(
        `Sorry, that isn't right.  The punchline is ${answer}`
      )
    );
  // If nothing got collected so it probably timed out and got handled by the catch above, do nothing...
  if (!collected) return;

  // They got it right!
  await interaction.followUp(`${collected.first().author} you got it right!`);
}
