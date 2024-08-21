const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Банит участника на сервере.',
    async execute(message, args) {
        // Проверяем, имеет ли пользователь право на бан
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('У вас нет прав на использование этой команды.');
        }

        // Получаем пользователя, которого нужно забанить
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Пожалуйста, укажите пользователя, которого вы хотите забанить.');
        }

        // Получаем причину бана
        const reason = args.slice(1).join(' ') || 'Причина не указана';

        // Получаем участника сервера
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('Пользователь не найден на сервере.');
        }

        // Выполняем бан
        try {
            await member.ban({ reason });

            // Создаем Embed сообщение
            const embed = new EmbedBuilder()
                .setTitle('🔨 Участник забанен')
                .addFields(
                    { name: 'Модератор', value: `<@${message.author.id}>`, inline: true },
                    { name: 'Пользователь', value: `<@${user.id}>`, inline: true },
                    { name: 'Причина', value: reason, inline: true }
                )
                .setColor(0xFF0000)
                .setTimestamp();

            // Отправляем Embed сообщение в канал
            message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            message.reply('Произошла ошибка при попытке забанить пользователя.');
        }
    },
};
