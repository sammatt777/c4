import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true // Corrected the typo here
    },
    password: {
        type: String,
        required: true // Corrected the typo here
    },
});

const UserModel = mongoose.models.users ||mongoose.model('users', userSchema); // Changed the variable name to be more consistent

export default UserModel;
