require('dotenv').config()

const { Telegraf } = require('telegraf');
const { shotScreen } = require('./tools');
const fs = require('fs');

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  const welcomeMessage = `
🤖 Hello there, I'm UtiliRobot! 🌟

I'm here to make your life easier! 🚀
Whether you need information, assistance, or just want to have some fun, I've got you covered. 💬

🌐 Explore the world of knowledge with me! Just send me a link, and I'll fetch information for you.

Let's get started! Drop a link or say hi! 👋
  `;
  ctx.reply(welcomeMessage);
});


bot.command('shot', async (ctx) => {
  await ctx.reply('Send me the link.');

  bot.on('text', async (ctx) => {
    const link = ctx.message.text;


    if (link.trim() === '') {
      await ctx.reply('No link provided. Please try again.');
      return;
    }

    const screenshotFilename = await shotScreen(link);


    await ctx.replyWithPhoto({ source: screenshotFilename });
    fs.unlinkSync(screenshotFilename);
  });
});

bot.launch();
