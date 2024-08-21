const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Показывает пинг бота и задержку API.',
    async execute(message) {
        // Сначала отправляем сообщение для вычисления задержки
        const msg = await message.channel.send('Измеряю пинг...');

        // Вычисляем задержку
        const botPing = msg.createdTimestamp - message.createdTimestamp;
        const apiPing = Math.round(message.client.ws.ping);

        // Создаем Embed сообщение
        const embed = new EmbedBuilder()
            .setTitle('🏓 Понг!')
            .addFields(
                { name: 'Задержка бота', value: `⏱️ ${botPing}ms`, inline: true },
                { name: 'Задержка API', value: `🔌 ${apiPing}ms`, inline: true }
            )
            .setColor(0x1D82B6)
            .setTimestamp();

        // Обновляем предыдущее сообщение с Embed
        await msg.edit({ content: null, embeds: [embed] });
    },
};
