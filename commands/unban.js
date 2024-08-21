const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Разбанивает пользователя на сервере.',
    async execute(message, args) {
        // Проверяем, имеет ли пользователь право на разбан
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('У вас нет прав на использование этой команды.');
        }

        // Проверяем, передан ли ID пользователя для разбана
        const userId = args[0];
        if (!userId) {
            return message.reply('Пожалуйста, укажите ID пользователя, которого вы хотите разбанить.');
        }

        // Проверяем, является ли указанный ID допустимым
        if (isNaN(userId)) {
            return message.reply('Пожалуйста, укажите действительный ID пользователя.');
        }

        try {
            // Проверяем, забанен ли пользователь
            const bannedUser = await message.guild.bans.fetch(userId);
            if (!bannedUser) {
                return message.reply('Пользователь с этим ID не найден в списке забаненных.');
            }

            // Выполняем разбан
            await message.guild.members.unban(userId);

            // Создаем Embed сообщение
            const embed = new EmbedBuilder()
                .setTitle('🔓 Участник разбанен')
                .addFields(
                    { name: 'Модератор', value: `<@${message.author.id}>`, inline: true },
                    { name: 'Пользователь', value: `<@${userId}>`, inline: true }
                )
                .setColor(0x00FF00)
                .setTimestamp();

            // Отправляем Embed сообщение в канал
            message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            message.reply('Произошла ошибка при попытке разбанить пользователя. Убедитесь, что ID пользователя правильный и он был забанен.');
        }
    },
};
