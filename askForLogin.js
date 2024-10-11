
import {signAis, verification} from './signAis.js'
import {saveBt, options} from './buttons.js'
import { signDB } from './saveUserDB.js'

export function askForLogin(chatId, bot){
    bot.sendMessage(chatId, "Напиши свои логин АИСа")
    bot.once('message', async (msg) =>{
        const login = msg.text
        if(login.length === 5){
            bot.sendMessage(chatId, "Теперь введи свой пароль АИСа")
            bot.once('message', async (msg) =>{
                const password = msg.text
                if(password.length === 6){
                    console.log(login, password)
                    await signAis(login, password)
                    if(verification == true){
                        bot.sendMessage(chatId, 'Ты успешно вошел в АИС. Сохранить данные?', saveBt)
                        bot.on('callback_query', (callback) =>{
                            const callbackData = callback.data
                            if(callbackData === 'saveInfo'){
                                signDB(login, password).then(() =>{
                                    bot.sendMessage(chatId, 'Твои данные сохранились в базу данных')
                                }).catch((err) =>{console.log('Ошибка'), err})
                            }else if(callbackData === 'notSaveInfo'){
                                bot.sendMessage(chatId, 'Твои учетные данные не будут сохранены'
                                )}
                        })

                    }else{
                        bot.sendMessage(chatId, 'Неверный логин или пороль', options)
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