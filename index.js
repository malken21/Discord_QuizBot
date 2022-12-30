const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const { token, guildId, quizList } = require("./Config.json");
const { commands } = require("./command");
const { QuizMessageBuilder, AnswerMessageBuilder } = require("./util");

client.on(Events.ClientReady, () => {
    client.application.commands.set(commands, guildId);//コマンド生成
    console.log(`login: (${client.user.tag})`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName = "quiz" || interaction.commandName == "q") {

            const random = Math.floor(Math.random() * quizList.length);
            interaction.reply(QuizMessageBuilder(random, true));

        }
    } else if (interaction.isButton()) {
        const data = interaction.customId.split(",");
        const quiz = quizList[data[0]];

        const message = interaction.message;

        message.edit(QuizMessageBuilder(data[0], false));
        if (data[1] == quiz.answer - 1) {
            interaction.reply(AnswerMessageBuilder(quiz.description, true));
        } else {
            interaction.reply(AnswerMessageBuilder(quiz.description, false));
        }
    }
});

client.login(token);