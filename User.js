import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
export default User