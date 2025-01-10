const mongoose = require('mongoose');
const Schema = mongoose.Schema;

main().then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err);
})


const customerSchema = Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "products"
        }
    ]
})
const Customer = mongoose.model("customer", customerSchema);



const productsSchema = new Schema({
    item: String,
    price: Number
})

const products = mongoose.model("products", productsSchema);

// const addOrder = async()=>{
//     await products.insertMany([
//         {
//             item: "Somocha",
//             price: 10
//         },
//         {
//             item: "Chips",
//             price: 20
//         },
//         {
//             item: "Chocolate",
//             price: 50
//         }
//     ]);
// }

// addOrder();


const addCustomer = async () => {
    let user1 = new Customer({
        name: "Saym Islam Jihad",
    })
    let order1 = await products.findOne({ item: "Somocha" });
    let order2 = await products.findOne({ item: "Chocolate" });
    user1.orders.push(order1);
    user1.orders.push(order2);

    let res = await user1.save();
    console.log(res);
}


addCustomer();
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/onetomany');
}