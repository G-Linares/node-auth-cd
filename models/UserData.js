import mongoose from "mongoose";

const UserDataSchema = mongoose.Schema({
    id: Number,
    name:String,
    email:String,
    password:String,    
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const UserData = mongoose.model('UserDataSchema', UserDataSchema);

export default UserData;