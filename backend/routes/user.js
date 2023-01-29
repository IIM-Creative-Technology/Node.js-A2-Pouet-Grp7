import mongoose from "../mongoose.js"

const userSchema = {
    name: String,
    mail: String,
    password: String,
    age: Number
}

const User = mongoose.model('User', userSchema);

export default User