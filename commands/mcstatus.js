const { EmbedBuilder } = require('discord.js');
const { StatusCheck } = require('minecraft-server-util');

module.exports = {
    name: 'mcstatus',
    description: 'Показывает статус Minecraft сервера.',
    async execute(message, args) {
        // Проверяем, что пользователь ввел IP и порт сервера
        if (args.length < 1) {
            return message.reply('Пожалуйста, укажите IP адрес Minecraft сервера. Формат: `!mcstatus <IP>:<PORT>`.');
        }

        const serverAddress = args[0];

        try {
            // Выполняем проверку статуса сервера
            const status = await StatusCheck(serverAddress);

            // Создаем Embed сообщение
            const embed = new EmbedBuilder()
                .setTitle('🕹️ Статус Minecraft сервера')
                .addFields(
                    { name: 'IP адрес', value: serverAddress, inline: true },
                    { name: 'Версия', value: status.version.name, inline: true },
                    { name: 'Игроки', value: `${status.players.online} из ${status.players.max}`, inline: true },
                    { name: 'Мотд', value: status.motd.clean.join('\n') || 'Нет MOTD', inline: true }
                )
                .setColor(0x00FF00)
                .setTimestamp();

            // Отправляем Embed сообщение в канал
            message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            message.reply('Не удалось получить статус Minecraft сервера. Убедитесь, что IP адрес и порт указаны правильно.');
        }
    },
};
