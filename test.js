const TelegramBot = require('node-telegram-bot-api');

const experss=require('express')
const app=experss()
const port=process.env.PORT||3000

const token =process.env.API_KEY
const bot = new TelegramBot(token, { polling: true });


async function getSortLink(inpLink) {
    let res = await fetch(`https://isurl.onrender.com/api?link=${inpLink}`, { method: "POST" })
    let sortLink = await res.json()
    return sortLink
}
function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}



bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    app.use("/",(req,res)=>{
        res.send("lol")
    })

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the isURL\nyour favorite URL shortener\nDevelope by: Ayan Biswas');
    }
    else {
        if (isValidURL(messageText)) {
            url = await getSortLink(messageText)
            bot.sendMessage(chatId, url);
        }
        else {
            bot.sendMessage(chatId, "Enter valid url");
        }
    }


});
app.get('/',a=(req,res)=>{
    res.send("Server is on")
})


app.listen(port,()=>{
    console.log("HAY AYAN YOUR BOT IS LIVE")
})