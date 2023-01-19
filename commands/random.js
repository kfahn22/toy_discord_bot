// https://discordjs.guide/popular-topics/canvas.html#setting-up-napi-rs-canvas
// https://www.npmjs.com/package/@napi-rs/canvas

// Coding Train Livestream discussing random whistle project and Discord.js random walk
// https://www.youtube.com/watch?v=F3Q4Cf9OZSw 

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const {
    AttachmentBuilder,
    SlashCommandBuilder
} = require('discord.js');
const {
    createCanvas,
    Image
} = require('@napi-rs/canvas');
const {
    readFile
} = require('fs/promises');
const {
    request
} = require('undici');
const fs = require('node:fs');
const { promises } = require('fs')
const { join } = require('path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Returns an random walk'),
    async execute(interaction) {
        console.log("generating...");
        //let startingIndex = Math.floor(Math.random() * randoms.length);
        //let startingIndex = Math.floor(Math.random() * 100);
        const width = 1000;
        const height = 500;
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        const background = await readFile('./random.jpg');
        const backgroundImage = new Image();
        backgroundImage.src = background;
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Make my own random walk design
        // Or anything else
        // context.fillStyle = "white";
        // context.fillRect(0, 0, canvas.width, canvas.height);

        let x = canvas.width / 2;
        let y = canvas.height / 2;
        const stepSize = 5;
        for (let i = 0; i < 100000; i++) {
            context.fillStyle = "white";
            context.fillRect(x, y, stepSize, stepSize);
            const r = Math.floor(Math.random() * 4); // timestamp 1:36:05
            switch (r) {
                case 0:
                    x = x + stepSize;
                    break;
                case 1:
                    x = x - stepSize;
                    break;
                case 2:
                    y = y + stepSize;
                    break;
                case 3:
                    y = y - stepSize;
                    break;
            }
            
        }

        // Use the helpful Attachment class structure to process the file for you
        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), {
            name: 'randomwalk.png'
        });

        interaction.reply({
            files: [attachment]
        });
    }
}