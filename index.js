import TelegramBot from 'node-telegram-bot-api'
import mongoose from 'mongoose'
import {signDB} from './saveUserDB.js'
import {askForLogin} from './askForLogin.js'

const token = '7903613362:AAEFlunRQ57OTaEDm08FTGx2_B1qAZJa0Vo'
const bot = new TelegramBot(token, {polling: true})
const mongoURI = 'mongodb+srv://Rollan:05060401Gm@cluster0.agmmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURI).then(() => {console.log('Подключение к MongoDB успешно!')})
.catch(err =>{console.log('Ошибка подключения к MongoDB:', err)})

bot.onText('/start', (msg) =>{
    const chatId = msg.chat.id
    const options = {
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
    const welcome = `Добро пожаловать в бот АИС! 🎉
Я здесь, чтобы помочь тебе с следующими задачами:
    - Вход в систему АИС с использованием твоих учетных данных.
    - Поиск информации о текущих парах и заданиях.
    - Предоставление информации о том, как использовать этого бота.

Выбери одну из опций ниже, чтобы продолжить:
    `
    bot.sendMessage(chatId, welcome, options)
})

bot.on('callback_query', (callback)=>{
    const chatId = callback.message.chat.id
    const callbackData = callback.data
    if(callbackData === 'signIn'){
        askForLogin(chatId, bot)
    }
})
