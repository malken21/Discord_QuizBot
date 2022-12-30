const { ApplicationCommandType } = require('discord.js');

const commands = [
    {
        name: 'quiz',
        description: "quiz start",
        type: ApplicationCommandType.ChatInput
    },
    {
        name: 'q',
        description: "quiz start",
        type: ApplicationCommandType.ChatInput
    }
];

module.exports = {
    commands: commands,
}