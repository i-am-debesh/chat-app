import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { fileURLToPath } from 'url';
import path from "path"
import { getAllMessages, registerUser, saveMessage } from "./dbConnect.js";
import { decodeStringSafely, extractUserFromURL, userExist } from "./funcs.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.static(path.join('/pages', 'public')));
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/login', (req,res)=>{
    
    res.sendFile(path.join(__dirname, './pages/login.html'));
})

app.get(/register=/, async(req,res)=>{
    const userData = extractUserFromURL(req.url);

    if(userExist(userData.username) === true) {
        res.json('-1');
    }
    else if(userExist(userData.username) === false) {
        await registerUser(userData.username, userData.password);
        console.log(userData);
        res.json('1');
    }
    
});



app.get('/chatroom', (req,res) => {
    res.sendFile(path.join(__dirname, './pages/chatroom.html'));
});

app.get('/rendermsg', async(req,res)=>{
    const messages = await getAllMessages();
    res.json(messages);
})

app.get(/save-message=/, async(req,res)=>{
    const msg = decodeStringSafely(req.url);
    
    
    //console.log(msg);
    if(msg.length > 0) {
        await saveMessage(msg);
        res.json('1');
    }else {
        res.json('-1');
    }
    
})
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})