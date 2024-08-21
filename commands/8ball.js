const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Отвечает на ваши вопросы с помощью магического шара.',
    execute(message, args) {
        // Проверяем, был ли задан вопрос
        if (args.length === 0) {
            return message.reply('Пожалуйста, задайте вопрос.');
        }

        // Определяем возможные ответы
        const responses = [
            'Да.',
            'Нет.',
            'Возможно.',
            'Определенно да.',
            'Определенно нет.',
            'Сомнительно.',
            'Не могу сказать.',
            'Скорее да, чем нет.',
            'Скорее нет, чем да.'
        ];

        // Выбираем случайный ответ
        const response = responses[Math.floor(Math.random() * responses.length)];

        // Создаем Embed сообщение
        const embed = new EmbedBuilder()
            .setTitle('🎱 Магический Шар')
            .addFields(
                { name: 'Ваш вопрос', value: args.join(' '), inline: false },
                { name: 'Ответ', value: response, inline: false }
            )
            .setColor(0x1D82B6)
            .setTimestamp();

        // Отправляем Embed сообщение в канал
        message.channel.send({ embeds: [embed] });
    },
};
