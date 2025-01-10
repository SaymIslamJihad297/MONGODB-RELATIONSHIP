const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(()=>{
    console.log("Connected Successful");
}).catch((err)=>{
    console.log(err);
})


const userSchema = new Schema({
    username: String,
    addresses: [{
        _id: false,
        location: String,
        city: String
    }]
});


const User = mongoose.model("User", userSchema);

const addUser = async()=>{
    let user1 = new User({
        username: "Saym Islam",
        addresses: [{
            location: "Faridpur Bhanga",
            city: "Faridpur"
        }]
    })
    user1.addresses.push({location: "Bhanga", city:"Bhanga"});
    await user1.save();
}

addUser();




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationShip');
}