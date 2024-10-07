
import {signAis, verification} from './signAis.js'

export function askForLogin(chatId, bot){
    const replyBt = {
        reply_markup:{
            inline_keyboard:[
                [
                    {text: "Войти в АИС", callback_data:"signIn"}
                ],
                [
                    {text: "Как использывать этого бота", callback_data:"help"}
                ]
            ]
        }
    }
    bot.sendMessage(chatId, "Напиши свои логин АИСа")
    bot.once('message', async (msg) =>{
        const login = msg.text
        console.log(login.length)
        if(login.length === 5){
            bot.sendMessage(chatId, "Теперь введи свой пароль АИСа")
            bot.once('message', async (msg) =>{
                const password = msg.text
                if(password.length === 6){
                    await signAis(login, password)
                    if(verification == true){
                        bot.sendMessage(chatId, 'Ты вошел в АИС')
                    }else{
                        bot.sendMessage(chatId, 'Неверный логин или пороль', replyBt)
                    }
                }else{
                    bot.sendMessage(chatId, 'Пороль должен содержать ровно 6 символов')
                    askForLogin(chatId, bot)
                }
            })
        }else{
            bot.sendMessage(chatId, 'Логин должен содержать ровно 5 символов.')
            askForLogin(chatId, bot)
        }
    })
}