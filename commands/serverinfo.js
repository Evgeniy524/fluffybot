const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Показывает подробную информацию о сервере.',
    execute(message) {
        const { guild } = message;

        // Получаем информацию о сервере
        const serverName = guild.name;
        const serverCreatedAt = guild.createdAt.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
        const serverOwner = guild.members.cache.get(guild.ownerId).user.tag;
        const verificationLevel = guild.verificationLevel;

        // Получаем информацию о пользователях
        const totalMembers = guild.memberCount;
        const humans = guild.members.cache.filter(member => !member.user.bot).size;
        const bots = guild.members.cache.filter(member => member.user.bot).size;

        // Получаем информацию о статусах
        const online = guild.members.cache.filter(member => member.presence?.status === 'online').size;
        const idle = guild.members.cache.filter(member => member.presence?.status === 'idle').size;
        const dnd = guild.members.cache.filter(member => member.presence?.status === 'dnd').size;
        const offline = guild.members.cache.filter(member => !member.presence || member.presence.status === 'offline').size;

        // Получаем информацию о каналах
        const totalChannels = guild.channels.cache.size;
        const textChannels = guild.channels.cache.filter(channel => channel.type === 0).size; // Текстовые каналы
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).size; // Голосовые каналы
        const forumChannels = guild.channels.cache.filter(channel => channel.type === 15).size; // Форумы

        // Создаем Embed сообщение
        const embed = new EmbedBuilder()
            .setTitle(`Информация о сервере: **${serverName}**`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '📜 Владелец', value: serverOwner, inline: true },
                { name: '📆 Дата создания', value: serverCreatedAt, inline: true },
                { name: '🛡️ Уровень проверки', value: verificationLevel.toString(), inline: true },
                { name: '👥 Участники', value: `**Всего:** ${totalMembers}\n**Людей:** ${humans}\n**Ботов:** ${bots}`, inline: true },
                { name: '⚡ По статусам', value: `**В сети:** ${online}\n**Неактивен:** ${idle}\n**Не беспокоить:** ${dnd}\n**Не в сети:** ${offline}`, inline: true },
                { name: '📚 Каналы', value: `**Всего:** ${totalChannels}\n**Текстовых:** ${textChannels}\n**Форумов:** ${forumChannels}\n**Голосовых:** ${voiceChannels}`, inline: true }
            )
            .setFooter({ text: `ID: ${guild.id}`, iconURL: guild.iconURL({ dynamic: true }) })
            .setColor(0x1D82B6);

        // Отправляем Embed сообщение
        message.channel.send({ embeds: [embed] });
    },
};
