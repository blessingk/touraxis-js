import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('User', userSchema);

export default User;
