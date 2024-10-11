import bcryptjs from 'bcryptjs'
import User from './User.js'

export async function signDB(login, password){
    const hashPass = await bcryptjs.hash(password, 10)
    const newUser = new User({
        login: login,
        password: hashPass
    })
    console.log('rerer')
    try{
        await newUser.save() 

        console.log('Пользователь сохранен: ', newUser)
    } catch(error){console.log('Ошибка при сохранении пользователя', error)}
}

