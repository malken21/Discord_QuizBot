const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const { quizList } = require("./Config.json");


//---------- QuizMessageBuilder ----------//
function QuizMessageBuilder(target, isActive) {
    const quiz = quizList[target];
    const embed = new EmbedBuilder()
        .setColor(QuizMessageColor(isActive))
        .setTitle(quiz.title)
        .setDescription(quiz.question);
    const row = new ActionRowBuilder();
    for (const value in quiz.button) {
        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`${target},${value}`)
                .setLabel(quiz.button[value])
                .setStyle(QuizMessageStyle(isActive))
                .setDisabled(!isActive)
        );
    }
    return { embeds: [embed], components: [row] };
}
function QuizMessageColor(isActive) {
    if (isActive) {
        return 2981190;
    } else {
        return 4343630;
    }
}
function QuizMessageStyle(isActive) {
    if (isActive) {
        return ButtonStyle.Success;
    } else {
        return ButtonStyle.Secondary;
    }
}
//---------- QuizMessageBuilder ----------//


//---------- AnswerMessageBuilder ----------//
function AnswerMessageBuilder(description, isCorrect) {
    const embed = new EmbedBuilder()
        .setColor(AnswerMessageColor(isCorrect))
        .setTitle(AnswerMessageTitle(isCorrect))
        .setDescription(description);
    return { embeds: [embed] };
}
function AnswerMessageColor(isCorrect) {
    if (isCorrect) {
        return 16711680;
    } else {
        return 27391;
    }
}
function AnswerMessageTitle(isCorrect) {
    if (isCorrect) {
        return "正解";
    } else {
        return "不正解";
    }
}
//---------- AnswerMessageBuilder ----------//


module.exports = {
    QuizMessageBuilder: QuizMessageBuilder,
    AnswerMessageBuilder: AnswerMessageBuilder
}