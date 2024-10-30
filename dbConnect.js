import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const mongoURI = `mongodb+srv://iamdebesh:${process.env.DB_PASS}@chat-app.n96pb.mongodb.net/?retryWrites=true&w=majority&appName=chat-app`;

mongoose.connect(mongoURI);

const User = mongoose.model('User', 
    {
        username:String,
        password:String

    }
)

const Message = mongoose.model('Message',
    {   
        username: String,
        msgContent: String
    }
);
async function saveMessage(username, message) {
    const msg = new Message(
        {   
            username: username,
            msgContent:message
        }
    );
    await msg.save().then(()=> console.log('msg saved!'));
}
async function registerUser(username, password) {
    // const timeStamp = getCurrentTimeStamp();
    const user = new User(
        {
            username: username,
            password:password
        }
    );
    await user.save().then(()=> console.log('saved!'));
}

async function getAllMessages() {
    try {
        
        const results = await Message.find({});
        const storeResults = results;
        //console.log("Data from DB::: ", storeResults);

        return storeResults;

    }catch (error) {
        console.error("Error fetching data: ", error);
    }
}

export{registerUser, saveMessage, getAllMessages}