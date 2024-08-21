const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json'); // Импортируем конфигурацию

// Создаем клиента бота с необходимыми намерениями
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences] });

// Загружаем команды
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

// Событие, когда бот готов
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Устанавливаем активность бота из конфигурации
    const { name, type } = config.activity;
    client.user.setActivity(name, { type: type })
        .then(() => console.log(`Activity set to "${name}"`))
        .catch(console.error);
});

// Событие, когда бот получает сообщения
client.on('messageCreate', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command) {
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Произошла ошибка при выполнении этой команды!');
        }
    }
});

// Вход в Discord
client.login(config.token);
