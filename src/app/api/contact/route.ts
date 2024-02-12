import {NextResponse} from "next/server";
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.DB_TOKEN as string, {polling: true});

bot.on('message',  async (msg)=> {
  const {id:chatId} = msg.chat;
  const text = msg.text;
  if(text === '/start'){
    await bot.sendSticker(chatId, 'https://media.stickerswiki.app/elonmuskreactions/522986.512.webp');
    await bot.sendMessage(chatId, `Welcome to fortex`);
  }
})

export  const POST = async  (req:Request)=> {

  const {name, email, country, phone, companyName} = await req.json();

  try {
    if (!name || !country || !email || !phone || !companyName) {
      return new NextResponse(JSON.stringify({ message: "field is required" }), {status: 400});
    }


    const botAnswer = await bot.sendMessage(process.env.DB_ID as string, `
		Customer name: ${name}.
		Email: ${email}.
		Country name: ${country}.
		Phone number: ${phone}.
		Company name: ${companyName}. 
		`);

    // if(botAnswer){
    //   return new NextResponse(JSON.stringify({ message: "success" }), {status: 200});
    // }
    return new NextResponse(JSON.stringify({ message: "success" }), {status: 200});

  }catch (err){
    return new NextResponse(JSON.stringify({message: 'Unknown Error with add Contact request'}), {status:500});
  }
}