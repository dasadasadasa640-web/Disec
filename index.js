const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const config = require("./config.json");

const VERIFIED_ROLE = "1502496023925489714";
const VERIFY_STAFF_ROLE = "1510628607402446858";
const PREFIX = "!";

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    // !done @user
    if (command === "done" || command === "تم_توثيق") {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("حدد العضو.");
        }

        try {
            await member.roles.add(VERIFIED_ROLE);

            await message.reply(
                `تم توثيق ${member} من طرف ${message.author}.`
            );

            await member.send(
                `تم توثيقك من طرف ${message.author.tag}.`
            ).catch(() => {});

        } catch (err) {
            console.log(err);
            message.reply("حدث خطأ أثناء التوثيق.");
        }
    }

    // !come
    if (command === "come") {
        message.channel.send(
            `<@&${VERIFY_STAFF_ROLE}> مطلوب مسؤول توثيق.`
        );
    }

    // !help
    if (command === "help") {
        message.reply(`
📋 أوامر السيرفر:

!done @user
!تم_توثيق @user
➜ توثيق عضو وإعطاؤه الرتبة.

!come
➜ استدعاء مسؤولي التوثيق.

!help
➜ عرض جميع الأوامر.
        `);
    }
});

client.login(config.token);
