export const options = {
    reply_markup:{
        inline_keyboard:[
            [{text: "Войти в АИС", callback_data:"signIn"}],
            [{text: "Как использывать этого бота", callback_data:"help"}]
        ]
    }
}

export const saveBt = {
    reply_markup:{        
        inline_keyboard:[
            [{text: "Сохранить данные", callback_data:"saveInfo"}],
            [{text: "Не сохронять данные", callback_data:"notSaveInfo"}]
        ]
    }
}