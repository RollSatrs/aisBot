import bcryptjs from 'bcryptjs'
import User from './User.js'

export async function signDB(login, password){
    const hashPass = await bcryptjs.hash(password, 10)
    const newUser = new User({
        login: login,
        password: hashPass
    })
    try{
        await newUser.save() 
        console.log('Пользователь сохранен: ', newUser)
    } catch(error){'Ошибка при сохранении пользователя', error}
}

