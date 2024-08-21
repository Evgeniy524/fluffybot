const { EmbedBuilder } = require('discord.js');
const config = require('../config.json'); // Импортируем конфигурацию

module.exports = {
    name: 'about',
    description: 'Предоставляет информацию о боте.',
    execute(message) {
        // Создаем Embed сообщение с информацией о боте
        const embed = new EmbedBuilder()
            .setTitle('🤖 О Боте')
            .setDescription('Вот информация обо мне:')
            .addFields(
                { name: 'Имя', value: message.client.user.username, inline: true },
                { name: 'Тег', value: message.client.user.tag, inline: true },
                { name: 'Версия', value: config.version || 'Не указана', inline: true },
                { name: 'Дата запуска', value: config.createdAt || 'Не указана', inline: true }
            )
            .setColor(0x1D82B6)
            .setTimestamp();

        // Отправляем Embed сообщение в канал
        message.channel.send({ embeds: [embed] });
    },
};
