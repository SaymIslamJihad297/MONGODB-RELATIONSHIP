const mongoose = require('mongoose');
const {Schema} = mongoose;
main().then(()=>{
    console.log("Server Connected");
}).catch((err)=>{
    console.log(err);
})

const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String,
    like: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

const users = mongoose.model("users", userSchema);
const posts = mongoose.model("posts", postSchema);

const add = async()=>{
    // let user1 = new users({
    //     username: "saymislamjihad",
    //     email: "saymislam365@gmail.com"
    // })
    // user1.save();
    let user = await users.findOne({username: "saymislamjihad"});
    console.log(user);

    let post = new posts({
        content: "this is business",
        like: 100010,
        author: user
    })

    post.save();
}

add();

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/onetomanyyy');
}