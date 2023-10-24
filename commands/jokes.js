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
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(`jokes[${i}]`)
          .setDescription(`Joke ${i}`)
          .setValue(
            `jokes[${i}].punchline.some(answer => answer.toLowerCase() === response.content.toLowerCase())`
          )
      )
  );

  const filter = (response) => {
    return jokes[`${i}`].punchline.some(
      (answer) => answer.toLowerCase() === response.content.toLowerCase()
    );
  };

  const answer = jokes[`${i}`].punchline;
  await interaction
    .reply({
      content: jokes[`${i}`].joke,
      fetchReply: true,
    })
    .then(() => {
      interaction.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 30000, // Allow user response for 30 seconds
          errors: ["time"],
        })
        .then((collected) => {
          interaction.followUp(`${collected.first().author} you got it right!`);
        })
        .catch((collected) => {
          interaction.followUp(
            `Sorry, that is't right.  The answer is ${answer}`
          );
        });
    });
}
