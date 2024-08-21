const { EmbedBuilder } = require('discord.js');
const config = require('../config.json'); // Импортируем конфигурацию

module.exports = {
    name: 'invite',
    description: 'Предоставляет ссылку для приглашения бота на сервер.',
    execute(message) {
        // Ссылка на приглашение бота, используя clientId из config.json
        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${config.clientId}&scope=bot&permissions=8`;

        // Создаем Embed сообщение
        const embed = new EmbedBuilder()
            .setTitle('🤖 Пригласить бота')
            .setDescription('Вы можете пригласить меня на свой сервер, используя следующую ссылку:')
            .addFields(
                { name: '🔗 Пригласить бота', value: `[Кликните здесь, чтобы пригласить меня](${inviteLink})` }
            )
            .setColor(0x1D82B6)
            .setTimestamp();

        // Отправляем Embed сообщение в канал
        message.channel.send({ embeds: [embed] });
    },
};
